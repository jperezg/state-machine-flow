var StateMachine = require('../');

var sm = new StateMachine('idle', {
  start: [
    { from: 'idle', to: 'analyzing' }
  ],
  await: [
    { from: 'analyzing', to: 'await-test-type' }
  ],
  cancel: [
    { from: ['analyzing', 'advisory'], to: 'idle' },
    { from: 'await-test-type', to: 'analyzing'},
    { from: 'result', to: 'remove-cartridge'}
  ],
  advisory: [
    { from: '*', to: 'advisory' }
  ],
  result: [
    { from: 'idle', to: 'result' }
  ],
  finish: [
    { from: 'remove-cartridge', to: 'idle' }
  ]
})

sm.onEnter('analyzing', function () {
  console.log('Analyzing started')
})

sm.onLeave('analyzing', function () {
  console.log('Analyzing finished')
})

sm.onEnter('await-test-type', function () {
  console.log('Waiting for test type')
})

sm.onEnter('advisory', function () {
  console.log('Advisory started')
})

sm.onLeave('advisory', function () {
  console.log('Advisory finished')
})

sm.onEnter('idle', function () {
  console.log('Idle ...')
})

sm.onLeave('idle', function () {
  console.log('Idle finished')
})

sm.onEnter('remove-cartridge', function () {
  console.log('Remove Cartrige')
})

sm.onLeave('remove-cartridge', function () {
  console.log('Process finished')
})

sm.onError(function (err) {
  console.error('error', err.message)
})

sm.trigger('start')
sm.trigger('await')
sm.trigger('cancel')
sm.trigger('advisory')
sm.trigger('cancel')
sm.trigger('result')
sm.trigger('cancel')
sm.trigger('finish')
