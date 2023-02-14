const mysql = require("mysql2/promise");

async function query(sql, params) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bike_renting",
  });

  const [results] = await connection.execute(sql, params);

  return results;
}

exports.query = query;
