"use strict";

const pool = require("../config/pool");

class LottoStorage {
  static async init(noInfoArr = [], winInfoArr = []) {
    let conn, noRows, winRows;
    
    try {
      conn = await pool.getConnection();

      await conn.beginTransaction();

      await conn.batch("TRUNCATE TABLE tb_win_no", []);
      await conn.batch("TRUNCATE TABLE tb_win_info", []);

      const noSql = `INSERT INTO tb_win_no(
        drw_no,
        drwt_no1,
        drwt_no2,
        drwt_no3,
        drwt_no4,
        drwt_no5,
        drwt_no6,
        bnus_no,
        drw_no_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const winSql = `INSERT INTO tb_win_info(
        drw_no,
        first_accumamnt,
        first_przwner_co,
        first_winamnt,
        tot_sellamnt,
        drw_no_date
      ) VALUES (?, ?, ?, ?, ?, ?)`;

      noRows = await conn.batch(noSql, noInfoArr);
      winRows = await conn.batch(winSql, winInfoArr);

      await conn.commit();
    } catch (err) {
      console.error(err);
      await conn.rollback();
    } finally {
      if (conn) conn.release();
    }    

    if ((noRows?.affectedRows > 0) && (winRows?.affectedRows > 0)) {
      return {
        successcode: 1,
        insertNoRows: noRows?.affectedRows,
        insertWinRows: winRows?.affectedRows
      };
    }
    return {
      successcode: -1,
      insertNoRows: noRows?.affectedRows,
      insertWinRows: winRows?.affectedRows
    };
  }

  static async initNo(noInfoArr = []) {
    let conn, rows;

    try {
      conn = await pool.getConnection();

      await conn.beginTransaction();

      await conn.batch("TRUNCATE TABLE tb_win_no", []);

      const sql = `INSERT INTO tb_win_no(
        drw_no,
        drwt_no1,
        drwt_no2,
        drwt_no3,
        drwt_no4,
        drwt_no5,
        drwt_no6,
        bnus_no,
        drw_no_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      rows = await conn.batch(sql, noInfoArr);

      await conn.commit();
    } catch (err) {
      console.error(err);
      await conn.rollback();
    } finally {
      if (conn) conn.release();
    }
    if (rows?.affectedRows > 0) return { successcode: 1, insertRows: rows?.affectedRows };
    return { successcode: -1, insertRows: rows?.affectedRows };
  }

  static async initWin(winInfoArr = []) {
    let conn, rows;

    try {
      conn = await pool.getConnection();

      await conn.beginTransaction();

      await conn.batch("TRUNCATE TABLE tb_win_info", []);

      const sql = `INSERT INTO tb_win_info(
        drw_no,
        first_accumamnt,
        first_przwner_co,
        first_winamnt,
        tot_sellamnt,
        drw_no_date
      ) VALUES (?, ?, ?, ?, ?, ?)`;

      rows = await conn.batch(sql, winInfoArr);

      await conn.commit();
    } catch (err) {
      console.error(err);
      await conn.rollback();
    } finally {
      if (conn) conn.release();
    }
    if (rows?.affectedRows > 0) return { successcode: 1, insertRows: rows?.affectedRows };
    return { successcode: -1, insertRows: rows?.affectedRows };
  }
}

module.exports = LottoStorage;
