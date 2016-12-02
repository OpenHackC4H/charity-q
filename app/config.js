const config = {
  logLevel: process.env.LOG_LEVEL || 'info',
  couchDb: {
    url: process.env.COUCHDB_URL,
    dbName: 'q'
  },
  http: {
    port: 3000
  }
}

module.exports = config
