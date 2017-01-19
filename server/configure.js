/**
 * Created by thiagoretondar on 19/01/17.
 */
var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride =  require('method-override'),
    errorHandler = require('errorhandler');

module.exports = function (app) {
    app.use(morgan('dev'));
    app.use(bodyParser({
        uploadDir:path.join(__dirname, 'public/upload/temp')
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));

    // moving the routes to routes folder
    routes(app);

    // it is important static middleware is defined after router
    app.use('/public/', express.static(path.join(__dirname, '../public')));

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    return app;
}