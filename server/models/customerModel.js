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

const getCustomerByPhone = async (phone) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM customers
        WHERE phone = ?
        LIMIT 1
        `,
        [phone]
    );

    return rows[0];

};

const getCustomerByEmail = async (email) => {

    if (!email) return null;

    const [rows] = await db.query(
        `
        SELECT *
        FROM customers
        WHERE email = ?
        LIMIT 1
        `,
        [email]
    );

    return rows[0];

};

const createCustomer = async (customer) => {

    const {
        name,
        phone,
        email,
        address
    } = customer;

    const [result] = await db.query(
        `
        INSERT INTO customers
        (
            name,
            phone,
            email,
            address
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            name,
            phone,
            email || null,
            address || null
        ]
    );

    return result.insertId;

};

const getCustomerByPhoneExcludingId = async (phone, id) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM customers
        WHERE phone = ?
        AND id != ?
        LIMIT 1
        `,
        [phone, id]
    );

    return rows[0];

};

const getCustomerByEmailExcludingId = async (email, id) => {

    if (!email) return null;

    const [rows] = await db.query(
        `
        SELECT *
        FROM customers
        WHERE email = ?
        AND id != ?
        LIMIT 1
        `,
        [email, id]
    );

    return rows[0];

};

const updateCustomer = async (id, customer) => {

    const {
        name,
        phone,
        email,
        address
    } = customer;

    await db.query(
        `
        UPDATE customers
        SET
            name = ?,
            phone = ?,
            email = ?,
            address = ?
        WHERE id = ?
        `,
        [
            name,
            phone,
            email || null,
            address || null,
            id
        ]
    );

    return await getCustomerById(id);

};

const deleteCustomer = async (id) => {

    const [result] = await db.query(
        `
        UPDATE customers
        SET status = 'inactive'
        WHERE id = ?
        AND status = 'active'
        `,
        [id]
    );

    return result.affectedRows;

};

module.exports = {
    getAllCustomers,
    getCustomerById,
    getCustomerByPhone,
    getCustomerByEmail,
    getCustomerByPhoneExcludingId,
    getCustomerByEmailExcludingId,
    createCustomer,
    updateCustomer,
    deleteCustomer
};