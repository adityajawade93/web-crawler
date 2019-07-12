const request = require('request')

function requestPromiseGenerator(url) {
    return function requestPromise() {
        return new Promise((resolve, reject) => {
            request.get(url, (err, response, body) => {

                if (err) {
                    reject(err)
                    return
                }

                if (response.statusCode === 200) {
                    resolve(body)
                } else {
                    reject(`request failed for url ${url}`)
                }
            })
        })
    }
}

module.exports = {
    requestPromiseGenerator
}