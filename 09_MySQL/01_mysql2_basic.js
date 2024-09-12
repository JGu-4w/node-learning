const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'test_demo',
});

// const statement = 'SELECT * FROM `brands`;';
// connection.query(statement, (err, values, fields) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(values);
// });

// 预处理语句，防止SQL注入
const statementPre = 'SELECT * FROM `products` WHERE price > ? AND score > ?;';
// 预处理语句使用 .execute 执行
connection.execute(statementPre, [8000, 9], (err, values, fields) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(values);
});

connection.end();
