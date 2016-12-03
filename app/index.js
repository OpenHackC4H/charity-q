const log = require('winston')
const server = require('./http/server')
const config = require('./config')
const poller = require('./bank/poller')

log.level = config.logLevel

server.listen().then(log.info)
.then(() => {
  poller.poll({interval: 5000, fromTime: poller.today(), account: 'q-organisation'})
  log.info('App is running')
})
.catch(err => {
  log.error(`Failed to setup application: ${err}`)
  if(err.stack) log.error(`Stack: ${err.stack}`)
})
