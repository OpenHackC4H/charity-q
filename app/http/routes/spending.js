const express = require('express')
const spend = require('../../service/spend')

const router = express.Router()

const create = (req, res, next) => {
  spend(req.body)
  .then(() => {
    res.end()
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

module.exports = router
