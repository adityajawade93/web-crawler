const { connect_db, close_db } = require('./src/helpers/db.helper')
const Urls = require('./src/models/url')

const connection = connect_db()

connection
    .then(() => {
        console.log('successfully connected to database')
    })
    .catch(() => {
        console.log('error in connecting to db, please check db availability')
        process.exit(1)
    })