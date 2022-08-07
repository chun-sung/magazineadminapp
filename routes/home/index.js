'use strict'
var express = require('express');
var router = express.Router();

const ctrl = require('./home.ctrl')

router.get('/', ctrl.home);

module.exports = router;