const { connect, connection } = require('mongoose')
const { db_url, db_port, db_name } = require('../config')
const urls = require('../models/url')

function connect_db() {
    const connectionUrl = `${db_url}:${db_port}/${db_name}`
    return connect(connectionUrl, { useNewUrlParser: true })
}

function close_db() {
    connection.close()
}

/**
 * 
 * @param {*} url link to be saved in url object
 * @param {*} params link params to be saved
 * 
 * this is a wrapper for mongoose create just to streamline the code
 */

function addUrl(url, params) {
    return urls.create({
        link: url,
        referenceCount: 1,
        queryParameters: params
    })
}

/**
 * 
 * @param {*} link link to fetch the required url to update
 * @param {*} params params to be updated
 * 
 * this function fetches an existing url to increase its reference count and update its params
 */

function updateUrl(link, params) {
    urls.findOne({ link: link }, function (err, url) {
        if (err) {
            console.log(`cannot find url ${link} to update`)
            return
        }
        let newParams = url.queryParameters.concat(params)
        let queryParameters = [...new Set(newParams)]
        let referenceCount = url.referenceCount + 1
        urls.update({ link: link }, { queryParameters, referenceCount }, (err, updatedUrl) => {
            if(err) {
                console.log(`failed to update url ${link}`)
                return
            }
        })
    })
}

module.exports = {
    connect_db,
    close_db,
    addUrl,
    updateUrl
}