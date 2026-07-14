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

const getCategoryByName = async (name) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM categories
        WHERE LOWER(name)=LOWER(?)
        LIMIT 1
        `,
        [name]
    );

    return rows[0];

};

const createCategory = async (category) => {

    const { name, description } = category;

    const [result] = await db.query(
        `
        INSERT INTO categories
        (name, description)
        VALUES (?, ?)
        `,
        [
            name,
            description || null
        ]
    );

    return result.insertId;

};

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    createCategory
};