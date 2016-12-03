const log = require('winston')
const config = require('../app/config')
const database = require('../app/database/db')
const designDoc = require('../app/database/meta/design')
const seed = require('./seed')
const dbName = config.couchDb.dbName
const conn = database.conn
const db = database.db

const createDatabase = () => {
  log.info('Creating database...')
  conn.db.create(dbName, (err) => {
    if(err) log.error(err.message)
  })
}

const deleteDatabase = () => {
  log.info('Deleting database...')
  conn.db.destroy(dbName, (err) => {
    if(err) log.error(err.message)
  })
}

const updateViews = () => {
  log.info('Updating views...')

  db.head('_design/views', (err, body) => {
    if(!err) {
      const doc = Object.assign({}, designDoc, {_rev: body.etag.replace(/'/g, '')})
      db.insert(doc, (err, body) => {
        if(err) return log.error(err.message)
      })
      return
    }

    db.insert(designDoc, (err, body) => {
      if(err) log.error(err.message)
    })
  })
}

const deleteData = () => {
  log.info('Deleting data...')

  db.list((err, body) => {
    if(err) return log.error(err.message)
    const docs = body.rows
    .filter(doc => !doc.id.includes('_design'))
    .map(doc => ({
      _id: doc.id,
      _rev: doc.value.rev,
      _deleted: true
    }))
    db.bulk({ docs })
  })
}

const loadData = (ns) => {
  log.info('Loading data...')

  const n = parseInt(ns) || 1
  const docs = seed.donations(n)
  db.bulk({ docs }, (err) => {
    if(err) log.error(err.message)
  })
}

const command = process.argv[2]

switch (command) {
  case 'cd':
    return createDatabase()
  case 'dd':
    return deleteDatabase()
  case 'u':
    return updateViews()
  case 's':
    return loadData(process.argv[3])
  case 'd':
    return deleteData()
  default:
    log.info('Incorrect usage')
}
