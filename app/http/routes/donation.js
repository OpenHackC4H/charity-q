const express = require('express')
const donation = require('../../database/donation')
const donate = require('../../service/donate')

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

const create = (req, res, next) => {
  try {
    donate(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      next(err)
    })
  } catch (err) {
    let error
    if(err.name === 'above') {
      error = {
        status: 501,
        message: 'Your donation is very generous! This will be much welcome when the application is released '
      }
    }
    else if(err.name === 'below') {
      error = {
        status: 400,
        message: 'Your donation is too small.'
      }
    }
    next(error)
  }
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
