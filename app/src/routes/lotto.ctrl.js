"use strict";

const Lotto = require("../models/Lotto");

const api = {
  init: async (req, res) => {
    const lotto = new Lotto();
    const result = await lotto.init();
    res.json(result);
  },
  getLastNo: async (req, res) => {
    const lotto = new Lotto();
    const result = await lotto.getLastNo();
    res.json(result);
  },
  updateLastestNo: async (req, res) => {
    const lotto = new Lotto();
    const result = await lotto.updateLastestNo();
    res.json(result);
  },
  updateLastestWin: async (req, res) => {
    const lotto = new Lotto();
    const result = await lotto.updateLastestWin();
    res.json(result);
  }
}

module.exports = {
  api
};