"use strict";
var express = require("express");
var router = express.Router();

const ctrl = require("./board.ctrl");


// GET board page.
router.get("/", ctrl.show.boards);

// 게시글 목록 페이지
router.get("/list", ctrl.show.list);

// 게시글 작성 페이지
router.get("/create", ctrl.show.create);

// 게시글 수정 페이지
router.get("/modify?:id", ctrl.show.modify);

// 게시글 작성 POST 페이지
router.post("/create", ctrl.process.create);

// 게시글 수정 POST 페이지
router.post("/update", ctrl.process.update);

// 게시글 삭제 페이지
router.get("/delete", ctrl.process.delete);

module.exports = router;
