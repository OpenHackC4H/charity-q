const email = require('../app/sendmail')

const command = process.argv[2]
switch (command) {
  case 's':
    email.send(email.defaultOpts)
    break
  default:
    log.info('Incorrect usage')
}
