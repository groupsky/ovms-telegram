// Telegram plugin for OVMS
//
// This plugin sends messages to telegram chat using the telegram bot API.
//
// Configuration:
//   usr telegram.bot_token: Telegram bot token
//   usr telegram.chat_id: Telegram chat id
//
// API methods:
//   telegram.sendMessage(message): Send message to configured telegram chat
//   telegram.startSendingEvents(events): Start sending events to telegram chat
//   telegram.stopSendingEvents(events): Stop sending events to telegram chat
//   telegram.resetConfig(): Reset telegram configuration
//
// This plugin requires the telegram bot token and chat id to be configured.
// The bot token can be obtained by creating a new bot using the BotFather
// (https://core.telegram.org/bots#botfather). The chat id can be obtained by
// sending a message to the bot and then calling the getUpdates method of the
// telegram bot API (https://core.telegram.org/bots/api#getupdates).
//
// Example configuration:
//   config set usr telegram.bot_token "1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//   config set usr telegram.chat_id "-1234567890"
//
// Example API call:
//   telegram.sendMessage("Hello, world!")
//
// https://docs.openvehicles.com/en/latest/userguide/scripting.html

// NOTE: const in duktape implementation is not much more than var offers
// https://wiki.duktape.org/postes5features
const DEBUG = false

// simple console shim
function logger() {
  function log(message, obj) {
    print(
      '[telegram](' +
        new Date().toLocaleString() +
        ') ' +
        message +
        (obj ? ' ' + JSON.stringify(obj) : '') +
        '\n'
    )
  }

  function debug(message, obj) {
    if (DEBUG) {
      log('DEBUG: ' + message, obj)
    }
  }

  function error(message, obj) {
    log('ERROR: ' + message, obj)
  }

  function info(message, obj) {
    log('INFO: ' + message, obj)
  }

  function warn(message, obj) {
    log('WARN: ' + message, obj)
  }

  return {
    debug,
    error,
    info,
    log,
    warn,
  }
}

const console = logger()

function getConfig() {
  return OvmsConfig.GetValues('usr', 'telegram.')
}

function validateConfig(config) {
  if (!config.bot_token) {
    OvmsNotify.Raise(
      'error',
      'usr.telegram.status',
      'TELEGRAM::usr config usr telegram.bot_token not set'
    )
    return false
  }
  if (!config.chat_id) {
    OvmsNotify.Raise(
      'error',
      'usr.telegram.status',
      'TELEGRAM::usr config usr telegram.chat_id not set'
    )
    return false
  }
  return true
}

// API method telegram.sendMessage()
function sendMessage(message) {
  const config = getConfig()
  if (!validateConfig(config)) {
    return
  }

  const url =
    'https://api.telegram.org/bot' +
    encodeURIComponent(config.bot_token) +
    '/sendMessage?chat_id=' +
    encodeURIComponent(config.chat_id) +
    '&text=' +
    encodeURIComponent(message)

  console.log('Sending message', message)
  HTTP.Request({
    done: function (response) {
      if (response.statusCode !== 200) {
        console.warn('Non 200 response from telegram', response)
      }
    },
    fail: function (error) {
      console.error('Telegram error', error)
    },
    url,
  })
}

function sendEvent(msg, data) {
  sendMessage('[' + msg + ']' + (data ? ' ' + data : ''))
}

// API method telegram.startSendingEvents()
function startSendingEvents(events) {
  if (typeof events === 'string') {
    events = [events]
  }
  for (var i = 0, l = events.length; i < l; i++) {
    PubSub.subscribe(events[i], sendEvent)
  }
}

// API method telegram.stopSendingEvents()
function stopSendingEvents(events) {
  if (!events) {
    PubSub.unsubscribe(sendEvent)
  } else {
    if (typeof events === 'string') {
      events = [events]
    }
    for (var i = 0, l = events.length; i < l; i++) {
      PubSub.unsubscribe(events[i])
    }
  }
}

// API method telegram.resetConfig()
function resetConfig() {
  OvmsConfig.SetValues('usr', 'telegram.', {})
  OvmsNotify.Raise(
    'info',
    'usr.telegram.status',
    'TELEGRAM::usr telegram config reset'
  )
}

module.exports = {
  sendMessage,
  startSendingEvents,
  stopSendingEvents,
  resetConfig,
}
