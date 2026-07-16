const db = require("../config/db");

const getAllSuppliers = async () => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM suppliers
        WHERE status = 'active'
        ORDER BY supplier_name ASC
        `
    );

    return rows;
};

const getSupplierById = async (id) => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM suppliers
        WHERE id = ?
        AND status = 'active'
        `,
        [id]
    );

    return rows[0];
};

module.exports = {
    getAllSuppliers,
    getSupplierById
};