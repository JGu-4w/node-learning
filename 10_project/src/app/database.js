const mysql = require('mysql2/promise');

const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'test_demo',
  connectionLimit: 5,
});

connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('Failed To Connection Database: ' + err);
    return;
  }
});

module.exports = connectionPool;
