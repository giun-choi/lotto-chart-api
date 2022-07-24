"use strict";

const pool = require("../config/pool");

class LottoStorage {
  static async init(noInfoArr = [], winInfoArr = []) {
    let conn, noRow, winRow;
    
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

      noRow = await conn.batch(noSql, noInfoArr);
      winRow = await conn.batch(winSql, winInfoArr);

      await conn.commit();
    } catch (err) {
      console.error(err);
      await conn.rollback();
    } finally {
      if (conn) conn.release();
    }    

    const insertRow = {
      insertNoRow: noRow?.affectedRows,
      insertWinRow: winRow?.affectedRows
    };

    if ((noRow?.affectedRows === noInfoArr.length) && (winRow?.affectedRows === winInfoArr.length)) {
      return { successcode: 1, ...insertRow };
    }
    return { successcode: -1, ...insertRow };
  }

  static async getLastInfo() {
    let conn, row;

    try {
      conn = await pool.getConnection();

      const sql = `SELECT 
        (SELECT drw_no FROM tb_win_no ORDER BY drw_no DESC LIMIT 1) AS no,
        (SELECT drw_no FROM tb_win_info ORDER BY drw_no DESC LIMIT 1) AS win`;

      row = await conn.batch(sql, []);
    } catch (err) {
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
    const { no = 0, win = 0 } = row[0];
    return { lottoNo: no, lottoWin: win };
  }

  static async updateLastestNo(lastestNoArr = []) {
    let conn, row;

    try {
      conn = await pool.getConnection();

      await conn.beginTransaction();

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

      row = await conn.batch(sql, lastestNoArr);

      await conn.commit();
    } catch (err) {
      console.error(err);
      await conn.rollback();
    } finally {
      if (conn) conn.release();
    }
    return { successcode: 1, insertRow: row?.affectedRows };
  }

  static async updateLastestWin(lastestWinArr = []) {
    let conn, row;

    try {
      conn = await pool.getConnection();

      await conn.beginTransaction();

      const sql = `INSERT INTO tb_win_info(
        drw_no,
        first_accumamnt,
        first_przwner_co,
        first_winamnt,
        tot_sellamnt,
        drw_no_date
      ) VALUES (?, ?, ?, ?, ?, ?)`;

      row = await conn.batch(sql, lastestWinArr);

      await conn.commit();
    } catch (err) {
      console.error(err);
      await conn.rollback();
    } finally {
      if (conn) conn.release();
    }
    return { successcode: 1, insertRow: row?.affectedRows };
  }

  static async getMonthInfo(year, month) {
    let conn, rows;
    const like = `%${year}-${month}%`;

    try {
      conn = await pool.getConnection();

      const sql = `SELECT 
        drw_no,
        drwt_no1,
        drwt_no2, 
        drwt_no3, 
        drwt_no4, 
        drwt_no5, 
        drwt_no6, 
        bnus_no, 
        DATE_FORMAT(drw_no_date, '%Y-%m-%d') AS drw_no_date
      FROM tb_win_no WHERE drw_no_date LIKE ? 
      ORDER BY drw_no DESC`;

      rows = await conn.query(sql, [like]);
    } catch (err) {
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
    if (rows) {
      return { successcode: 1, rows };
    }
    return { successcode: -1 };
  }

  static async getYearInfo(year) {
    let conn, rows;
    const like = `%${year}%`;

    try {
      conn = await pool.getConnection();

      const sql = `SELECT 
        drw_no, 
        drwt_no1, 
        drwt_no2, 
        drwt_no3, 
        drwt_no4, 
        drwt_no5, 
        drwt_no6, 
        bnus_no, 
        DATE_FORMAT(drw_no_date, '%Y-%m-%d') AS drw_no_date 
      FROM tb_win_no WHERE drw_no_date LIKE ? 
      ORDER BY drw_no DESC`;

      rows = await conn.query(sql, like);
    } catch (err) {
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
    if (rows) {
      return { successcode: 1, rows };
    }
    return { successcode: -1 };
  }
}

module.exports = LottoStorage;
