/**
 * Created by thiagoretondar on 19/01/17.
 */
var models = require('../models'),
    async = require('async');

module.exports = {
    newest: function(callback) {
        models.Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 } },
            function(err, comments){
                var attachImage = function(comment, next) {
                    models.Image.findOne({ _id : comment.image_id},
                        function(err, image) {
                            if (err) {
                                 console.log(err);
                                throw err;
                            }

                            comment.image = image;
                            next(err);
                        });
                };

                async.each(comments, attachImage,
                    function(err) {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        callback(err, comments);
                    }
                );
            }
        );
    }
};