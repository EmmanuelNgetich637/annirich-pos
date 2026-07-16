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

const getCategoryByNameExcludingId = async (name, id) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM categories
        WHERE LOWER(name) = LOWER(?)
        AND id != ?
        LIMIT 1
        `,
        [name, id]
    );

    return rows[0];

};

const updateCategory = async (id, category) => {

    const { name, description } = category;

    const [result] = await db.query(
        `
        UPDATE categories
        SET
            name = ?,
            description = ?
        WHERE id = ?
        `,
        [
            name,
            description || null,
            id
        ]
    );

    return result;

};

const deleteCategory = async (id) => {

    const [result] = await db.query(
        `
        UPDATE categories
        SET status='inactive'
        WHERE id=?
        `,
        [id]
    );

    return result;

};

const searchCategories = async (searchTerm) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM categories
        WHERE
            status='active'
        AND
        (
            name LIKE ?
            OR description LIKE ?
        )
        ORDER BY name ASC
        `,
        [
            `%${searchTerm}%`,
            `%${searchTerm}%`
        ]
    );

    return rows;

};

const getCategoriesPaginated = async (page = 1, limit = 10) => {

    const offset = (page - 1) * limit;

    const [rows] = await db.query(
        `
        SELECT *
        FROM categories
        WHERE status='active'
        ORDER BY name ASC
        LIMIT ?
        OFFSET ?
        `,
        [
            Number(limit),
            Number(offset)
        ]
    );

    const [[count]] = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM categories
        WHERE status='active'
        `
    );

    return {
        categories: rows,
        total: count.total
    };

};

const getCategoryStatistics = async () => {

    const [[total]] = await db.query(`
        SELECT COUNT(*) AS totalCategories
        FROM categories
    `);

    const [[active]] = await db.query(`
        SELECT COUNT(*) AS activeCategories
        FROM categories
        WHERE status='active'
    `);

    const [[inactive]] = await db.query(`
        SELECT COUNT(*) AS inactiveCategories
        FROM categories
        WHERE status='inactive'
    `);

    const [[withProducts]] = await db.query(`
        SELECT COUNT(DISTINCT category_id) AS categoriesWithProducts
        FROM products
        WHERE status='active'
    `);

    const emptyCategories =
        active.activeCategories -
        withProducts.categoriesWithProducts;

    return {
        ...total,
        ...active,
        ...inactive,
        ...withProducts,
        emptyCategories
    };

};

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    getCategoryByNameExcludingId,
    createCategory,
    updateCategory,
    deleteCategory,
    searchCategories,
    getCategoriesPaginated,
    getCategoryStatistics
};