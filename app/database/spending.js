const db = require('./')

const create = data => {
  data.type = 'spending'
  return db.insert(data)
}

module.exports = {
  create
}
