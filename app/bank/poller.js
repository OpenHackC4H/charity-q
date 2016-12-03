const log = require('winston')
const bank = require('./index')
const db = require('../database/donation')

function filterHandledTransactions(handledTrans) {
    return function(t) {
        const found = handledTrans.find((ht) => {
          return t.id == ht
        })
        return found == undefined
    }
}

module.exports = {
    poll: (opt) => {
      setInterval(() => {
        bank.readTransactions(opt, (data) => {
          db.spent(opt.fromTime, new Date().getTime())
          .then(result => {
            const newTrans = data.filter(filterHandledTransactions(result))

            log.info('Found ', newTrans.length, ' transactions')
            if (newTrans.length > 0){
              log.info('Updating database ...')
            }
          })
          .catch(err => {
            log.info(err)
          })
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
