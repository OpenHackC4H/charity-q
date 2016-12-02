import { takeLatest } from 'redux-saga/effects'
import * as actions from './actions'

export default function* root() {
  yield takeLatest(actions.PLACEHOLDER)
}
