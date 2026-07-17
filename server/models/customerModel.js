const db = require("../config/db");

const getAllCustomers = async () => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM customers
        WHERE status = 'active'
        ORDER BY name ASC
        `
    );

    return rows;

};

module.exports = {
    getAllCustomers
};