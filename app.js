var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.config();
var mongoose = require('mongoose');
var cors = require('cors');



var app = express();
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true});
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var bookingRouter = require('./routes/booking');

app.use('/', indexRouter);
app.use('/booking', bookingRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

    // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;