"use strict";

// 모델
const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// 라우팅
const lotto = require("./src/routes");

// 앱 세팅
app.use(express.json());
// URL을 통해 전달되는 데이터에 한글, 공백 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.urlencoded({ extended: true }));

app.use("/api/lotto", lotto);

module.exports = app;