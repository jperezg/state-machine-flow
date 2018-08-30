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

  /**
   * Set an onEnter listener for a specific state
   * @param  {String}   state    Name of the state
   * @param  {Function} callback Callback function
   */
  function onEnter(state, callback) {
    emitter.addListener('onEnter', state, callback);
  }

  /**
   * Set an onLeave listener for a specific state
   * @param  {String}   state    Name of the state
   * @param  {Function} callback Callback function
   */
  function onLeave(state, callback) {
    emitter.addListener('onLeave', state, callback);
  }

  /**
   * Set an error handler for machine errors
   * @param  {Function} callback Callback function for error handling
   */
  function onError(fnCallback) {
    errorHandler = fnCallback;
  }

  /**
   * Trigger a machine event to make a change of states
   * @param  {String}   event    Name of the event
   */
  function trigger(event) {
    if (events[event] == undefined) {
      return handleError(new Error('Invalid trigger value'));
    }

    var oldState = currentState;
    var toState = getNewState(events[event]);

    if (!toState) {
      return handleError(new Error('Invalid change of states'));
    }

    currentState = toState;
    emitter.emit('onLeave', oldState);
    emitter.emit('onEnter', currentState);
  }

  /**
   * Returns the current state
   * @return {String} Current state
   */
  function getCurrentState() {
    return currentState;
  }

  /**
   * Return new state for the change
   * @param  {Array} changes List of changes
   * @return {String}        New state
   */
  function getNewState(changes) {
    return changes.reduce(function(value, change) {
      if (change.from == '*' || change.from.indexOf(currentState) != -1) {
        return change.to;
      }
      return value;
    }, null);
  }

  /**
   * Handle machine error
   * @param  {Object} error Error to handle
   */
  function handleError(error) {
    if (errorHandler) {
      errorHandler(error);
    } else {
      throw error;
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
