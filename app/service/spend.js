const log = require('winston')
const donation = require('../database/donation')
const spending = require('../database/spending')
const db = require('../database')

const eaten = (sa, da) => (da - sa) < (da / 2)

const covered = (queued, spent, amount) => {
  if(!queued.length) {
    const error = new Error()
    error.name = 'overspending'
    throw error
  }
  const [head, ...tail] = queued
  const oom = amount <= 0
  const eat = eaten(amount, head.amount)
  log.debug('eat:', eat)
  if(oom || !eat) return spent

  const a = amount - head.amount
  const s = spent.concat(head)
  return covered(tail, s, a)
}

module.exports = (s) => {
  log.debug('Spending detected')
  const amount = s.amount
  let spent_ids

  return donation.queue()
  .then(queued => {
    queued.reverse()
    const spent = covered(queued, [], amount)
    .map(el => {
      el.state = 'spent'
      return el
    })
    spent_ids = spent.map(el => ({
      id: el._id,
      email: el.email
    }))
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
