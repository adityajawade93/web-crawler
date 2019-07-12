/**
 * put a promise wrapper aroung request and return that function to call and resolve later, with its url persisting in a closure
 */

const request = require('request')

function requestPromiseGenerator(url) {
    return function requestPromise() {
        return new Promise((resolve, reject) => {
            request.get(url, (err, response, body) => {

                if (err) {
                    reject(err)
                    return
                }

                if (response && response.statusCode === 200) {
                    resolve(body)
                } else {
                    reject(`request failed for url ${url} with statusCode ${(response &&  response.statusCode) || 'Unknown'}`)
                }
            })
        })
    }
}

module.exports = {
    requestPromiseGenerator
}