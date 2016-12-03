const donations = (n, state) => {
  return new Array(n)
  .fill()
  .map((el, i) => ({
    type: 'donation',
    state,
    amount: Math.round(Math.random() * 1000),
    time: Date.now(),
    email: `fname.lname${i}@email.com`
  }))
}

module.exports = {
  donations
}
