/**
 * Created by thiagoretondar on 19/01/17.
 */
var express = require('express'),
    config = require('./server/configure'),
    app = express();

// get from env or user 3300 as default
app.set('port', process.env.PORT || 3300);

// setting where the views is going to live
app.set('views', __dirname + '/views');

app = config(app);

app.listen(app.get('port'), function () {
   console.log('Server up: http://localhost:' + app.get('port'));
});