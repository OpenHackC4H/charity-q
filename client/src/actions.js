export const FETCH_QUEUE = 'FETCH_QUEUE'
export const FETCH_QUEUE_DONE = 'FETCH_QUEUE_DONE'
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const FETCH_TAGS = 'FETCH_TAGS'
export const ADD_TAG = 'ADD_TAG'
export const REMOVE_TAG = 'REMOVE_TAG'

export function fetchQueue() {
  return {
    type: FETCH_QUEUE
  }
}

export function fetchQueueDone(queue) {
  return {
    type: FETCH_QUEUE_DONE,
    queue
  }
}

export function fetchAccounts() {
  return {
    type: FETCH_ACCOUNTS,
  }
}

export function fetchTags() {
  return {
    type: FETCH_TAGS
  }
}

export function addTag(account, tag) {
  return {
    type: ADD_TAG,
    account: account,
    tag: tag
  }
}

export function removeTag(account, tag) {
  return {
    type: REMOVE_TAG,
    account: account,
    tag: tag
  }
}
