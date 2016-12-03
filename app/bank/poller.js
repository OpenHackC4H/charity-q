const log = require('winston')
const bank = require('./index')

module.exports = {
    poll: (opt) => {
      setInterval(() => {
        bank.readTransactions(opt, (data) => {
//          console.log(data)
        })
      }, opt.interval)
    },
    today: () => {
      const fromTime = new Date()
      fromTime.setUTCHours(0)
      fromTime.setUTCMinutes(0)
      fromTime.setUTCSeconds(0)
      fromTime.setUTCMilliseconds(0)

      return fromTime.getTime()
    }
}
