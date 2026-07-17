const db = require("../config/db");

const Sale = require("../models/saleModel");


// CREATE SALE
const createSale = async (data) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();


        let subtotal = 0;


        // Calculate subtotal
        for (const item of data.items) {

            const [products] = await connection.query(
                `
                SELECT *
                FROM products
                WHERE id = ?
                AND status='active'
                `,
                [item.product_id]
            );


            if (!products[0]) {
                throw new Error(
                    "Product not found."
                );
            }


            const product = products[0];


            if (product.quantity < item.quantity) {

                throw new Error(
                    `Insufficient stock for ${product.name}.`
                );

            }


            subtotal +=
                item.quantity *
                item.selling_price;

        }



        const discount =
            data.discount || 0;


        const total =
            subtotal - discount;



        // Create sale

        const [saleResult] =
            await connection.query(
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
                data.customer_id || null,
                data.cashier_id,
                data.payment_method,
                subtotal,
                discount,
                total
            ]
        );


        const saleId =
            saleResult.insertId;



        // Process items

        for (const item of data.items) {


            await connection.query(
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
                    saleId,
                    item.product_id,
                    item.quantity,
                    item.selling_price
                ]
            );



            // Reduce stock

            await connection.query(
                `
                UPDATE products
                SET quantity = quantity - ?
                WHERE id=?
                `,
                [
                    item.quantity,
                    item.product_id
                ]
            );



            // Get new balance

            const [balance] =
            await connection.query(
                `
                SELECT quantity
                FROM products
                WHERE id=?
                `,
                [
                    item.product_id
                ]
            );



            // Stock movement

            await connection.query(
                `
                INSERT INTO stock_movements
                (
                    product_id,
                    reference_id,
                    reference_type,
                    movement_type,
                    quantity,
                    balance_after,
                    remarks
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    item.product_id,
                    saleId,
                    "Sale",
                    "Sale",
                    item.quantity,
                    balance[0].quantity,
                    "Sale Stock Out"
                ]
            );


        }



        await connection.commit();


        return {

            saleId,
            subtotal,
            discount,
            total

        };


    } catch(error){


        await connection.rollback();

        throw error;


    } finally {


        connection.release();

    }


};



// GET ALL SALES

const getSales = async()=>{

    return await Sale.getAllSales();

};



// GET SALE

const getSale = async(id)=>{


    const sale =
        await Sale.getSaleById(id);


    if(!sale){

        throw new Error(
            "Sale not found."
        );

    }


    return sale;

};



// SEARCH

const searchSales = async(keyword)=>{

    return await Sale.searchSales(keyword);

};



// PAGINATION

const getSalesPaginated =
async(page,limit)=>{

    return await Sale.getSalesPaginated(
        page,
        limit
    );

};



// STATISTICS

const getSaleStatistics =
async()=>{

    return await Sale.getSaleStatistics();

};



module.exports={

createSale,
getSales,
getSale,
searchSales,
getSalesPaginated,
getSaleStatistics

};