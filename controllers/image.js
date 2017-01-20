/**
 * Created by thiagoretondar on 19/01/17.
 */
module.exports = {
    index: function (req, res) {
        res.render('image');
    },
    create: function (req, res) {
        res.send('The image:create POST controller');
    },
    like: function (req, res) {
        res.send('The image:like POST controller');
    },
    comment: function (req, res) {
        res.send('The image:comment POST controller')
    }
};