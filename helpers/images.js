/**
 * Created by thiagoretondar on 19/01/17.
 */
var Image = require('../models').Image;

module.exports = {
    popular: function(callback) {
        Image.find({}, {}, { limit: 9, sort: { likes: -1 }},
            function(err, images) {
                if (err) throw err;

                callback(null, images);
            }
        );
    }
};