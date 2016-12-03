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

            log.debug('Found ', newTrans.length, ' transactions')
            if (newTrans.length > 0){
              log.debug('Updating database ...')
              transObjs = newTrans.map((t) => {
                return {
                  _id: t.id,
                  fromId: t.account.id,
                  toId: t.counterparty.id,
                  fromNum: t.account.number,
                  toNum: t.counterparty.number,
                  desc: t.details.description,
                  currency: t.details.value.currency,
                  amount: parseFloat(t.details.value.amount)
                }
                transObjs.forEach(t => {
                    spend(t)
                    .then(r => console.log(r))
                    .catch(e => console.log(e))
                })
              })
              console.log(transObjs)
              log.info('Updating database ...')
            }
          })
          .catch(err => {
            log.error(err)
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
