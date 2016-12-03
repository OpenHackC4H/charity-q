module.exports = {
  _id: '_design/views',
  views: {
    queue: {
      map: function(doc) {
        if (doc.type === 'donation') {
          emit(doc.email, doc.amount)
        }
      }
    }
  }
}
