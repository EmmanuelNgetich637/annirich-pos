const db = require("../config/db");

/*
|--------------------------------------------------------------------------
| Sales Report
|--------------------------------------------------------------------------
*/

const getSalesReport = async (startDate, endDate) => {

    const [rows] = await db.query(
        `
        SELECT
            s.id,
            c.name AS customer_name,
            s.payment_method,
            s.subtotal,
            s.discount,
            s.total,
            s.created_at
        FROM sales s
        LEFT JOIN customers c
            ON s.customer_id = c.id
        WHERE DATE(s.created_at)
            BETWEEN ? AND ?
        ORDER BY s.created_at DESC
        `,
        [startDate, endDate]
    );

    return rows;

};

/*
|--------------------------------------------------------------------------
| Purchase Report
|--------------------------------------------------------------------------
*/

const getPurchaseReport = async (startDate, endDate) => {

    const [rows] = await db.query(
        `
        SELECT
            p.id,
            s.name AS supplier_name,
            p.invoice_number,
            p.total_amount,
            p.status,
            p.created_at
        FROM purchases p
        LEFT JOIN suppliers s
            ON p.supplier_id = s.id
        WHERE DATE(p.created_at)
            BETWEEN ? AND ?
        ORDER BY p.created_at DESC
        `,
        [startDate, endDate]
    );

    return rows;

};

/*
|--------------------------------------------------------------------------
| Expense Report
|--------------------------------------------------------------------------
*/

const getExpenseReport = async (startDate, endDate) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            expense_name,
            amount,
            description,
            expense_date
        FROM expenses
        WHERE expense_date
            BETWEEN ? AND ?
        ORDER BY expense_date DESC
        `,
        [startDate, endDate]
    );

    return rows;

};

/*
|--------------------------------------------------------------------------
| Inventory Report
|--------------------------------------------------------------------------
*/

const getInventoryReport = async () => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            barcode,
            name,
            quantity,
            buying_price,
            selling_price,
            minimum_stock,
            status
        FROM products
        ORDER BY name ASC
        `
    );

    return rows;

};

/*
|--------------------------------------------------------------------------
| Profit Summary
|--------------------------------------------------------------------------
*/

const getProfitReport = async (startDate, endDate) => {

    const [[sales]] = await db.query(
        `
        SELECT
            IFNULL(SUM(total),0) AS revenue
        FROM sales
        WHERE DATE(created_at)
            BETWEEN ? AND ?
        `,
        [startDate, endDate]
    );

    const [[purchases]] = await db.query(
        `
        SELECT
            IFNULL(SUM(total_amount),0) AS purchases
        FROM purchases
        WHERE DATE(created_at)
            BETWEEN ? AND ?
        `,
        [startDate, endDate]
    );

    const [[expenses]] = await db.query(
        `
        SELECT
            IFNULL(SUM(amount),0) AS expenses
        FROM expenses
        WHERE expense_date
            BETWEEN ? AND ?
        `,
        [startDate, endDate]
    );

    return {

        revenue: Number(sales.revenue),

        purchases: Number(purchases.purchases),

        expenses: Number(expenses.expenses),

        profit:
            Number(sales.revenue) -
            Number(purchases.purchases) -
            Number(expenses.expenses)

    };

};

module.exports = {

    getSalesReport,

    getPurchaseReport,

    getExpenseReport,

    getInventoryReport,

    getProfitReport

};