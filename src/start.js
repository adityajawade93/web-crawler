const { requestPromiseGenerator } = require('./helpers/request.helper')
const PromiseQueue = require('./helpers/promiseQueue')
const processBody = require('./helpers/processBody')

const queue = PromiseQueue(3, processBody)

const requestPromise = requestPromiseGenerator('https://medium.com')

queue.add(requestPromise)