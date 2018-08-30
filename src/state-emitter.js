const EventEmitter = require('events');

function StateEmitter() {

  var emitter = new EventEmitter();

  this.addListener = function(name, state, callback) {
    emitter.on(getListenerName(name, state), callback);
  }

  this.emit = function(name, state) {
    emitter.emit(getListenerName(name, state));
  }

  var getListenerName = function(name, state) {
    return state + '/' + name;
  }
}

module.exports = StateEmitter;
