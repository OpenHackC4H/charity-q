const log = require('winston')
const config = require('../config')
const donation = require('../database/donation')

const validate = amount => {
  let error
  if(amount > config.business.maxDonation) {
    error = new Error()
    error.name = 'above'
  }

  if(amount < config.business.minDonation) {
    error = new Error()
    error.name = 'below'
  }

  if(error) throw error
}

module.exports = (d) => {
  validate(d.amount)
  const adminFee = Math.round(d.amount * config.business.adminFee)
  log.debug(`[donate] email: ${d.email}, amount: ${d.amount}, admin: ${adminFee}`)
  d.amount -= adminFee
  return donation.create(d)
}
