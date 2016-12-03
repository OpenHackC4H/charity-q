const log = require('winston')
const server = require('./http/server')
const config = require('./config')
const poller = require('./bank/poller')

log.level = config.logLevel

server.listen().then(log.info)
.then(() => {
  if(config.obp.active) poller.poll()
  log.info('App is running')
})
.catch(err => {
  log.error(`Failed to setup application: ${err}`)
  if(err.stack) log.error(`Stack: ${err.stack}`)
})
