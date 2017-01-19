/**
 * Created by thiagoretondar on 19/01/17.
 */
var express = require('express'),
    app = express();

// get from env or user 3300 as default
app.set('port', process.env.PORT || 3300);

// setting where the views is going to live
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(app.get('port'), function () {
   console.log('Server up: http://localhost:' + app.get('port'));
});