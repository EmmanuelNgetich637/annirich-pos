const db = require("../config/db");

const createProduct = async (product) => {

    const {
        barcode,
        name,
        category_id,
        buying_price,
        selling_price,
        quantity,
        minimum_stock,
        unit,
        image,
        description
    } = product;

    const [result] = await db.query(
        `
        INSERT INTO products
        (
            barcode,
            name,
            category_id,
            buying_price,
            selling_price,
            quantity,
            minimum_stock,
            unit,
            image,
            description
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            barcode,
            name,
            category_id,
            buying_price,
            selling_price,
            quantity,
            minimum_stock,
            unit,
            image,
            description
        ]
    );

    return result.insertId;

};

const getAllProducts = async () => {
    const [rows] = await db.query(`
        SELECT
            products.*,
            categories.name AS category_name
        FROM products
        JOIN categories
            ON products.category_id = categories.id
        ORDER BY products.id DESC
    `);

    return rows;
};

const getProductById = async (id) => {

    const [rows] = await db.query(
        `SELECT * FROM products WHERE id = ?`,
        [id]
    );

    return rows[0];

};

const updateProduct = async (id, product) => {

    const {
        barcode,
        name,
        category_id,
        buying_price,
        selling_price,
        quantity,
        minimum_stock,
        unit,
        image,
        description
    } = product;

    const [result] = await db.query(
        `
        UPDATE products
        SET
            barcode=?,
            name=?,
            category_id=?,
            buying_price=?,
            selling_price=?,
            quantity=?,
            minimum_stock=?,
            unit=?,
            image=?,
            description=?
        WHERE id=?
        `,
        [
            barcode,
            name,
            category_id,
            buying_price,
            selling_price,
            quantity,
            minimum_stock,
            unit,
            image,
            description,
            id
        ]
    );

    return result;
};

const deleteProduct = async (id) => {

    const [result] = await db.query(
        `
        UPDATE products
        SET status='inactive'
        WHERE id=?
        `,
        [id]
    );

    return result;

};

const searchProducts = async (searchTerm) => {

    const [rows] = await db.query(
        `
        SELECT
            products.*,
            categories.name AS category_name
        FROM products
        JOIN categories
            ON products.category_id = categories.id
        WHERE
            products.status='active'
        AND
        (
            products.name LIKE ?
            OR products.barcode LIKE ?
            OR categories.name LIKE ?
        )
        ORDER BY products.name ASC
        `,
        [
            `%${searchTerm}%`,
            `%${searchTerm}%`,
            `%${searchTerm}%`
        ]
    );

    return rows;

};

const getProductsPaginated = async (page = 1, limit = 10) => {

    const offset = (page - 1) * limit;

    const [rows] = await db.query(
        `
        SELECT
            products.*,
            categories.name AS category_name
        FROM products
        JOIN categories
            ON products.category_id = categories.id
        WHERE products.status='active'
        ORDER BY products.id DESC
        LIMIT ?
        OFFSET ?
        `,
        [Number(limit), Number(offset)]
    );

    const [count] = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM products
        WHERE status='active'
        `
    );

    return {
        products: rows,
        total: count[0].total
    };

};

const updateProductImage = async (id, image) => {

    const [result] = await db.query(

        `
        UPDATE products
        SET image=?
        WHERE id=?
        `,

        [image, id]

    );

    return result;

};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsPaginated,
    updateProductImage
};