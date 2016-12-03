module.exports = {
  _id: '_design/views',
  views: {
    queue: {
      map: function(doc) {
        if (doc.type === 'donation' && doc.state === 'in_queue') {
          emit(doc.time, doc)
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
    sum_email: {
      map: function(doc) {
        if (doc.type === 'donation' && doc.state === 'in_queue') {
          emit(doc.email, doc.amount)
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
    },
    spendings: {
      map: function(doc) {
        if (doc.type === 'spending') {
          emit(doc.receiver, doc)
        }
      }
    },
    tags: {
      map: function(doc) {
        if (doc.type === 'recipient') {
          emit(doc.account, doc.tags)
        }
      }
    }
  }
}
