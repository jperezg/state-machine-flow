'use strict';

/**
 * Set initial state for the machine
 * @param {String} initialState Initial state
 */
function parseInitialState(initialState) {
  // @TODO validate
  return initialState;
}

/**
 * Parse events object
 * @param {Object} events Events for the state changes
 */
function parseEvents(events) {
  // @TODO validate
  return Object.assign({}, events);
}


module.exports = {
  parseInitialState, parseEvents
};
