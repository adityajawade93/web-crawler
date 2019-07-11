const { connect, connection } = require('mongoose')
const { db_url, db_port, db_name } = require('../config')

function connect_db() {
    const connectionUrl = `${db_url}:${db_port}/${db_name}`
    return connect(connectionUrl, { useNewUrlParser: true })
}

function close_db() {
    connection.close()
}

module.exports = {
    connect_db,
    close_db
}