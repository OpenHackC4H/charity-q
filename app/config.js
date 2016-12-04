const config = {
  logLevel: process.env.LOG_LEVEL || 'info',
  couchDb: {
    url: process.env.COUCHDB_URL,
    dbName: 'q'
  },
  http: {
    port: 3000
  },
  business: {
    adminFee: 0.15,
    maxDonation: 500,
    minDonation: 0
  },
  obp: {
    active: process.env.OBP_ACTIVE,
    userId: 'ccaec25d-214f-4ec3-a561-b3e0ee87e8a7',
    bankId: 'rbs',
    token: process.env.OBP_TOKEN,
    money: {
      source: 'moneymaker',
      targets: ['q-customer-1', 'q-customer-2', 'q-customer-3', 'q-organisation', 'q-retail-1', 'q-retail-2']
    }
  }
}

module.exports = config
