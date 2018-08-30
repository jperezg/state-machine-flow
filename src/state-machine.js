var parser = require('./parser');
var StateEmitter = require('./state-emitter');

/**
 * State machine builder
 *
 * @param  {string} initialState Initial state
 * @param  {object} initialEvents Map with events and states transition
 */
var StateMachine = function(initialState, initialEvents) {
  var input = parser.parseInput(initialState, initialEvents);
  var currentState = input.state;
  var events = input.events;
  var errorHandler = null;
  var emitter = new StateEmitter();

  function onEnter(state, callback) {
    emitter.addListener('onEnter', state, callback);
  }

  function onLeave(state, callback) {
    emitter.addListener('onLeave', state, callback);
  }

  function onError(fnCallback) {
    errorHandler = fnCallback;
  }

  function trigger(event) {
    if (events[event] == undefined) {
      return handleError(new Error('Invalid trigger value'));
    }

    var toState = getNewState(event, events[event]);

    if (!toState) {
      return handleError(new Error('Invalid change of states'));
    }
    var oldState = currentState;
    currentState = toState;
    emitter.emit('onLeave', oldState);
    emitter.emit('onEnter', currentState);
  }

  function getCurrentState() {
    return currentState;
  }

  // @TODO move to state object
  function getNewState(event, changes) {
    return changes.reduce(function(value, change) {
      if (change.from == '*' || change.from.indexOf(currentState) != -1) {
        return change.to;
      }
      return value;
    }, null);
  }

  function handleError(error) {
    if (errorHandler) {
      errorHandler(error);
    }
  }

  return {
    onEnter,
    onLeave,
    onError,
    trigger,
    getCurrentState
  }
}

module.exports = StateMachine;
