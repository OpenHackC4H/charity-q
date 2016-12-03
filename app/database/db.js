const nano = require('nano')
const config = require('../config')
const couchdb = nano(config.couchDb.url)
const db = couchdb.use(config.couchDb.dbName)

module.exports = {
  conn: couchdb,
  db
}
