# Stateflow

Lightweight module to execute tasks using a Finite State Machine (FSM).

```bash
npm install state-machine-flow
```

## Usage

```js
var StateMachine = require('state-machine-flow');

// Build StateMachine specifying two parameters:
// 1. Initial state
// 2. Object with event and an array of state transitions
var sm = new StateMachine('idle', {
  start: [ { from: 'idle', to: 'analyzing' } ],
  await: [ { from: 'analyzing', to: 'await-test-type' } ],
  cancel: [
    { from: ['analyzing', 'advisory'], to: 'idle' },
    { from: 'await-test-type', to: 'analyzing'},
    { from: 'result', to: 'remove-cartridge'}
  ],
  advisory: [ { from: '*', to: 'advisory' } ],
  result: [ { from: 'idle', to: 'result' } ],
  finish: [ { from: 'remove-cartridge', to: 'idle' } ]
})

// Add an event listener to execute every time the machine changes to the specified state.
sm.onEnter('analyzing', function () {
  console.log('analyzing started')
})

// Add an event listener to execute every time the machine leaves the specified state.
sm.onLeave('analyzing', function () {
  console.log('analyzing finished')
})

// Attach an error handler
sm.onError(function (err) {
  console.error('error', err)
})

// Execute the state change by specifying the event name
sm.trigger('start')

// Return the current state
console.log(sm.getCurrentState());
```

## Test

```bash
$ npm test
```

## License

MIT
