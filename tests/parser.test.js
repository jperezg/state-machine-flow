var test = require('tape');
var parser = require('../src/parser');

test('Should fail if the initial state is invalid', function (t) {
  var events = {
    start: [ { from: 'idle', to: 'analyzing' } ],
    cancel: [ { from: ['analyzing', 'advisory'], to: 'idle' } ],
    advisory: [ { from: '*', to: 'advisory' } ]
  };
  try {
    parser.parseInput('randomState', events);
  } catch(error) {
    t.ok(true);
    t.end();
  }
});

test('Should fail if the "to" state is not a string', function (t) {
  var events = {
    start: [ { from: 'idle', to: 'analyzing' } ],
    cancel: [ { from: ['analyzing', 'advisory'], to: 'idle' } ],
    advisory: [ { from: '*', to: ['advisory'] } ]
  };
  try {
    parser.parseInput('idle', events);
  } catch(error) {
    t.ok(true);
    t.end();
  }
});

test('Should fail if the "to" state is a wildcard (*)', function (t) {
  var events = {
    start: [ { from: 'idle', to: 'analyzing' } ],
    cancel: [ { from: ['analyzing', 'advisory'], to: 'idle' } ],
    advisory: [ { from: '*', to: '*' } ]
  };
  try {
    parser.parseInput('idle', events);
  } catch(error) {
    t.ok(true);
    t.end();
  }
});

