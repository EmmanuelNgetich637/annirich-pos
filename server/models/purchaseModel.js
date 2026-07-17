const db = require("../config/db");

/*
|--------------------------------------------------------------------------
| Create Purchase
|--------------------------------------------------------------------------
|
| This function will:
|
| 1. Begin Transaction
| 2. Insert Purchase
| 3. Insert Purchase Items
| 4. Update Product Stock
| 5. Create Stock Movement
| 6. Commit Transaction
|
| If anything fails:
|
| Rollback everything.
|
*/

const createPurchase = async (purchaseData, userId) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const {
            supplier_id,
            invoice_number,
            remarks,
            items
        } = purchaseData;

        // Calculate Total Amount

        let totalAmount = 0;

        for (const item of items) {

            totalAmount +=
                item.quantity * item.buying_price;

        }

        // Insert Purchase

        const [purchaseResult] =
            await connection.query(
                `
                INSERT INTO purchases
                (
                    supplier_id,
                    invoice_number,
                    total_amount,
                    status,
                    remarks,
                    created_by
                )
                VALUES (?, ?, ?, 'Completed', ?, ?)
                `,
                [
                    supplier_id,
                    invoice_number || null,
                    totalAmount,
                    remarks || null,
                    userId
                ]
            );

        const purchaseId =
            purchaseResult.insertId;

        /*
        ==================================================
        Purchase Items
        ==================================================
        */

        for (const item of items) {

            const subtotal =
                item.quantity * item.buying_price;

            // Insert Purchase Item

            await connection.query(
                `
                INSERT INTO purchase_items
                (
                    purchase_id,
                    product_id,
                    quantity,
                    buying_price,
                    subtotal
                )
                VALUES (?, ?, ?, ?, ?)
                `,
                [
                    purchaseId,
                    item.product_id,
                    item.quantity,
                    item.buying_price,
                    subtotal
                ]
            );

            /*
            ==================================================
            Update Product Quantity
            ==================================================
            */

            await connection.query(
                `
                UPDATE products
                SET quantity = quantity + ?
                WHERE id = ?
                `,
                [
                    item.quantity,
                    item.product_id
                ]
            );

            /*
            ==================================================
            Get New Balance
            ==================================================
            */

            const [product] =
                await connection.query(
                    `
                    SELECT quantity
                    FROM products
                    WHERE id = ?
                    `,
                    [item.product_id]
                );

            const balance =
                product[0].quantity;

            /*
            ==================================================
            Stock Movement
            ==================================================
            */

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
                    balance,
                    "Purchase Stock"
                ]
            );

        }

        await connection.commit();

        return {

            purchaseId,
            totalAmount

        };

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();

    }

};

module.exports = {

    createPurchase

};