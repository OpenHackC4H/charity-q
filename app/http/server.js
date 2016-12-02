const express = require('express')
const log = require('winston')
const config = require('../config')
const allowCors = require('./allowCors')
const fileServer = require('./fileServer')

const app = express()

app.use(allowCors)
app.use('/donation', require('./routes/donation'))
app.use('/', fileServer)

const listen = () => {
  return new Promise((resolve) => {
    const server = app.listen(config.http.port, () => {
      const addr = server.address()
      resolve(`Server running on: http://${addr.address}:${addr.port}`)
    })
  })
}

// eslint-disable-next-line
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status)

  if(status === 500) {
    log.error(err.message || 'Server error')
    return res.end()
  }

  res.json({message: err.message})
})

module.exports = {
  listen
}
