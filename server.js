const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

// ? ROUTES
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const workoutsRouter = require('./routes/workouts');
const likesRouter = require('./routes/likes');
const exercisesRouter = require('./routes/exercises');

const app = express();

// ? CONNECTING TO DATABASE AND REQUIRING THE DB FILE
require('dotenv').config();
require('./config/database');
// Requiring passport
require('./config/passport');

// ? ENGINE SETUP
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ? MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Adding method override
app.use(methodOverride('_method'));

// Configuring and mounting session middleware
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({ mongoUrl: process.env.SESSION_DATABASE_URL }),
  resave: false,
  saveUninitialized: true
}));

// Mounting passport
app.use(passport.initialize());
app.use(passport.session());

// Passing req.user to all views with res.locals & Middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// ? ROUTES
// Index
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Data Resource
app.use('/workouts', workoutsRouter);

// Data Resource: Workouts/likes
app.use('/', likesRouter);

// Data Resource: Exercises
app.use('/', exercisesRouter)

// ? 404 HANDLING
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// ! later build custom 404? (20:00)
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
