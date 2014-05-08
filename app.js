var coffeeScript = require('coffee-script/register');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var handlebars = require('express3-handlebars');

var routes = require('./routes');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http');
var assert = require('chai').assert;


// Setting up server
app.set('port', process.env.PORT || 3000); // method 1

// method 2:
// var server = http.createServer(app); 
// server.listen(process.env.PORT || 3000);
// if (app.get('env') === 'development') {
//       console.log("Now listening on port 3000");
// }


// view engine setup
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
// app.get('/users', users);
app.get('/simplecam', index.simplecam);
app.get('/picture', index.picture);
app.get('/personalmsg', index.personalmsg);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

// continuation of setting up server method 1
http.createServer(app).listen(app.get('port'), function(){
   console.log('Express server listening on port ' + app.get('port'));
});
