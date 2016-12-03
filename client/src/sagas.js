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
    takeLatest(actions.FETCH_QUEUE, fetchQueue)
  ]
}

export function fetchApi(url) {
  return fetch(url)
    .then(response => response.json())
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
    const response = yield call(fetchApi, 'donation/sum')
    
    yield put(actions.fetchTotalAmountDone(response.sum))
  } catch(err) {
    console.log(err)
    // Error handling
  }
}

