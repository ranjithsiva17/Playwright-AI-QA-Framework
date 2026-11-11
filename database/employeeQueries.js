const { getConnection } = require("./dbConnection");

async function getEmployeeById(id) {

    const connection = await getConnection();

    const [rows] = await connection.execute(
        "SELECT * FROM employees WHERE empNumber = ?",
        [id]
    );

    await connection.end();

    return rows;
}

module.exports = {
    getEmployeeById
};