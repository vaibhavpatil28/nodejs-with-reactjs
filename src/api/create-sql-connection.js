var sql = require('mssql');

// config for your database
var config = {
    user: 'sa',
    // password: '@Angular8;',
    password:'vaibhav@123',
    server: 'localhost',
    database: 'TestData'
};

// connect to your database
function connectToSqlDB() {
    sql.connect(config, function (err) {

        if (err) console.log(err);

       
    });
    return sql
}

module.exports = connectToSqlDB;