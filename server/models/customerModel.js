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

const getCustomerById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM customers
        WHERE id = ?
        AND status = 'active'
        LIMIT 1
        `,
        [id]
    );

    return rows[0];

};

module.exports = {
    getAllCustomers,
    getCustomerById
};