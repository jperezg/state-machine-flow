var StateMachine = require('../');

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

sm.onEnter('advisory', function () {
  console.log('advisory started')
})

sm.onLeave('advisory', function () {
  console.log('advisory finished')
})

sm.onEnter('idle', function () {
  console.log('idle started')
})

sm.onLeave('idle', function () {
  console.log('idle finished')
})

sm.onError(function (err) {
  console.error('error', err.message)
})

sm.trigger('start')
sm.trigger('cancel')
sm.trigger('advisory')
sm.trigger('cancel')
