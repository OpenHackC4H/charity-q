const log = require('winston')
const bank = require('./index')
const db = require('../database/spending')
const spend = require('../service/spend')

const today = () => {
  const fromTime = new Date()
  fromTime.setUTCHours(0)
  fromTime.setUTCMinutes(0)
  fromTime.setUTCSeconds(0)
  fromTime.setUTCMilliseconds(0)

  return fromTime.getTime()
}

function filterHandledTransactions(handledTrans) {
    return function(t) {
        const found = handledTrans.find((ht) => {
          return t.id == ht
        })
        return found == undefined
    }
}

const opt = {
  interval: 5000,
  fromTime: today(),
  account: 'q-organisation',
  expenses: false
}

const sendMain = (mailObj) => {

}

const handleSpendId = (id) => {

}

const handleSpentIds = (ids) => {

}

module.exports = {
    poll: () => {
      setInterval(() => {
        bank.readTransactions(opt, (data) => {
          db.readIds()
          .then(result => {
            const newTrans = data.filter(filterHandledTransactions(result))

            if (newTrans.length > 0){
              transObjs = newTrans.map((t) => {
                return {
                  _id: t.id,
                  fromId: t.account.id,
                  recipientId: t.counterparty.id,
                  fromNum: t.account.number,
                  recipientNum: t.counterparty.number,
                  desc: t.details.description,
                  currency: t.details.value.currency,
                  amount: parseFloat(t.details.value.amount)
                }
              })
              transObjs.forEach(t => {
                  spend(t)
                  .then(r => {
                    log.info(r)
                    log.info('handle spent ids')
                  })
                  .catch(e => log.info(e))
              })
            }
          })
          .catch(err => {
            log.error(err)
          })
        })
      }, opt.interval)
    }
}
