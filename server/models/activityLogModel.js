const db = require("../config/db");


/*
|--------------------------------------------------------------------------
| Create Activity Log
|--------------------------------------------------------------------------
*/

const createLog = async ({
    user_id,
    action,
    module,
    description,
    ip_address
}) => {

    const [result] = await db.query(
        `
        INSERT INTO activity_logs
        (
            user_id,
            action,
            module,
            description,
            ip_address
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            user_id,
            action,
            module,
            description,
            ip_address
        ]
    );


    return {

        id: result.insertId,

        user_id,

        action,

        module,

        description,

        ip_address

    };

};


/*
|--------------------------------------------------------------------------
| Get All Activity Logs
|--------------------------------------------------------------------------
*/

const getAllLogs = async () => {

    const [rows] = await db.query(
        `
        SELECT
            a.id,
            a.action,
            a.module,
            a.description,
            a.ip_address,
            a.created_at,
            u.full_name AS user_name
        FROM activity_logs a

        LEFT JOIN users u
            ON a.user_id = u.id

        ORDER BY a.created_at DESC
        `
    );


    return rows;

};


/*
|--------------------------------------------------------------------------
| Get Logs By User
|--------------------------------------------------------------------------
*/

const getLogsByUser = async (user_id) => {

    const [rows] = await db.query(
        `
        SELECT
            a.id,
            a.action,
            a.module,
            a.description,
            a.created_at
        FROM activity_logs a

        WHERE a.user_id = ?

        ORDER BY a.created_at DESC
        `,
        [user_id]
    );


    return rows;

};


module.exports = {

    createLog,

    getAllLogs,

    getLogsByUser

};