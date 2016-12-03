const db = require('./')

const create = data => {
  data.type = 'spending'
  return db.insert(data)
}

const read = () => {
  return db.view('views', 'spendings')
  .then(result => result.rows.map(el => el.value))
}

const readIds = () => {
  return db.view('views', 'spendings')
  .then(result => result.rows.map(el => el.value._id))
}

module.exports = {
  create,
  read,
  readIds
}
