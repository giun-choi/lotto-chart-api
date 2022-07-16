"use strict";

function getLottoApiUrl(no) {
  return "https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=" + no;
}

module.exports = getLottoApiUrl;