const express = require('express')
const recipient = require('../../database/recipient')

const router = express.Router()

const getTags = (req, res, next) => {
  recipient.getTags()
  .then(tags => {
    res.json(tags)
  })
  .catch(next)
}

const tag = (req, res, next) => {
  recipient.tag(req.body.accountId, req.body.tag)
  .then(() => res.end())
  .catch(err => res.send(err))
}

const untag = (req, res, next) => {
  recipient.untag(req.body.accountId, req.body.tag)
  .then(() => res.end())
}

router.get('/tags', getTags)
router.put('/tag', tag)
router.delete('/tag', untag)

module.exports = router
