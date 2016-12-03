const db = require('./db').db

const insert = (doc, id) => {
  return new Promise((resolve, reject) => {
    db.insert(doc, id, (err, body) => {
      if(err) return reject(err)
      resolve(doc)
    })
  })
}

const view = (design, name, params = {}) => (
  new Promise((resolve, reject) => {
    db.view(design, name, params, (err, body) => {
      if(err) return reject(err)
        resolve(body)
    })
  })
)

const get = id => (
  new Promise((resolve, reject) => {
    db.get(id, (err, body) => {
      if(err) return reject(err)
      resolve(body)
    });
  })
)

module.exports = {
  insert,
  view,
  get
}
