const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const projectRoute = require('./src/api/project/route/create-project');

const app = express();
app.use(cors({
    origin: 'http://localhost'
}));

// React view engine
app.set('views', __dirname + '/src/views');
app.set('view engine', 'jsx');
const options = { beautify: true };
app.engine('jsx', require('express-react-views').createEngine(options));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* ------------ View Routes ----------- */
app.get('/', require('./src/views/routes').index);

/* ------------ Static Assets ----------- */
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;

/* ------------ API Routes ----------- */
app.use('/api/project', projectRoute);

app.get('/api/sql', (req, res) => {
    var sql = require('mssql');

    // config for your database
    var config = {
        user: 'sa',
        password: '@Angular8;',
        server: 'localhost',
        database: 'TestData'
    };

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query(`SELECT ProductID, ProductName, Price, ProductDescription  
        FROM dbo.Products`, function (err, recordset) {

                if (err) console.log(err)

                // send records as a response
                res.send(recordset);
                sql.close();
                recordset = null;
            });
    });
});