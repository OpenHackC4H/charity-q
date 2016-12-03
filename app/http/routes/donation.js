const express = require('express')
const donation = require('../../database/donation')

const router = express.Router()

const queue = (req, res, next) => {
  donation.queue()
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    next(err)
  })
}

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
router.get('/queue', queue)

module.exports = router
