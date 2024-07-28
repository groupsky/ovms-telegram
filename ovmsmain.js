// expose the telegram module to the global scope
globalThis.telegram = require('lib/telegram.js')

globalThis.telegram.sendMessage('Hello, from ovmsmain')

globalThis.telegram.startSendingEvents([
  'location.alert.flatbed.moved',
  'notify.alert',
  'notify.error',
  'vehicle.alarm',
  'vehicle.alert',
  'vehicle.charge',
  'vehicle.locked',
  'vehicle.unlocked',
  'vehicle.off',
  'vehicle.on',
])

PubSub.subscribe('system.shuttingdown', function () {
  globalThis.telegram.sendMessage('OVMS is shutting down')
  globalThis.telegram.stopSendingEvents()
})
