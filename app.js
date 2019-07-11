// const { connect_db } = require('./src/helpers/db.helper')
 
// connect_db()
//     .then(() => {
//         console.log('successfully connected to database')
//     })
//     .catch(() => {
//         console.log('error in connecting to db, please check db availability')
//         process.exit(1)
//     })

const { requestPromiseGenerator } = require('./src/helpers/request.helper')
const PromiseQueue = require('./src/helpers/promiseQueue')
const processBody = require('./src/helpers/processBody')

const queue = PromiseQueue(5, processBody)

const requestPromise = requestPromiseGenerator('https://medium.com')

queue.add(requestPromise)