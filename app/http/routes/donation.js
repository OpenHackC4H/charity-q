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

const one = (req, res, next) => {
  if(req.params.id === 'err') {
    return next({status: 400, msg: 'err no good'})
  }

  res.json({
    id: req.params.id
  })
}

router.post('/', create)
router.get('/:id', one)

module.exports = router
