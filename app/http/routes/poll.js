const express = require('express')
const router = express.Router()
const poller = require('../../bank/poller')

const poll = (req, res, next) => {
  poller.poll()
  res.json('')
}

router.post('/', poll)
module.exports = router
