require('dotenv').config();
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var express = require('express');
var indexRouter = require('./routes/index.js');
var PORT = process.env.PORT || 5000;
var logger = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require("path");
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

const buildpath = path.resolve(__dirname, "../client/build");
app.use(express.static(buildpath));

app.use("/admin", express.static(path.join(__dirname, "public")));

app.use('/admin', indexRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;