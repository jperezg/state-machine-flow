var StateMachine = require('../');

var sm = new StateMachine('solid', {
  melt: [
    { from: 'solid', to: 'liquid' }
  ],
  vaporize: [
    { from: 'liquid', to: 'gas' }
  ],
  freeze: [
    { from: 'liquid', to: 'solid' }
  ],
  condense: [
    { from: 'gas', to: 'liquid' }
  ]
})

sm.onEnter('solid', function (state) {
  console.log('solid')
})

sm.onEnter('liquid', function (state) {
  console.log('liquid')
})

sm.onEnter('gas', function (state) {
  console.log('Gas')
})

sm.onError(function (err) {
  console.error('error', err)
})

sm.trigger('melt')
sm.trigger('vaporize')
sm.trigger('condense')
sm.trigger('freeze')
