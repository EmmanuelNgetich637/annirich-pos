const db = require("../config/db");

const getAllSuppliers = async () => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM suppliers
        WHERE status = 'active'
        ORDER BY name ASC
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

const getSupplierByName = async (name) => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM suppliers
        WHERE LOWER(name) = LOWER(?)
        AND status = 'active'
        LIMIT 1
        `,
        [name]
    );

    return rows[0];
};

const getSupplierByNameExcludingId = async (name, id) => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM suppliers
        WHERE LOWER(name) = LOWER(?)
        AND id != ?
        AND status = 'active'
        LIMIT 1
        `,
        [name, id]
    );

    return rows[0];
};

const createSupplier = async (supplier) => {
    const {
        name,
        contact_person,
        phone,
        email,
        address
    } = supplier;

    const [result] = await db.query(
        `
        INSERT INTO suppliers
        (
            name,
            contact_person,
            phone,
            email,
            address
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            name,
            contact_person || null,
            phone || null,
            email || null,
            address || null
        ]
    );

    return result.insertId;
};

const updateSupplier = async (id, supplier) => {
    const {
        name,
        contact_person,
        phone,
        email,
        address
    } = supplier;

    await db.query(
        `
        UPDATE suppliers
        SET
            name = ?,
            contact_person = ?,
            phone = ?,
            email = ?,
            address = ?
        WHERE id = ?
        `,
        [
            name,
            contact_person || null,
            phone || null,
            email || null,
            address || null,
            id
        ]
    );

    return await getSupplierById(id);
};

module.exports = {
    getAllSuppliers,
    getSupplierById,
    getSupplierByName,
    getSupplierByNameExcludingId,
    createSupplier,
    updateSupplier
};