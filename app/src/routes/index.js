"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./lotto.ctrl");

// 라우터 설정
router.put("/init", ctrl.api.init);
router.patch("/lastest-no", ctrl.api.updateLastestNo);
router.patch("/lastest-win", ctrl.api.updateLastestWin);
router.get("/month-info", ctrl.api.getMonthInfo);
router.get("/year-info", ctrl.api.getYearInfo);

module.exports = router;