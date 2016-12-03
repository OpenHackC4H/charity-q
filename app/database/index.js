const db = require('./db').db

const insert = (doc, id) => {
  return new Promise((resolve, reject) => {
    db.insert(doc, id, (err, body) => {
      if(err) return reject(err)
      resolve(doc)
    })
  })
}

const view = (design, name) => (
  new Promise((resolve, reject) => {
    db.view(design, name, (err, body) => {
      if(err) return reject(err)
        resolve(body)
    })
  })
)

module.exports = {
  insert,
  view
}
