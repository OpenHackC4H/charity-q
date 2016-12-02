import * as types from './actions'

const initialState = {
  test: "test"
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.PLACEHOLDER:
      return {
        ...state,
        test: "test2"
      }
    default:
      return state
  }
}
