const cheerio = require('cheerio')
const { rootUrl } = require('../config')
const { requestPromiseGenerator } = require('./request.helper')
const { addUrl, updateUrl } = require('./db.helper')
const queryString = require('query-string')
const seenUrls = {}

/**
 * 
 * @param {*} body response body for the url
 * @param {*} queue reference to promise queue
 * 
 * this program loads the response body using cheerio and extracts all urls pointing to medium.com
 * 
 * it adds or updates this urls in db, also pushes new url to the promise queue for further processing
 */

function processBody(body, queue) {
    const loadedData = cheerio.load(body)
    loadedData(`a[href^="${rootUrl}"]`).each((index, element) => {
        const urlParts = element.attribs.href.split('?')
        let params = []
        let url = urlParts[0]
        if (urlParts.length > 1) {
            const qs = decodeURIComponent(urlParts[1])
            const paramObject = queryString.parse(qs)
            params = Object.keys(paramObject)
        }

        if (!seenUrls[url]) {
            seenUrls[url] = true
            queue.add(requestPromiseGenerator(url))
        }

        addUrl(url, params)
            .then(() => {})
            .catch(err => {
                updateUrl(url, params)
            })
    })
}

module.exports = processBody