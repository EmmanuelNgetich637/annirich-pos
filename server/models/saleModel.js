const db = require("../config/db");


const createSale = async (data) => {

    const {
        customer_id,
        cashier_id,
        payment_method,
        subtotal,
        discount,
        total
    } = data;


    const [result] = await db.query(
        `
        INSERT INTO sales
        (
            customer_id,
            cashier_id,
            payment_method,
            subtotal,
            discount,
            total
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            customer_id || null,
            cashier_id,
            payment_method,
            subtotal,
            discount || 0,
            total
        ]
    );


    return result.insertId;

};



const createSaleItem = async (item) => {

    const {
        sale_id,
        product_id,
        quantity,
        selling_price
    } = item;


    await db.query(
        `
        INSERT INTO sale_items
        (
            sale_id,
            product_id,
            quantity,
            selling_price
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            sale_id,
            product_id,
            quantity,
            selling_price
        ]
    );

};



const getAllSales = async () => {


    const [rows] = await db.query(
        `
        SELECT 
            sales.*,
            customers.name AS customer_name
        FROM sales

        LEFT JOIN customers
        ON sales.customer_id = customers.id

        ORDER BY sales.id DESC
        `
    );


    return rows;

};



const getSaleById = async (id)=>{


    const [sales] = await db.query(
        `
        SELECT
            sales.*,
            customers.name AS customer_name

        FROM sales

        LEFT JOIN customers
        ON sales.customer_id = customers.id

        WHERE sales.id=?
        `,
        [id]
    );


    if(!sales[0]){
        return null;
    }


    const [items]=await db.query(
        `
        SELECT
            sale_items.*,
            products.name AS product_name

        FROM sale_items

        LEFT JOIN products
        ON sale_items.product_id=products.id

        WHERE sale_items.sale_id=?
        `,
        [id]
    );


    return {
        ...sales[0],
        items
    };


};



const searchSales = async(keyword)=>{


    const [rows]=await db.query(
        `
        SELECT
            sales.*,
            customers.name AS customer_name

        FROM sales

        LEFT JOIN customers
        ON sales.customer_id=customers.id

        WHERE
        customers.name LIKE ?
        OR payment_method LIKE ?

        ORDER BY sales.id DESC
        `,
        [
            `%${keyword}%`,
            `%${keyword}%`
        ]
    );


    return rows;

};



const getSalesPaginated = async(page=1,limit=10)=>{


    const offset=(page-1)*limit;


    const [rows]=await db.query(
        `
        SELECT
            sales.*,
            customers.name AS customer_name

        FROM sales

        LEFT JOIN customers
        ON sales.customer_id=customers.id

        ORDER BY sales.id DESC

        LIMIT ?
        OFFSET ?
        `,
        [
            Number(limit),
            Number(offset)
        ]
    );


    const [[count]]=await db.query(
        `
        SELECT COUNT(*) AS total
        FROM sales
        `
    );


    return {
        sales:rows,
        total:count.total
    };


};



const getSaleStatistics = async()=>{


    const [[stats]]=await db.query(
        `
        SELECT

        COUNT(*) AS totalSales,

        SUM(total) AS totalRevenue

        FROM sales
        `
    );


    return stats;

};



module.exports={

createSale,
createSaleItem,
getAllSales,
getSaleById,
searchSales,
getSalesPaginated,
getSaleStatistics

};