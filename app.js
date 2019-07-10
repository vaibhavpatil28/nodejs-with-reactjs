var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// React view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
const options = { beautify: true };
app.engine('jsx', require('express-react-views').createEngine(options));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* ------------ Routes ----------- */
app.get('/', require('./routes').index);

/* ------------ Static Assets ----------- */
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;
