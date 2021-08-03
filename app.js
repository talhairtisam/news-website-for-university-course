var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session');
var userSession = require('./middlewares/userSession');
var adminSession = require('./middlewares/adminSession');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized:true,
  cookies: {maxAge: 60000}
}));
app.use(userSession);
app.use(adminSession);

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/cpanel', adminRouter);

mongoose.connect("mongodb+srv://talha_457:newsCUI@cuinews.braa2.mongodb.net/newsArticles?retryWrites=true&w=majority",
{ 
useUnifiedTopology: true,
useNewUrlParser: true,
useFindAndModify: false
})
.then(async ()=>console.log("connection established"))
.catch(err=>console.log(err))

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
  res.render('error');
});

module.exports = app;
