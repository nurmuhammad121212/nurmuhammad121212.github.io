const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const addRouter = require('./routes/add');
const RegisterRouter = require('./routes/auth')

const app = express();


require('./helper/db')()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next()
})


app.use(session({
  secret: "SecretKey",
  resave: true,
  saveUninitialized: false
}))


require('./middleware/passport')(passport)


app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null
  next()
})

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
  "hbs",
  hbs({
    layoutsDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "main",
    extname: "hbs",
    partialsDir: [path.join(__dirname, "views/partials")],
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', addRouter)
app.use(RegisterRouter)
// catch 404 and forward to error handler


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;