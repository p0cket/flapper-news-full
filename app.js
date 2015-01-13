var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');

// Conect to MongoDB
// mongoose.connect('mongodb://localhost/news');


// instead we'll connect on Heroku
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://heroku_app33194409:eibdiesk3umc0vmvl5ubs2bjb8@ds031591.mongolab.com:31591/heroku_app33194409';

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, options, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});
//


require('./models/Post');
require('./models/Comment');

var routes  = require('./routes/index');
var users   = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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

// FB Login
app.run(['$rootScope', '$window', 'srvAuth',
function($rootScope, $window, sAuth) {

  $rootScope.user = {};

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({

      /*
      The app id of the web app;
      To register a new app visit Facebook App Dashboard
      ( https://developers.facebook.com/apps/ )
      */

      appId: '1552332168355966',

      /*
      Adding a Channel File improves the performance
      of the javascript SDK, by addressing issues
      with cross-domain communication in certain browsers.
      */

      channelUrl: 'app/channel.html',

      /*
      Set if you want to check the authentication status
      at the start up of the app
      */

      status: true,

      /*
      Enable cookies to allow the server to access
      the session
      */

      cookie: true,

      /* Parse XFBML */

      xfbml: true
    });

    sAuth.watchAuthenticationStatusChange();

  };

  // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

  (function(d){
    // load the Facebook javascript SDK

    var js,
    id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);

  }(document));

}]);
//


module.exports = app;
