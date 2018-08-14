'use strict';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var graphqlHTTP = require('express-graphql');

const schema = require('./server/schema');
var apiRouter = require('./server/routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/ncman')));
app.use('/', express.static(path.join(__dirname, 'dist/ncman')));
app.use('/api', apiRouter);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true //set to false if you don't want graphiql enabled
}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.status);
});

module.exports = app;