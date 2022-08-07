"use strict";
const home = function (req, res, next) {
  res.render("./home/index", { title: "Express" });
};

const showe = {}
const process = {}

module.exports = {
  home,
};
