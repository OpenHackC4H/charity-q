import * as types from './actions'

const initialState = {
  queue: [
    { id: 1, amount: 200 },
    { id: 2, amount: 10 },
    { id: 3, amount: 50 },
    { id: 4, amount: 100 }
  ],
  totalAmount: 360,
  activeDonation: '',
  accounts: [],
  leaderboard: []
}

function mergeAccountLists(untagged, tagged) {
  const untaggedAccounts = untagged.filter(account => {
    const matchingAccounts = tagged.filter(newAccount => newAccount._id == account._id).length
    return matchingAccounts == 0
  })
  return untaggedAccounts.concat(tagged)
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TOTAL_AMOUNT_DONE:
      return {
        ...state,
        totalAmount: action.totalAmount
       }
    case types.FETCH_LEADERBOARD_DONE:
      return {
        ...state,
        leaderboard: action.leaderboard
       }
    case types.FETCH_QUEUE_DONE:
       return {
        ...state,
        queue: action.queue
      }
    case types.SET_ACTIVE_DONATION:
       return {
        ...state,
        activeDonation: action.id
      }
    case types.FETCH_TAGS_DONE:
      return {
        ...state,
        accounts: mergeAccountLists(state.accounts, action.accounts)
      }
    case types.FETCH_ACCOUNTS_DONE:
      return {
        ...state,
        accounts: mergeAccountLists(action.accounts, state.accounts)
        //accounts: mergeAccountLists(state.accounts, action.accounts)
      }
    default:
      return state
  }
}
