const express = require('express')
const spending = require('../../database/spending')
const spend = require('../../service/spend')

const router = express.Router()

const read = (req, res, next) => {
  spending.read()
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    next(err)
  })
}

const create = (req, res, next) => {
  spend(req.body)
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    if(err.name === 'overspending') {
      err = {
        status: 400,
        message: 'The requested spending amount exeeds the amount of donations in the queue.'
      }
    }
    next(err)
  })
}

router.post('/', create)
router.get('/', read)

module.exports = router
