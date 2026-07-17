const db = require("../config/db");

const Purchase = require("../models/purchaseModel");


// Create purchase
const createPurchase = async (data, userId) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();


        const {
            supplier_id,
            invoice_number,
            remarks,
            items
        } = data;


        if (!supplier_id) {
            throw new Error("Supplier is required.");
        }


        if (!items || items.length === 0) {
            throw new Error("Purchase items are required.");
        }


        let totalAmount = 0;


        for (const item of items) {

            if (!item.product_id) {
                throw new Error(
                    "Product ID is required."
                );
            }


            if (!item.quantity || item.quantity <= 0) {
                throw new Error(
                    "Invalid quantity."
                );
            }


            if (!item.buying_price || item.buying_price <= 0) {
                throw new Error(
                    "Invalid buying price."
                );
            }


            totalAmount +=
                item.quantity *
                item.buying_price;

        }


        const existingInvoice =
        await Purchase.getPurchaseByInvoiceNumber(
        data.invoice_number
        );


        if(existingInvoice){

            throw new Error(
                "Invoice number already exists."
            );

        }

        const purchaseId =
            await Purchase.createPurchase(
                {
                    supplier_id,
                    invoice_number,
                    total_amount: totalAmount,
                    remarks,
                    created_by: userId
                },
                connection
            );



        await Purchase.createPurchaseItems(
            purchaseId,
            items,
            connection
        );



        // Update stock and create movements

        for (const item of items) {


            const [product] =
                await connection.query(
                    `
                    SELECT quantity
                    FROM products
                    WHERE id = ?
                    `,
                    [
                        item.product_id
                    ]
                );


            if (!product[0]) {

                throw new Error(
                    "Product not found."
                );

            }



            const newBalance =
                product[0].quantity +
                item.quantity;



            await connection.query(
                `
                UPDATE products
                SET quantity = ?
                WHERE id = ?
                `,
                [
                    newBalance,
                    item.product_id
                ]
            );



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
                VALUES
                (?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    item.product_id,
                    purchaseId,
                    "Purchase",
                    "Stock In",
                    item.quantity,
                    newBalance,
                    "Stock received from purchase"
                ]
            );


        }


        await connection.commit();


        return {
            purchaseId,
            totalAmount
        };


    } catch(error) {


        await connection.rollback();

        throw error;


    } finally {


        connection.release();

    }

};



// Get all purchases
const getPurchases = async () => {

    return await Purchase.getAllPurchases();

};



// Get purchase
const getPurchase = async (id) => {


    const purchase =
        await Purchase.getPurchaseById(id);


    if (!purchase) {

        throw new Error(
            "Purchase not found."
        );

    }


    return purchase;

};



// Search
const searchPurchases = async (keyword) => {

    return await Purchase.searchPurchases(
        keyword
    );

};



// Pagination
const getPurchasesPaginated =
async (page, limit) => {


    return await Purchase
        .getPurchasesPaginated(
            page,
            limit
        );

};



// Statistics
const getPurchaseStatistics =
async () => {


    return await Purchase
        .getPurchaseStatistics();

};



module.exports = {

    createPurchase,

    getPurchases,

    getPurchase,

    searchPurchases,

    getPurchasesPaginated,

    getPurchaseStatistics

};