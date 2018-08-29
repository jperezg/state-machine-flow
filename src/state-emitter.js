const EventEmitter = require('events');

class StateEmitter extends EventEmitter {

  addListener(state, name, callback) {
    this.on(this.getListenerName(state, name), callback);
  }

  emit(name, state) {
    let listenerName = this.getListenerName(state, name);
    this.emit(listenerName);
  }

  getListenerName(state, name) {
    return state + '/' + name;
  }
}

module.exports = StateEmitter;
