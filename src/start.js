const { requestPromiseGenerator } = require('./helpers/request.helper')
const PromiseQueue = require('./helpers/promiseQueue')
const processBody = require('./helpers/processBody')
const config = require('./config')

const queue = PromiseQueue(config.maxConcurrentRequests, processBody)
const requestPromise = requestPromiseGenerator(config.rootUrl)

queue.add(requestPromise)