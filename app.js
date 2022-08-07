"use strict";
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const sequelize = require("./models/index.js").sequelize;
var app = express();

// 컨트롤러
const home = require("./routes/home");
const board = require("./routes/board");
const api = require("./routes/api");

// 마스터 레이아웃
app.use(expressLayouts);

// 시퀄라이즈 ORM 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("ORM 준비 완료");
  })
  .catch((err) => {
    console.log(err);
  });

// view engine setup
app.set("layout", "layout");
app.set("layout extractScripts", true);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 미들웨어
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 라우터 미들웨어
app.use("/", home);
app.use("/boards", board);
app.use("/api/articles", api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
