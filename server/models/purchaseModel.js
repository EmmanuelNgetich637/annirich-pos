const db = require("../config/db");

const countPurchasesBySupplier = async (supplierId) => {

    const [[result]] = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM purchases
        WHERE supplier_id = ?
        `,
        [supplierId]
    );

    return result.total;

};

module.exports = {
    countPurchasesBySupplier
};