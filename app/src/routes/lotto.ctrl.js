"use strict";

const Lotto = require("../models/Lotto");

const api = {
  init: async (req, res) => {
    const lotto = new Lotto();
    const result = await lotto.init();
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
  },
  getMonthInfo: async (req, res) => {
    const query = req.query;
    const lotto =  new Lotto(query);
    const result = await lotto.getMonthInfo();
    res.json(result);
  },
  getYearInfo: async (req, res) => {
    const query = req.query;
    const lotto =  new Lotto(query);
    const result = await lotto.getYearInfo();
    res.json(result);    
  }
}

module.exports = {
  api
};