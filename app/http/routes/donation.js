const express = require('express')

const router = express.Router()

const one = (req, res, next) => {
  if(req.params.id === 'err') {
    return next({status: 400, msg: 'err no good'})
  }

  res.json({
    id: req.params.id
  })
}

router.get('/:id', one)


module.exports = router
