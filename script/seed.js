const random = n => Math.floor(Math.random() * n)
const patterns = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4]

const donations = (n, state) => {
  return new Array(n)
  .fill()
  .map((el, i) => ({
    _id: `donation_${state}_${i}`,
    type: 'donation',
    state,
    amount: random(195) + 5, // 5 - 200
    time: Date.now() - random(120000),
    email: `fname.lname${i}@email.com`,
    pattern: patterns[random(patterns.length)]
  }))
}

const spending = (donations, id) => {
  const donation_ids = donations.map(el => el._id)
  const amount = donations.map(el => el.amount).reduce((p, c) => p + c)
  return {
    _id: `spending_${id}`,
    type: 'spending',
    time: Date.now() - random(120000),
    receiver: `Rec-${random(999) + 1000}`, // 1000 - 1999
    donations: donation_ids,
    amount,
  }
}

const recipients = [
  {
    type: 'recipient',
    _id: 'ExpenseAccount1',
    account: 'ExpenseAccount1',
    tags: ['mosquito nets in Uganda']
  },
  {
    type: 'recipient',
    _id: 'ExpenseAccount2',
    account: 'ExpenseAccount2',
    tags: ['build schools in nepal']
  },
  {
    type: 'recipient',
    _id: 'ExpenseAccount3',
    account: 'ExpenseAccount3',
    tags: ['micro loans in India']
  }
]

module.exports = {
  donations,
  spending,
  recipients
}
