const { connect_db } = require('./src/helpers/db.helper')
 
connect_db()
    .then(() => {
        console.log('successfully connected to database')
    })
    .catch(() => {
        console.log('error in connecting to db, please check db availability')
        process.exit(1)
    })