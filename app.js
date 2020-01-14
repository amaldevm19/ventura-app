var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');  


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var materialsRouter = require('./routes/materials');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000
    }
  })
);
app.use((req, res, next) => {
 //remove in production---this is for autologin
 /*req.session.user ={
    email: 'amaldevm19@gmail.com',
    password: '$2b$10$Wg.IQDDwnTUQGuNfAJ6nUuJxREt9KQE9Ktn7zPHI/APe1xK4YtNRC',
    __v: 0
  }
  req.session.login = true;
*/
//----------------------------------------
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/materials', materialsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  req.session.login ? res.render('error',{layout:'main.handlebars'}):res.render('error',{layout:'loginLayout.handlebars'});
});


module.exports = app;
