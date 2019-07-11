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

function addUrl(url, params) {
    return urls.create({
        link: url,
        referenceCount: 1,
        queryParameters: params
    })
}

function updateUrl(link, params) {
    urls.findOne({ link: link }, function (err, url) {
        if (err) {
            console.log(`cannot find url ${link} to update`)
            return
        }
        let newParams = url.queryParameters.concat(params)
        url.queryParameters = [...new Set(newParams)]
        url.referenceCount = url.referenceCount + 1
        url.save((err, url) => {
            if (err) {
                console.log(`failed to update url ${link}`)
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