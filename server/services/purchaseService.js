const Purchase = require("../models/purchaseModel");

const createPurchase = async (purchaseData, userId) => {

    return await Purchase.createPurchase(
        purchaseData,
        userId
    );

};

module.exports = {

    createPurchase

};