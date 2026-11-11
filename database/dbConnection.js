const mysql = require("mysql2/promise");
const dbConfig = require("./dbConfig");

async function getConnection() {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
}

module.exports = { getConnection };