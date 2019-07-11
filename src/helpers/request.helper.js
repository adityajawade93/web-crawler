const request = require('request')
const { close_db } = require('./db.helper')

function requestPromiseGenerator(url) {
    return function requestPromise() {
        return new Promise((resolve, reject) => {
            request.get(url, (err, response, body) => {
                if (response.statusCode === 200) {
                    resolve(body)
                } else {
                    reject(`request failed with status code ${ response.statusCode }`)
                    close_db()
                    process.exit(1)
                }
            })
        })
    }
}

module.exports = {
    requestPromiseGenerator
}