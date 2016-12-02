const express = require('express')
const staticPath = `${__dirname}/../../static`
const fileServer = express.static(staticPath)

module.exports = fileServer
