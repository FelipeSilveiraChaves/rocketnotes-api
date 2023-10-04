const sqliteConnection = require('../../sqlite')


const createUsers = require('./createUsers')

async function migrationsRun(){
    const schemmas = [
        createUsers,

    ].join('');

    sqliteConnection()
        .then(db => db.exec(schemmas)
        .catch(error => console.log(error)))
}

module.exports = migrationsRun