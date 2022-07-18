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
      const lottoApiUrl = getLottoApiUrl(String(no));
      const res = await axios.get(lottoApiUrl);
      const info = res.data;
      const returnValue = info.returnValue

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

        no++;
      }

      if (returnValue === "fail") loop = false;
      if ((returnValue !== "success") && (returnValue !== "fail")) {
        console.error('예상 밖의 결과값을 받았습니다.', returnValue);
        loop = false;
      }
    }

    if (noInfoArr.length > 0) {
      const result = await LottoStorage.init(noInfoArr, winInfoArr);
      return result;
    }
    return { successcode: -1 };    
  }

  async initNo() {
    let no = 1;
    let loop = true;
    const noInfoArr = [];

    while (loop) {
      const lottoApiUrl = getLottoApiUrl(String(no));
      const res = await axios.get(lottoApiUrl);
      const info = res.data;
      const returnValue = info.returnValue

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
        
        noInfoArr.push(noInfo);

        no++;
      }

      if (returnValue === "fail") loop = false;
      if ((returnValue !== "success") && (returnValue !== "fail")) {
        console.error('예상 밖의 결과값을 받았습니다.', returnValue);
        loop = false;
      }
    }

    if (noInfoArr.length > 0) {
      const result = await LottoStorage.initNo(noInfoArr);
      return result;
    }
    return { successcode: -1 };
  }

  async initWin() {
    let no = 1;
    let loop = true;
    const winInfoArr = [];

    while (loop) {
      const lottoApiUrl = getLottoApiUrl(String(no));
      const res = await axios.get(lottoApiUrl);
      const info = res.data;
      const returnValue = info.returnValue

      if (returnValue === "success") {
        const winInfo = [
          info.drwNo,
          info.firstAccumamnt,
          info.firstPrzwnerCo,
          info.firstWinamnt,
          info.totSellamnt,
          info.drwNoDate
        ];

        winInfoArr.push(winInfo);

        no++;
      }

      if (returnValue === "fail") loop = false;
      if ((returnValue !== "success") && (returnValue !== "fail")) {
        console.error('예상 밖의 결과값을 받았습니다.', returnValue);
        loop = false;
      }
    }

    if (winInfoArr.length > 0) {
      const result = await LottoStorage.initWin(winInfoArr);
      return result;
    }
    return { successcode: -1 };
  }
}

module.exports = Lotto;
