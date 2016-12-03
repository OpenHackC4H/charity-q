const express = require('express')
const donation = require('../../database/donation')
const donate = require('../../service/donate')

const router = express.Router()

const queue = (req, res, next) => {
  donation.queueFull()
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    next(err)
  })
}

const create = (req, res, next) => {
  donate(req.body)
  .then(() => {
    res.end()
  })
  .catch(err => {
    next(err)
  })
}

const sum = (req, res, next) => {
  const state = req.query.state
  donation.sum(state)
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    next(err)
  })
}

const spent = (req, res, next) => {
  const from = parseInt(req.query.from)
  const to = parseInt(req.query.to)

  donation.spent(from, to)
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    next(err)
  })
}

const leaderboard = (req, res, next) => {
  donation.leaderboard()
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    next(err)
  })
}

router.post('/', create)
router.get('/queue', queue)
router.get('/sum', sum)
router.get('/spent', spent)
router.get('/leaderboard', leaderboard)

module.exports = router
