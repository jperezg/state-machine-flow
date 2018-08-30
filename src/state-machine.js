var EventEmitter = require('events');
var parsers = require('./parsers');

/**
 * State machine builder
 *
 * @param  {string} initialState Initial state
 * @param  {object} initialEvents Map with events and states transition
 */
var StateMachine = function(initialState, initialEvents) {
  // parsers.parseInput(initialState, initialEvents);
  var currentState = parsers.parseInitialState(initialState);
  var events = parsers.parseEvents(initialEvents);
  var errorHandler = null;
  var emitter = new EventEmitter();

  function onEnter(state, callback) {
    addListener(state, 'onEnter', callback);
  }

  function onLeave(state, callback) {
    addListener(state, 'onLeave', callback);
  }

  function addListener(state, name, callback) {
    emitter.on(getListenerName(state, name), callback);
  }

  function callListener(state, name) {
    emitter.emit(getListenerName(state, name));
  }

  function getListenerName(state, name) {
    return state + '/' + name;
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
    callListener(oldState, 'onLeave');
    callListener(currentState, 'onEnter');
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
