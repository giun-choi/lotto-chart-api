"use strict";

const Lotto = require("../models/Lotto");

const api = {
  init: async (req, res) => {
    const lotto = new Lotto();
    const result = await lotto.init();
    res.json(result);
  },
  initNo: async (req, res) => {
    const lotto = new Lotto();
    const result = await lotto.initNo();
    res.json(result);
  },
  initWin: async (req, res) => {
    const lotto = new Lotto();
    const result = await lotto.initWin();
    res.json(result);
  }
}

module.exports = {
  api
};