/**
 * Created by thiagoretondar on 19/01/17.
 */
var ImageModel = require('../models').Image
    sidebar = require('../helpers/sidebar');

module.exports = {
    index: function (req, res) {

        let viewModel = {
            images: []
        };

        ImageModel.find({}, {}, {sort: {timestamp: -1}}, function(err, images) {
            viewModel.images = images;

            sidebar(viewModel, function (viewModel) {
                res.render('index', viewModel);
            });
        });
    }
};