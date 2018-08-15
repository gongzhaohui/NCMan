'use strict';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./server/schema');
const apiRouter = require('./server/routes/user');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/ncman')));
app.use('/', express.static(path.join(__dirname, 'dist/ncman')));
app.use('/api', apiRouter);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true // set to false if you don't want graphiql enabled
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