const log = require('winston')
const config = require('../config')
const donation = require('../database/donation')

module.exports = (d) => {
  log.debug('Donation received', d.email, d.amount)
  const adminFee = d.amount * config.business.adminFee
  log.debug('Admin fee', adminFee)
  d.amount -= adminFee
  return donation.create(d)
}
