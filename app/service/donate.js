const log = require('winston')
const config = require('../config')
const donation = require('../database/donation')

module.exports = (d) => {
  const adminFee = Math.round(d.amount * config.business.adminFee)
  log.debug(`[donate] email: ${d.email}, amount: ${d.amount}, admin: ${adminFee}`)
  d.amount -= adminFee
  return donation.create(d)
}
