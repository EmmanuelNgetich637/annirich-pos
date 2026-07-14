const db = require("../config/db");

const getAllCategories = async () => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM categories
        WHERE status='active'
        ORDER BY name ASC
        `
    );

    return rows;

};

const getCategoryById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM categories
        WHERE id = ?
        AND status = 'active'
        `,
        [id]
    );

    return rows[0];

};

module.exports = {
    getAllCategories,
    getCategoryById
};