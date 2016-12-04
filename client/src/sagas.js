import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import * as actions from './actions'
import 'isomorphic-fetch'

export default function* root(){
  yield fork(sagas)
}

export function* sagas() {
  console.log('setup saga')
  yield [
    takeLatest(actions.FETCH_TOTAL_AMOUNT, fetchTotalAmount),
    takeLatest(actions.FETCH_QUEUE, fetchQueue),
    takeLatest(actions.FETCH_ACCOUNTS, fetchAccounts),
    takeLatest(actions.INSERT_DONATION, insertDonation)
  ]
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
  console.log('saga')
  try {
    const queue = yield call(fetchApi, 'donation/queue')
    console.log('quuee', queue)
    
    yield put(actions.fetchQueueDone(queue))
  } catch(err) {
    console.log(err)
    // Error handling
  }
}

export function* fetchTotalAmount() {
  console.log('saga')
  try {
    const response = yield call(fetchApi, 'donation/sum?state=in_queue')
    
    yield put(actions.fetchTotalAmountDone(response.sum))
  } catch(err) {
    console.log(err)
    // Error handling
  }
}

export function* fetchAccounts() {
  console.log('fetch accounts 1')
  const options = {
    headers: {
      Authorization: 'DirectLogin token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIiOiIifQ.zXG9sAr_WE0hWDD3S4IsYS7_mLDCSCsF5HcfSI2m2xo"'
    }
  }
  try {
    const accounts = yield call(fetchApi, 'https://apisandbox.openbankproject.com/obp/v2.1.0/my/banks/rbs/accounts', options)
    console.log('accounts:', accounts);
    yield put(actions.fetchAccountsDone(accounts))
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
