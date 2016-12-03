import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as actions from './actions'
import 'isomorphic-fetch'

export default function* root() {
  yield takeEvery([
    actions.FETCH_QUEUE, fetchQueue,
    actions.FETCH_TOTAL_AMOUNT, fetchTotalAmount
  ])
}

export function fetchApi(url) {
  return fetch(url)
    .then(response => response.json())
}

export function* fetchQueue() {
  try {
    const queue = yield call(fetchApi, 'donation/queue')
    yield put(actions.fetchQueueDone(queue))
  } catch(err) {
    console.log(err)
    // Error handling
  }
}

export function* fetchTotalAmount() {
  try {
    const totalAmount = yield call(fetchApi, 'donation/sum')
    yield put(actions.fetchTotalAmountDone(totalAmount))
  } catch(err) {
    console.log(err)
    // Error handling
  }
}

