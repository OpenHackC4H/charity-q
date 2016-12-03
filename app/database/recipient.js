const db = require('./')

const getTags = () => {
  return db.view('views', 'tags')
  .then(results => results.rows) //TODO handle empty result?
}

const tag = (account, tag) => {
  data = {
    _id: account,
    account: account,
    type: 'recipient',
    tags: [tag]
  }
  return db.insert(data)
}

const untag = (account, tag) => {
  //TODO
}

module.exports = {
  getTags,
  tag,
  untag
}
