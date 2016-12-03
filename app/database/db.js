const nano = require('nano')
const config = require('../config')

if(!config.couchDb.url) throw new Error('CouchDB url not set')

const couchDb = nano(config.couchDb.url)
const db = couchDb.use(config.couchDb.dbName)

module.exports = {
  conn: couchDb,
  db
}
