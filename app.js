var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require("cors")

var adminRouter=require("./routes/user/adminRouter")
var userRouter=require("./routes/user/usersRoutes")
var apiRoutes=require("./routes/apiRoutes")
 
var app = express();
const db = require('./models');  // Correct path

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cors({
  origin:["http://localhost:5174","http://localhost:5173","http://192.168.0.198:5173"],
  credentials:true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/admin",adminRouter)
app.use("/api/user",userRouter)
app.use("/api",apiRoutes)
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
