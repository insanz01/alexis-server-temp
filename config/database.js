import mysql from 'mysql';
// const mysql = require('mysql');

// DB Configuration
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port     : 3306,
  password : '',
  database : 'new_alexis'
});

// DB Connection
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected ...')
});

// module.exports = db;
export default db;
