const db = require("../config/db");

// Create Expense
const createExpense = async (expense) => {

    const [result] = await db.query(
        `
        INSERT INTO expenses
        (
            expense_name,
            amount,
            description,
            expense_date
        )
        VALUES
        (?, ?, ?, ?)
        `,
        [
            expense.expense_name,
            expense.amount,
            expense.description,
            expense.expense_date
        ]
    );

    return result.insertId;

};


// Get All Expenses
const getAllExpenses = async () => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM expenses
        ORDER BY expense_date DESC,
                 id DESC
        `
    );

    return rows;

};


// Get Expense By ID
const getExpenseById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM expenses
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];

};


// Update Expense
const updateExpense = async (id, expense) => {

    await db.query(
        `
        UPDATE expenses
        SET
            expense_name = ?,
            amount = ?,
            description = ?,
            expense_date = ?
        WHERE id = ?
        `,
        [
            expense.expense_name,
            expense.amount,
            expense.description,
            expense.expense_date,
            id
        ]
    );

};


// Delete Expense
const deleteExpense = async (id) => {

    await db.query(
        `
        DELETE FROM expenses
        WHERE id = ?
        `,
        [id]
    );

};


// Search Expenses
const searchExpenses = async (keyword) => {

    const search = `%${keyword}%`;

    const [rows] = await db.query(
        `
        SELECT *
        FROM expenses
        WHERE
            expense_name LIKE ?
            OR description LIKE ?
        ORDER BY expense_date DESC
        `,
        [
            search,
            search
        ]
    );

    return rows;

};


// Pagination
const getExpensesPaginated = async (page, limit) => {

    const offset = (page - 1) * limit;

    const [rows] = await db.query(
        `
        SELECT *
        FROM expenses
        ORDER BY expense_date DESC
        LIMIT ?
        OFFSET ?
        `,
        [
            Number(limit),
            Number(offset)
        ]
    );

    const [count] = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM expenses
        `
    );

    return {

        data: rows,

        total: count[0].total,

        page,

        limit,

        totalPages: Math.ceil(
            count[0].total / limit
        )

    };

};


// Statistics
const getExpenseStatistics = async () => {

    const [rows] = await db.query(
        `
        SELECT

            COUNT(*) AS totalExpenses,

            IFNULL(
                SUM(amount),
                0
            ) AS totalAmount

        FROM expenses
        `
    );

    return rows[0];

};


module.exports = {

    createExpense,

    getAllExpenses,

    getExpenseById,

    updateExpense,

    deleteExpense,

    searchExpenses,

    getExpensesPaginated,

    getExpenseStatistics

};