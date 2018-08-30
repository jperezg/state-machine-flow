/**
 * Set initial state for the machine
 * @param {String} initialState Initial state
 */
function parseInitialState(initialState, validStates) {
  if (typeof initialState != 'string' || validStates.indexOf(initialState) == -1) {
    throw new Error('Invalid initial state');
  }
  return initialState;
}

/**
 * Parse events object
 * @param {Object} events Events for the state changes
 */
function parseEvents(initialEvents) {
  for(var event in initialEvents) {
    initialEvents[event].forEach(function(change) {
      if (!isValidChange(change)) {
        throw new Error('Invalid state change', change);
      }
    });
  }
  return Object.assign({}, initialEvents);
}

/**
 * Verify if the change of events (from and to) has a valid format
 * @param  {Object}  change Change of events
 * @return {Boolean}        True if is valid, false otherwise
 */
function isValidChange(change) {
  var isFromValid = typeof change.from == 'string' || change.from.length > 0;
  var isToValid = typeof change.to == 'string' && change.to != '*';
  return isFromValid && isToValid;
}

/**
 * Validate input and parse
 * @param  {String} initialState  Initial state for machine
 * @param  {Object} initialEvents Initial events object
 * @return {Object}               Parsed result
 */
function parseInput(initialState, initialEvents) {
  var events = parseEvents(initialEvents);
  var validStates = getStatesList(initialEvents);
  var state = parseInitialState(initialState, validStates);

  return { state, events };
}

/**
 * Returns a list with unique values for the valid states
 * @param  {Object} events Object with events from input
 * @return {Array}         List with unique states
 */
function getStatesList(events) {
  var list = [];
  for(var event in events) {
    events[event].forEach((change) => {
      if (typeof change.from == 'string') {
        list = list.concat([change.from, change.to]);
      } else {
        list = list.concat(change.from, [change.to]);
      }
    });
  }
  return list.filter(function(value, index, self) {
    return self.indexOf(value) == index && value != '*';
  });
}

module.exports = {
  parseInput
};
