import { takeLatest } from 'redux-saga'
import * as actions from './actions'

export default function* root() {
  yield takeLatest(actions.PLACEHOLDER, doStuff)
}

export function* doStuff(){

}
