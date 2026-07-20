const db = require("../config/db");

/*
|--------------------------------------------------------------------------
| Get Settings
|--------------------------------------------------------------------------
*/

const getSettings = async () => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM settings
        LIMIT 1
        `
    );

    return rows[0] || null;

};

/*
|--------------------------------------------------------------------------
| Create Settings
|--------------------------------------------------------------------------
*/

const createSettings = async (data) => {

    const {
        business_name,
        phone,
        email,
        address,
        receipt_footer
    } = data;

    const [result] = await db.query(
        `
        INSERT INTO settings
        (
            business_name,
            phone,
            email,
            address,
            receipt_footer
        )
        VALUES
        (?, ?, ?, ?, ?)
        `,
        [
            business_name,
            phone,
            email,
            address,
            receipt_footer
        ]
    );

    return result.insertId;

};

/*
|--------------------------------------------------------------------------
| Update Settings
|--------------------------------------------------------------------------
*/

const updateSettings = async (data) => {

    const {
        business_name,
        phone,
        email,
        address,
        receipt_footer
    } = data;

    await db.query(
        `
        UPDATE settings
        SET
            business_name = ?,
            phone = ?,
            email = ?,
            address = ?,
            receipt_footer = ?
        WHERE id = 1
        `,
        [
            business_name,
            phone,
            email,
            address,
            receipt_footer
        ]
    );

    return getSettings();

};

module.exports = {

    getSettings,

    createSettings,

    updateSettings

};