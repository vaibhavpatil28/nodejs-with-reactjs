const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const rfs = require('rotating-file-stream');
const fs = require('fs');


const createSqlConnection = require('./src/api/create-sql-connection');
const fileHandlerRoute = require('./src/api/file-handle/route/file-handle');
// const firebaseRoute = require('./src/api/firebase/route/firebase.router');

var logDirectory = path.join(__dirname, 'log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

const app = express();
app.use(cors({
    origin: 'http://localhost'
}));

// React view engine
app.set('views', __dirname + '/src/views');
app.set('view engine', 'jsx');
const options = { beautify: true };
app.engine('jsx', require('express-react-views').createEngine(options));

app.use(logger('dev', { stream: accessLogStream }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// connect to database server
const sql = createSqlConnection();

/* ------------ View Routes ----------- */
app.get('/', require('./src/views/routes').index);

/* ------------ Static Assets ----------- */
app.use(express.static(path.join(__dirname, 'public')));

/* ------------ API Routes ----------- */
app.use('/api/file', fileHandlerRoute);
// app.use('/api/firebase', firebaseRoute);

app.get('/api/sql', (req, res) => {
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
module.exports = app;