/**
 * Created by thiagoretondar on 19/01/17.
 */
var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar'),
    Models = require('../models');

const HOME_PATH = '/';

module.exports = {
    index: function (req, res) {

        let viewModel = {
            image: {},
            comments: []
        };

        Models.Image.findOne({filename: {$regex: req.params.image_id}}, function(err, image) {
            if (err) {
                console.log(err);
                throw err;
            }

            if (image) {
                image.views = image.views + 1;
                viewModel.image = image;

                // save with the new views
                image.save();

                Models.Comment.find({image_id: image._id}, {}, {sort: {'timestamp': -1}}, function(err, comments) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }

                    viewModel.comments = comments;

                    sidebar(viewModel, function (viewModel) {
                        res.render('image', viewModel);
                    });
                });
            } else {
                res.redirect(HOME_PATH);
            }
        });
    },
    create: function (req, res) {
        let saveImage = function () {
            // create hash of image
            let possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';

            for(let i = 0; i < 6; i+=1) {
                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            Models.Image.find({filename: imgUrl}, function(err, images) {
                if (images.length > 0) {
                    saveImage();
                } else {
                    let tempPath = req.file.path,
                        ext = path.extname(req.file.originalname).split('.')[1].toLowerCase(),
                        targetPath = path.resolve('./public/upload/' + imgUrl + ext);

                    if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext ===  'gif') {
                        fs.rename(tempPath, targetPath, function(err) {
                            if (err) {
                                console.log(err);
                                throw err
                            };

                            var newImg = new Models.Image({
                                title: req.body.title,
                                description: req.body.description,
                                filename: imgUrl + ext
                            });

                            newImg.save(function(err, image) {
                                if (err) {
                                    console.log(err);
                                }

                                console.log('Sucessfully inserted image: ' + image.filename);
                                res.redirect('/images/' + image.uniqueId);
                            });
                        });
                    } else {
                        fs.unlink(tempPath, function (err) {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                            res.json(500, {error: 'Only image files are allowed.'});
                        });
                    }
                }
            });
        };

        saveImage();
    },
    like: function (req, res) {
        res.json({likes: 1});
    },
    comment: function (req, res) {
        res.send('The image:comment POST controller')
    }
};