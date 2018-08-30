var test = require('tape');
var StateMachine = require('../src/state-machine');

test('StateMachine should create with initial state', function (t) {
  var sm = getDefaultMockStateMachine();
  t.equal(sm.getCurrentState(), 'idle');
  t.end();
});

test('StateMachine should trigger an event for state change', function (t) {
  var sm = getDefaultMockStateMachine();
  t.equal(sm.getCurrentState(), 'idle');
  sm.trigger('start');
  t.equal(sm.getCurrentState(), 'analyzing');
  t.end();
});

test('StateMachine should emit onEnter event', function (t) {
  var sm = getDefaultMockStateMachine();
  sm.onEnter('analyzing', function() {
    t.equal(sm.getCurrentState(), 'analyzing');
    t.end();
  });
  sm.trigger('start');
});

test('StateMachine should emit onLeave event', function (t) {
  var sm = getDefaultMockStateMachine();
  sm.onLeave('analyzing', function() {
    t.equal(sm.getCurrentState(), 'idle');
    t.end();
  });
  sm.trigger('start');
  sm.trigger('cancel');
});

test('StateMachine should respond with error if a change of state is not possible', function (t) {
  t.plan(3);
  var sm = getDefaultMockStateMachine();
  sm.onError(function(error) {
    t.ok(typeof error == 'object');
  });
  sm.trigger('advisory');
  t.equal(sm.getCurrentState(), 'advisory');
  sm.trigger('start');
  t.equal(sm.getCurrentState(), 'advisory');
});

test('StateMachine should receive wildcard * as valid state', function (t) {
  var sm = getDefaultMockStateMachine();
  sm.trigger('start');
  sm.trigger('advisory');
  t.equal(sm.getCurrentState(), 'advisory');
  t.end();
});

function getDefaultMockStateMachine() {
  return new StateMachine('idle', {
    start: [ { from: 'idle', to: 'analyzing' } ],
    cancel: [ { from: ['analyzing', 'advisory'], to: 'idle' } ],
    advisory: [ { from: '*', to: 'advisory' } ]
  });
}
