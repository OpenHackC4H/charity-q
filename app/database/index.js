const db = require('./db').db

const insert = (doc, id) => {
  return new Promise((resolve, reject) => {
    db.insert(doc, id, (err, body) => {
      if(err) return reject(err)
      resolve(`Document created with id "${body.id}"`)
    })
  })
}

const view = (design, name, startkey, endkey) => {
  const params = {
    group: true,
    reduce: true,
    startkey,
    endkey
  }

  return new Promise((resolve, reject) => {
    db.view(design, name, params, (err, body) => {
      if(err) return reject(err)
      resolve(body)
    })
  })
}

module.exports = {
  insert,
  view
}
