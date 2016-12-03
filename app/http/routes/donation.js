const express = require('express')
const donation = require('../../database/donation')

const router = express.Router()

const create = (req, res) => {
  donation.create(req.body)
  .then(result => {
    res.end()
  })
  .catch(err => {
    next(err)
  })
}

router.post('/', create)

module.exports = router
