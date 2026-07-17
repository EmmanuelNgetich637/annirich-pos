const purchaseService = require("../services/purchaseService");

const createPurchase = async (req, res) => {

    try {

        /*
        ==========================================
        Logged In User
        ==========================================
        */

        const userId = req.user.id;

        /*
        ==========================================
        Create Purchase
        ==========================================
        */

        const purchase =
            await purchaseService.createPurchase(
                req.body,
                userId
            );

        /*
        ==========================================
        Response
        ==========================================
        */

        res.status(201).json({

            success: true,

            message: "Purchase created successfully.",

            data: purchase

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createPurchase

};