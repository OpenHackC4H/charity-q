const donations = (n) => {
  return new Array(n)
  .fill()
  .map((el, i) => ({
    type: 'donation',
    amount: Math.round(Math.random() * 1000),
    time: Date.now(),
    email: `fname.lname${i}@email.com`
  }))
}

module.exports = {
  donations
}
