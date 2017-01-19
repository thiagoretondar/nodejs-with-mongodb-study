/**
 * Created by thiagoretondar on 19/01/17.
 */
var express = require('express'),
    router = express.Router();

var home = require('../controllers/home'),
    image = require('../controllers/image');

module.exports = function (app) {

    // HOME
    router.get('/', home.index);

    // IMAGES
    router.get('/images/:image_id', image.index);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);

    app.use(router);
}