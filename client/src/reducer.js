import * as types from './actions'

const initialState = {
  queue: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_QUEUE_DONE:
      return {
        ...state,
        queue: action.queue
      }
    default:
      return state
  }
}
