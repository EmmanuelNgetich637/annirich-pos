const db = require("../config/db");

const getAllSuppliers = async () => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM suppliers
        WHERE status='active'
        ORDER BY name ASC
        `
    );

    return rows;

};

module.exports = {
    getAllSuppliers
};