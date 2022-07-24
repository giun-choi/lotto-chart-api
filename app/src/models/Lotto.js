"use strict";

const axios = require("axios").default;
const LottoStorage = require("./LottoStorage");
const getLottoApiUrl = require("../common/lottoApi");

class Lotto {
  constructor(body) {
    this.body = body;
  }

  async init() {
    let no = 1;
    let loop = true;
    const noInfoArr = [];
    const winInfoArr = [];

    while (loop) {
      const lottoApiUrl = getLottoApiUrl(String(no++));
      const res = await axios.get(lottoApiUrl);
      const info = res?.data;
      const returnValue = info?.returnValue

      if (returnValue === "success") {
        const noInfo = [
          info.drwNo,
          info.drwtNo1,
          info.drwtNo2,
          info.drwtNo3,
          info.drwtNo4,
          info.drwtNo5,
          info.drwtNo6,
          info.bnusNo,
          info.drwNoDate
        ];
        const winInfo = [
          info.drwNo,
          info.firstAccumamnt,
          info.firstPrzwnerCo,
          info.firstWinamnt,
          info.totSellamnt,
          info.drwNoDate
        ];

        noInfoArr.push(noInfo);
        winInfoArr.push(winInfo);
      }

      if (returnValue === "fail") loop = false;
      if ((returnValue !== "success") && (returnValue !== "fail")) {
        console.error('The response format is different.\n', returnValue);
        loop = false;
      }
    }

    if (noInfoArr.length > 0) {
      const result = await LottoStorage.init(noInfoArr, winInfoArr);
      return result;
    }
    return { successcode: -1 };    
  }

  async updateLastestNo() {
    let loop = true;
    let { lottoNo = 0 } = await LottoStorage.getLastInfo();
    const lastestNoArr = [];

    while (loop) {
      const lottoApiUrl = getLottoApiUrl(String(++lottoNo));
      const res = await axios.get(lottoApiUrl);
      const info = res?.data;
      const returnValue = info?.returnValue;

      if (returnValue === "success") {
        const lastestNoInfo = [
          info.drwNo,
          info.drwtNo1,
          info.drwtNo2,
          info.drwtNo3,
          info.drwtNo4,
          info.drwtNo5,
          info.drwtNo6,
          info.bnusNo,
          info.drwNoDate
        ];

        lastestNoArr.push(lastestNoInfo);      
      }

      if (returnValue === "fail") loop = false;
      if ((returnValue !== "success") && (returnValue !== "fail")) {
        console.error('The response format is different.\n', returnValue);
        loop = false;
      }
    }

    if (lastestNoArr.length === 0) return { successcode: 1, msg: "You already have the latest data." };
    const result = await LottoStorage.updateLastestNo(lastestNoArr);
    return result;
  }

  async updateLastestWin() {
    let loop = true;
    let { lottoWin = 0 } = await LottoStorage.getLastInfo();
    const lastestWinArr = [];

    while (loop) {
      const lottoApiUrl = getLottoApiUrl(String(++lottoWin));
      const res = await axios.get(lottoApiUrl);
      const info = res?.data;
      const returnValue = info?.returnValue;

      if (returnValue === "success") {
        const lastestWinInfo = [
          info.drwNo,
          info.firstAccumamnt,
          info.firstPrzwnerCo,
          info.firstWinamnt,
          info.totSellamnt,
          info.drwNoDate
        ];

        lastestWinArr.push(lastestWinInfo);      
      }

      if (returnValue === "fail") loop = false;
      if ((returnValue !== "success") && (returnValue !== "fail")) {
        console.error('The response format is different.\n', returnValue);
        loop = false;
      }
    }

    if (lastestWinArr.length === 0) return { successcode: 1, msg: "You already have the latest data." };
    const result = await LottoStorage.updateLastestWin(lastestWinArr);
    return result;
  }

  async getMonthInfo() {
    const { year = '', month = '' } = this.body;
    const result = await LottoStorage.getMonthInfo(year, month);
    return result;
  }

  async getYearInfo() {
    const { year = '' } = this.body;
    const result = await LottoStorage.getYearInfo(year);
    return result;
  }
}

module.exports = Lotto;
