const cheerio = require('cheerio')
const { rootUrl } = require('../config')
const { requestPromiseGenerator } = require('./request.helper')
const seenUrls = {}

function processBody(body, queue) {
    const loadedData = cheerio.load(body)
    loadedData(`a[href^="${rootUrl}"]`).each((index, element) => {
        const url = element.attribs.href.split('?')[0]
        if (!seenUrls[url]) {
            seenUrls[url] = true
            console.log(decodeURIComponent(element.attribs.href))
            queue.add(requestPromiseGenerator(url))
        }
    }) 
}

module.exports = processBody