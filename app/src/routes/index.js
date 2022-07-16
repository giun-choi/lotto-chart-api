"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./lotto.ctrl");

// 라우터 설정
router.get("/init", ctrl.api.init);
router.get("/init/no", ctrl.api.initNo);
router.get("/init/win", ctrl.api.initWin);

module.exports = router;