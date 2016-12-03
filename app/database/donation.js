const db = require('./')

const create = data => {
  data.type = 'donation'
  data.state = 'in_queue'
  return db.insert(data)
}

const queue = () => {
  return db.view('views', 'queue')
  .then(result => {
    return result.rows
    .map(el => ({
      email: el.key,
      amount: el.value
    }))
  })
}

const sum = (state) => {
  const params = {
    key: state
  }
  return db.view('views', 'sum', params)
  .then(result => ({
    sum: result.rows[0].value
  }))
}

module.exports = {
  create,
  queue,
  sum
}
