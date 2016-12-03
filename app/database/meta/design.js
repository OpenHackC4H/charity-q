module.exports = {
  _id: '_design/views',
  views: {
    queue: {
      map: function(doc) {
        if (doc.type === 'donation' && doc.state === 'in_queue') {
          emit(doc.email, doc.amount)
        }
      }
    },
    sum: {
      map: function(doc) {
        if (doc.type === 'donation') {
          emit(doc.state, doc.amount)
        }
      },
      reduce: function(keys, values, rereduce) {
        return sum(values)
      }
    },
    spent: {
      map: function(doc) {
        if (doc.type === 'donation' && doc.state === 'spent') {
          emit(doc.time, doc._id)
        }
      }
    }
  }
}
