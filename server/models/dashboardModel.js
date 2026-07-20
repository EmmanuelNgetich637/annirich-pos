const db = require("../config/db");

/*
|--------------------------------------------------------------------------
| Dashboard Summary
|--------------------------------------------------------------------------
*/

const getDashboardSummary = async () => {

    const [[products]] = await db.query(`
        SELECT COUNT(*) AS totalProducts
        FROM products
    `);

    const [[categories]] = await db.query(`
        SELECT COUNT(*) AS totalCategories
        FROM categories
    `);

    const [[customers]] = await db.query(`
        SELECT COUNT(*) AS totalCustomers
        FROM customers
    `);

    const [[suppliers]] = await db.query(`
        SELECT COUNT(*) AS totalSuppliers
        FROM suppliers
    `);

    const [[sales]] = await db.query(`
        SELECT
            COUNT(*) AS totalSales,
            IFNULL(SUM(total),0) AS salesRevenue
        FROM sales
    `);

    const [[purchases]] = await db.query(`
        SELECT
            COUNT(*) AS totalPurchases,
            IFNULL(SUM(total_amount),0) AS purchaseCost
        FROM purchases
    `);

    const [[expenses]] = await db.query(`
        SELECT
            COUNT(*) AS totalExpenses,
            IFNULL(SUM(amount),0) AS expenseAmount
        FROM expenses
    `);

    const [[lowStock]] = await db.query(`
        SELECT COUNT(*) AS lowStockItems
        FROM products
        WHERE quantity <= minimum_stock
    `);

    return {

        totalProducts: products.totalProducts,

        totalCategories: categories.totalCategories,

        totalCustomers: customers.totalCustomers,

        totalSuppliers: suppliers.totalSuppliers,

        totalSales: sales.totalSales,

        salesRevenue: sales.salesRevenue,

        totalPurchases: purchases.totalPurchases,

        purchaseCost: purchases.purchaseCost,

        totalExpenses: expenses.totalExpenses,

        expenseAmount: expenses.expenseAmount,

        lowStockItems: lowStock.lowStockItems

    };

};

/*
|--------------------------------------------------------------------------
| Recent Sales
|--------------------------------------------------------------------------
*/

const getRecentSales = async () => {

    const [rows] = await db.query(`
        SELECT
            s.id,
            c.name AS customer_name,
            s.total,
            s.payment_method,
            s.created_at
        FROM sales s
        LEFT JOIN customers c
            ON s.customer_id = c.id
        ORDER BY s.created_at DESC
        LIMIT 10
    `);

    return rows;

};

/*
|--------------------------------------------------------------------------
| Recent Purchases
|--------------------------------------------------------------------------
*/

const getRecentPurchases = async () => {

    const [rows] = await db.query(`
        SELECT
            p.id,
            s.name AS supplier_name,
            p.invoice_number,
            p.total_amount,
            p.created_at
        FROM purchases p
        LEFT JOIN suppliers s
            ON p.supplier_id = s.id
        ORDER BY p.created_at DESC
        LIMIT 10
    `);

    return rows;

};

/*
|--------------------------------------------------------------------------
| Low Stock Products
|--------------------------------------------------------------------------
*/

const getLowStockProducts = async () => {

    const [rows] = await db.query(`
        SELECT
            id,
            name,
            quantity,
            minimum_stock
        FROM products
        WHERE quantity <= minimum_stock
        ORDER BY quantity ASC
    `);

    return rows;

};

/*
|--------------------------------------------------------------------------
| Monthly Sales
|--------------------------------------------------------------------------
*/

const getMonthlySales = async () => {

    const [rows] = await db.query(`
        SELECT

            DATE_FORMAT(created_at,'%Y-%m') AS month,

            COUNT(*) AS totalSales,

            SUM(total) AS revenue

        FROM sales

        GROUP BY DATE_FORMAT(created_at,'%Y-%m')

        ORDER BY month ASC
    `);

    return rows;

};

module.exports = {

    getDashboardSummary,

    getRecentSales,

    getRecentPurchases,

    getLowStockProducts,

    getMonthlySales

};

