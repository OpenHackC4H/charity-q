const db = require('./')

const create = data => {
  data.type = 'donation'
  return db.insert(data)
}

const read = () => {
}

module.exports = {
  create,
  read
}
