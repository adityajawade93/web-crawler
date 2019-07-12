const { connect_db } = require('./src/helpers/db.helper')

/**
 * connects to database and loads the start.js file in src, to start crawling
 */
connect_db()
    .then(() => {
        require('./src/start')
        console.log('successfully connected to database')
    })
    .catch(() => {
        console.log('error in connecting to db, please check db availability')
        process.exit(1)
    })