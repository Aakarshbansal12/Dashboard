require('dotenv').config();
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var express = require('express');
var indexRouter = require('./routes/index.js');
var PORT = process.env.PORT;
var logger = require('morgan');
const fileUpload = require('express-fileupload');
var app = express();
const cors = require('cors');
const path = require("path");


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use("/admin", express.static(path.join(__dirname, "public/")));



app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/admin', indexRouter);
app.listen(PORT, (req, res) => {
  console.log(`Listenin gon port ${PORT}`)
})

module.exports = app;



