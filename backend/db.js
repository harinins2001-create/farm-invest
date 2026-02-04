const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Harini01@",
    database: "farminvest"
});

module.exports = pool;