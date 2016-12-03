const db = require('./')

const getTags = () => {
  return db.view('views', 'tags')
  .then(results => results.rows) //TODO handle empty result?
}

const tag = (account, tag) => {
  return db.get(account)
  .then(body => {
    body.tags.push(tag)
    return db.insert(body)
  })
  .catch(err => {
    body = {
      _id: account,
      account: account,
      type: 'recipient',
      tags: [tag]
    }
    return db.insert(body)
  })
}

const untag = (account, tag) => {
  return db.get(account)
  .then(body => {
    body.tags = body.tags.filter(x => x != tag)
    return db.insert(body)
  })
}

module.exports = {
  getTags,
  tag,
  untag
}
