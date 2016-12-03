export const getQueue = state => state.queue
export const getActiveDonation = state => {
  return state.queue.find(donation => {
    return donation.id === state.activeDonation
  })
}