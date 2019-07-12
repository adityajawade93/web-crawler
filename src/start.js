/**
 * loads all the required helpers and intializes the promise queue with a promise generator for root url
 * 
 * thus starts the crawling from root url
 */
const { requestPromiseGenerator } = require('./helpers/request.helper')
const PromiseQueue = require('./helpers/promiseQueue')
const processBody = require('./helpers/processBody')
const config = require('./config')

const queue = PromiseQueue(config.maxConcurrentRequests, processBody)
const requestPromise = requestPromiseGenerator(config.rootUrl)

queue.add(requestPromise)