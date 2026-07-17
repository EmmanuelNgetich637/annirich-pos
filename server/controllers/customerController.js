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

const getCustomer = async (req, res) => {

    try {

        const customer =
            await customerService.getCustomer(
                req.params.id
            );

        res.json({

            success: true,
            data: customer

        });

    } catch (error) {

        const status =
            error.message === "Customer not found."
                ? 404
                : 500;

        res.status(status).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
    getCustomers,
    getCustomer
};