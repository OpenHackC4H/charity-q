const donations = (n, state) => {
  return new Array(n)
  .fill()
  .map((el, i) => ({
    _id: `donation_${state}_${i}`,
    type: 'donation',
    state,
    amount: Math.round(Math.random() * 1000), // 0 - 1000
    time: Date.now(),
    email: `fname.lname${i}@email.com`
  }))
}

const spending = (donations, id) => {
  donation_ids = donations.map(el => el._id)
  amount = donations.map(el => el.amount).reduce((p, c) => p + c)
  return {
    _id: `spending_${id}`,
    type: 'spending',
    time: Date.now(),
    receiver: `Rec-${Math.round((Math.random() * 999) + 1000)}`, // 1000 - 1999
    donations: donation_ids,
    amount,
  }
}

module.exports = {
  donations,
  spending
}
