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
    errorHandler = require('errorhandler'),
    moment = require('moment'),
    multer = require('multer');

module.exports = function (app) {
    app.use(morgan('dev'));

    app.use(multer({ dest: path.join(__dirname, 'public/upload/temp')}).single('file'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));

    // moving the routes to routes folder
    routes(app);

    // it is important static middleware is defined after router
    app.use('/public/', express.static(path.join(__dirname, '../public')));

    // configuration of handlebars
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers : {
            timeago: function (timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);

    app.set('view engine', 'handlebars');

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    return app;
}