/**
 * Created by thiagoretondar on 19/01/17.
 */
var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image;

module.exports = {
    index: function (req, res) {

        let viewModel = {
            images: []
        };

        ImageModel.find({}, {}, {sort: {timestamp: -1}}, function(err, images) {
            viewModel.images = images;
            console.log(viewModel.images);

            sidebar(viewModel, function (viewModel) {
                res.render('index', viewModel);
            });
        });
    }
};