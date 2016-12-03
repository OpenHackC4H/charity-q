
const bank = require('../../bank')
const express = require('express')
const router = express.Router()

const transfer = (req, res, next) => {
  bank.transfer(req.body)
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log(err)
  })
}

router.post('/transfer', transfer)
module.exports = router
