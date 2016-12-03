export const FETCH_QUEUE = 'FETCH_QUEUE'
export const FETCH_QUEUE_DONE = 'FETCH_QUEUE_DONE'

export function fetchQueue() {
  console.log('acions')
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
