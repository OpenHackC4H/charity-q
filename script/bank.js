const log = require('winston')
const bank = require('../app/bank')
const util = require('util');
const bodyParser = require('body-parser')
const rp = require('request-promise');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const config = require('../app/config')

function printAccounts() {
  bank.readAll()
  .then((accounts) => {
    accounts.forEach((a) => console.log(a))
  })
  .catch((err) => log.info(err))
}

const command = process.argv[2]
switch (command) {
  case 'c':
    log.info('setup ...')
    config.obp.money.targets.forEach((t) => {
      bank.createAcc({account: t})
    })
    break;
  case 'd':
    log.info('tear down ...')
    config.obp.money.targets.forEach((t) => {
      bank.deleteAcc({account: t})
      .then((d) => log.info(d))
      .catch((d) => log.info(d))
    })
    break;
  case 'p':
    log.info('populate with money ...')
    config.obp.money.targets.forEach((t) => {
        bank.transfer({from: config.obp.money.source, to: t, amount: '100', desc: ''})
        .then((d) => log.info(d))
        .catch((d) => log.info(d))
    })
    break;
  case 'l':
    log.info('print accounts ...')
    config.obp.money.targets.forEach((t) => {
      bank.read({account: t})
      .then((d) => console.log(d))
      .catch((d) => log.info(`Failed to log ${t}`))
    })
    break;
  default:
    log.info('Incorrect usage')
}
