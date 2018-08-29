# Stateflow

Lightweight module to execute tasks using a Finite State Machine (FSM).

```bash
npm install state-flow
```

## Usage

```js
var StateMachine = require('./src/stateflow.js');

var sm = new StateMachine('idle', {
  start: [
    { from: 'idle', to: 'analyzing' }
  ],
  cancel: [
    { from: ['analyzing', 'advisory'], to: 'idle' }
  ],
  advisory: [
    { from: '*', to: 'advisory' }
  ]
})

sm.onEnter('analyzing', function () {
  console.log('analyzing started')
})

sm.onLeave('analyzing', function () {
  console.log('analyzing finished')
})

sm.onError(function (err) {
  console.error('error', err)
})

sm.trigger('start')
```

## Test

```bash
$ npm test
```

## License

MIT
