module.exports = {
  _id: '_design/views',
  views: {
    queue: {
      map: function(doc) {
        if (doc.type === 'donation' && doc.state === 'in_queue') {
          emit(doc.email, doc.amount)
        }
      }
    }
  }
}
