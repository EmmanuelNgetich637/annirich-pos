const customerService = require("../services/customerService");

const getCustomers = async (req, res) => {

    try {

        const customers =
            await customerService.getCustomers();

        res.json({

            success: true,
            count: customers.length,
            data: customers

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
    getCustomers
};