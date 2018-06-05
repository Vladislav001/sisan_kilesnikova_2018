var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var dbConfig = require('./db');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url);


var app = express();


app.engine('ejs', require('ejs-locals'));


app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());



var initPassport = require('./passport/init');
initPassport(passport);


var routes = require('./routes/index')(passport);
app.use(flash());
app.use('/', routes);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});





module.exports = app;
