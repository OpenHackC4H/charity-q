const log = require('winston')
const donation = require('../database/donation')
const spending = require('../database/spending')
const db = require('../database')

const covered = (queued, spent, amount) => {
  if(!queued.length) {
    const error = new Error()
    error.name = 'overspending'
    throw error
  }
  if(amount <= 0) return spent

  const [head, ...tail] = queued
  const s = spent.concat(head)
  const a = amount - head.amount
  return covered(tail, s, a)
}

module.exports = (s) => {
  log.debug('Spending detected')
  const amount = s.amount
  let spent_ids

  return donation.queue()
  .then(queued => {
    const spent = covered(queued, [], amount)
    .map(el => {
      el.state = 'spent'
      return el
    })
    spent_ids = spent.map(el => el._id)
    return db.bulk(spent)
  })
  .then(() => {
    s.donations = spent_ids
    return spending.create(s)
  })
  .then(() => {
    return spent_ids
  })
}
