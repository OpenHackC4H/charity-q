const config = require('../config')
const util = require('util')
const rp = require('request-promise');

//Base
const baseUri = 'https://apisandbox.openbankproject.com'

//API versions
const v1Uri = baseUri + '/internal/v1.0'
const v2Uri = baseUri + '/obp/v2.1.0'

//Auth route
const authUri = baseUri + '/my/logins/direct'

//Model action routes
const accountsUri =  v2Uri + `/banks/${config.obp.bankId}/accounts`
const transationUri = v2Uri + `/banks/${config.obp.bankId}/accounts/%s/owner/transaction-request-types/SANDBOX_TAN/transaction-requests`
const deleteAccUri = v1Uri + `/banks/${config.obp.bankId}/accounts/%s`
const readAccountUri =  v2Uri + '/my/banks/rbs/accounts/%s/account'

const stdHeaders = {
  'Authorization': `DirectLogin token="${config.obp.token}"`,
  'Content-Type': 'application/json'
}

function deleteOpts(opt) {
  return {
    method: 'DELETE',
    uri:  util.format(deleteAccUri, opt.account),
    headers: stdHeaders,
    json: true
  }
}

function createOpts(opt) {
  return {
    method: 'PUT',
    uri:  accountsUri + `/${opt.account}`,
    body: {
      user_id: config.obp.userId,
      label: opt.account,
      type: opt.account,
      balance: {
        currency:'EUR',
        amount:'0'
      }
    },
    headers: stdHeaders,
    json: true
  }
}

function transferOpts(opt) {
  return {
    method: 'POST',
    uri: util.format(transationUri, opt.from) ,
    body: {
      to: {
      bank_id: config.obp.bankId,
        account_id: opt.to
      },
      value: {
        currency: 'EUR',
        amount: opt.amount,
      },
      description: opt.desc
    },
    headers: stdHeaders,
    json: true
  }
}

function readAllOpts(opt) {
  return {
    method: 'GET',
    uri: accountsUri,
    headers: stdHeaders,
    json: true
  }
}

function readOpts(opt) {
  return {
    method: 'GET',
    uri: util.format(readAccountUri, opt.account),
    headers: stdHeaders,
    json: true
  }
}

function readTransactionsOpts(opt) {
  return {
    method: 'GET',
    uri: `https://apisandbox.openbankproject.com/obp/v2.1.0/my/banks/rbs/accounts/${opt.account}/transactions`,
    headers: stdHeaders,
    json: true
  }
}

function filterByTime(opt) {
    return function(t) {
      const tMs = new Date(t.details.completed).getTime()
      return tMs >= opt.fromTime
    }
}

function filterByExpenses(d) {
  return d.details.value.amount < 0
}

module.exports = {
  createAcc: (opt) => {
    return rp(createOpts(opt))
  },
  deleteAcc: (opt) => {
    return rp(deleteOpts(opt))
  },
  transfer: (opt) => {
    return rp(transferOpts(opt))
  },
  read: (opt) => {
      return rp(readOpts(opt))
  },
  readAll: (opt) => {
    return rp(readAllOpts(opt))
  },
  readTransactions: (opt, cb) => {
    rp(readTransactionsOpts(opt))
    .then((data) => {
      data = data.transactions
      if (opt.fromTime){
         data = data.filter(filterByTime(opt))
      }

      if (opt.expenses){
        data = data.filter(filterByExpenses)
      }

      cb(data)
    })
  }
}
