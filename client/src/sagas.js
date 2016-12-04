import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import 'isomorphic-fetch'

export default function* root(){
  yield fork(sagas)
}

export function* sagas() {
  yield [
    takeLatest(actions.FETCH_TOTAL_AMOUNT, fetchTotalAmount),
    takeLatest(actions.FETCH_QUEUE, fetchQueue),
    takeLatest(actions.FETCH_ACCOUNTS, fetchAccounts),
    takeLatest(actions.INSERT_DONATION, insertDonation),
    takeLatest(actions.FETCH_TAGS, fetchTags),
    takeLatest(actions.REMOVE_TAG, removeTag),
    takeLatest(actions.ADD_TAG, addTag),
    takeLatest(actions.FETCH_LEADERBOARD, fetchLeaderboard)
  ]
}

function normalizeAccountIds(accounts) {
  accounts.forEach(account => {
    if(account.id) account._id = account.id
    if(!account.value) account.value = []
  })
  return accounts
}

export function fetchApi(url, options = {}) {
  return fetch(url, options)
    .then(response => response.json())
}

export function insertApi(url, options = {}) {
  return fetch(url, options)
    .then(response => response)
}

export function* fetchQueue() {
  try {
    const queue = yield call(fetchApi, 'donation/queue')
    
    yield put(actions.fetchQueueDone(queue))
  } catch(err) {
    console.log(err) // Error handling
  }
}

export function* fetchLeaderboard() {
  try {
    const leaderboard = yield call(fetchApi, 'donation/leaderboard')
    yield put(actions.fetchLeaderboardDone(leaderboard))
  } catch(err) {
    console.log(err)
    // Error handling
  }
}

export function* fetchTotalAmount() {
  try {
    const response = yield call(fetchApi, 'donation/sum?state=in_queue')
    
    yield put(actions.fetchTotalAmountDone(response.sum))
  } catch(err) {
    console.log(err)
    // Error handling
  }
}

export function* fetchAccounts() {
  const options = {
    headers: {
      Authorization: 'DirectLogin token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIiOiIifQ.zXG9sAr_WE0hWDD3S4IsYS7_mLDCSCsF5HcfSI2m2xo"'
    }
  }
  try {
    const accounts = yield call(fetchApi, 'https://apisandbox.openbankproject.com/obp/v2.1.0/my/banks/rbs/accounts', options)
    yield put(actions.fetchAccountsDone(normalizeAccountIds(accounts)))
  } catch(err) {
    console.log(err)
    // Error handling
  }
}

export function* insertDonation(action){
  try {
    const { pattern, amount, email } = action.donation
    const payload = {
      pattern,
      amount,
      email
    }
    yield call(insertApi, 'donation', {
      body: JSON.stringify(payload), 
      method: 'POST', 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    yield call(fetchQueue)
  } catch (error) {
    console.log('insert failed', error)
  }
}

export function* fetchTags() {
  try {
    const accounts = yield call(fetchApi, 'recipient/tags')
    //yield put(actions.fetchTagsDone(accounts))
    yield put(actions.fetchTagsDone(normalizeAccountIds(accounts)))
  } catch(err) {
    console.log(err)
  }
}

export function* removeTag(action) {
  try {
    const options = {
      //method: 'PUT',
      method: 'DELETE',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify({
        accountId: action.account,
        tag: action.tag
      })
    }
    const accounts = yield call(insertApi, 'recipient/tag', options)
    yield put(actions.fetchTags())
  } catch(err) {
    console.log(err)
  }
}

export function* addTag(action) {
  try {
    const options = {
      method: 'PUT',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify({
        accountId: action.account,
        tag: action.tag
      })
    }
    const accounts = yield call(insertApi, 'recipient/tag', options)
    yield put(actions.fetchTags())
  } catch(err) {
    console.log(err)
  }
}
