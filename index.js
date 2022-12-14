const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
  
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./components/user/products');
// const accountRouter = require('./components/user/accounts');
// const accountAdminRouter = require('./components/admin/accounts');
const dashboardRouter = require('./components/admin');
const authRouter = require('./components/authentication');
const customerRouter = require('./components/admin/customers');
const manageProductRouter = require('./components/admin/products');
const accountRouter = require('./components/user/accounts');



const passport = require('./components/authentication/passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret: 'very secret keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.authenticate('session'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 


app.use(function(req, res, next) {
  console.log("res.user");
  console.log(req.user);
  res.locals.user = req.user;
  next();
});


app.use('/index', indexRouter);
app.use('/users', usersRouter);
// app.use('/students', studentRouter);
app.use('/products', productRouter);
app.use('/auth', authRouter);
// app.use('/account_admin',accountAdminRouter);
app.use('/dashboard', dashboardRouter);
app.use('/customer', customerRouter);
app.use('/manageProduct',manageProductRouter)
app.use('/account',accountRouter);

//passport



// app.use(passport.initialize());



// catch 404 and forward to error handler
app.use(function(req,
                 res,
                 next) {
  next(createError(404));
});

// error handler
app.use(function(err,
                 req,
                 res,
                 next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
