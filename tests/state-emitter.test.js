var test = require('tape');
var StateEmitter = require('../src/state-emitter');

test('StateEmitter should listen to an event', function (t) {
  var emitter = new StateEmitter();

  emitter.addListener('onEnter', 'idle', function() {
    t.ok(true);
    t.end();
  });

  emitter.emit('onEnter', 'idle');
});
