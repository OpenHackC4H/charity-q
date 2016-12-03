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
  return new Promise((resolve, reject) => {
    conn.db.create(dbName, (err) => {
      if(err) return reject(err)
      resolve()
    })
  })
}

const deleteDatabase = () => {
  log.info('Deleting database...')
  return new Promise((resolve, reject) => {
    conn.db.destroy(dbName, (err) => {
      if(err) return reject(err)
      resolve()
    })
  })
}

const updateViews = () => {
  log.info('Updating views...')

  return new Promise((resolve, reject) => {
    db.get('_design/views', (err, existing) => {
      if(!err) designDoc._rev = existing._rev
      db.insert(designDoc, err => {
        if(err) return reject(err)
        resolve()
      })
    })
  })
}

const deleteData = () => {
  log.info('Deleting data...')

  return new Promise(resolve => {
    db.list((err, body) => {
      if(err) return log.error(err.message)
      const docs = body.rows
      .filter(doc => !doc.id.includes('_design'))
      .map(doc => ({
        _id: doc.id,
        _rev: doc.value.rev,
        _deleted: true
      }))
      db.bulk({ docs }, resolve)
    })
  })
}

const loadData = () => {
  log.info('Loading data...')

  const inQueue = seed.donations(10, 'in_queue')
  const spent = seed.donations(5, 'spent')
  const spending = seed.spending(spent, 'stuff')
  const recipients = seed.recipients

  const docs = inQueue.concat(spent).concat(spending).concat(recipients)

  return new Promise(resolve => {
    db.bulk({ docs }, (err) => {
      if(err) return log.error(err.message)
      resolve()
    })
  })
}

const command = process.argv[2]

switch (command) {
  case 'cd':
    createDatabase()
    break
  case 'dd':
    deleteDatabase()
    break
  case 'u':
    updateViews()
    break
  case 's':
    loadData()
    break
  case 'r':
    deleteData().
    then(() => {
      loadData()
    })
    break
  case 'd':
    deleteData()
    break
  case 'hard-r':
    deleteDatabase()
    .then(createDatabase)
    .then(updateViews)
    .then(loadData)
    .then(() => {
      log.info('Hard reset complete')
    })
    .catch(log.error)

    break
  default:
    log.info('Incorrect usage')
}
