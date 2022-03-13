import express from 'express';
const router = express.Router();

import connection from '../config/database.js';

router.use((req, res, next) => {
  const token = req.headers['x-token'];

  if (token === undefined) {
    return { message: "Token tidak boleh kosong.", status: 400 }
  }

  const query = `SELECT id, username, token FROM token = ${token}`;

  connection.query(query, (error, result, field) => {
    if (error || results[0] == null) {
      return { message: "Token tidak valid", status: 400 };
    }

    return { message: "Berhasil mengambil data", data: result[0], status: 200 };
  });

  next();
});

export default { router };
