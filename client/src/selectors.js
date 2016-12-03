export const getQueue = state => state.queue
export const getTotalAmount = state => state.totalAmount
export const getActiveDonation = state => {
  return state.queue.find(donation => {
    return donation._id === state.activeDonation
  })
}