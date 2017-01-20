/**
 * Created by thiagoretondar on 19/01/17.
 */
var Stats = require('./stats'),
    Images = require('./images'),
    Comments = require('./comments');

module.exports = function (viewmodel, callback) {
    viewmodel.sidebar = {
        stats: Stats(),
        popular: Images.popular(),
        comments: Comments.newest()
    };

    callback(viewmodel);
}