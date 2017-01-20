/**
 * Created by thiagoretondar on 19/01/17.
 */
var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar');

module.exports = {
    index: function (req, res) {

        let viewModel = {
            image: {
                uniqueId:       1,
                title:          'Sample Image 1',
                description:    'This is a sample.',
                filename:       'sample1.jpg',
                views:          0,
                likes:          0,
                timestamp:      Date.now
            },
            comments: [
                {
                    image_id:   1,
                    email:      'test@testing.com',
                    name:       'Test Tester',
                    gravatar:   'http://www.gravatar.com/avatar/9a99fac7b524fa443560ec7b5ece5ca1?d=monsterid&s=45',
                    comment:    'This is a test comment...',
                    timestamp:  Date.now()
                },{
                    image_id:   1,
                    email:      'test@testing.com',
                    name:       'Test Tester',
                    gravatar:   'http://www.gravatar.com/avatar/9a99fac7b524fa443560ec7b5ece5ca1?d=monsterid&s=45',
                    comment:    'Another followup comment!',
                    timestamp:  Date.now()
                }
            ]
        };

        sidebar(viewModel, function (viewModel) {
            res.render('image', viewModel);
        })
    },
    create: function (req, res) {
        let saveImage = function () {
            let possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';

            for(let i = 0; i < 6; i+=1) {
                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            let tempPath = req.file.path,
                ext = path.extname(req.file.originalname).split('.')[1].toLowerCase(),
                targetPath = path.resolve('./public/upload/' + imgUrl + ext);

            if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext ===  'gif') {
                fs.rename(tempPath, targetPath, function(err) {
                    if (err) {
                        console.log(err);
                        throw err
                    };

                    res.redirect('/images/'+ imgUrl);
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