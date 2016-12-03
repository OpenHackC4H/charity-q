import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as actions from './actions'
import 'isomorphic-fetch'

export default function* root() {
  yield takeEvery(actions.FETCH_QUEUE, fetchQueue)
}

export function fetchApi(url) {
  return fetch(url)
    .then(response => response.json())
}

export function* fetchQueue() {
  try {
    const queue = yield call(fetchApi, 'donation/queue')
    console.log(queue)
    yield put(actions.fetchQueueDone(queue))
  } catch(err) {
    console.log(err)
    // Error handling
  }
}
