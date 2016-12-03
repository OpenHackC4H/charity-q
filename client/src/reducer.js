import * as types from './actions'

const initialState = {
  queue: [
    { id: 1, amount: 200 },
    { id: 2, amount: 10 },
    { id: 3, amount: 50 },
    { id: 4, amount: 100 }
  ],
  totalAmount: 32677
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TOTAL_AMOUNT_DONE:
      return {
        ...state,
        totalAmount: action.totalAmount
       }
    case types.FETCH_QUEUE_DONE:
      return {
        ...state,
        queue: action.queue
      }
    default:
      return state
  }
}
