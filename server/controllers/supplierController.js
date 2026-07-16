const supplierService = require("../services/supplierService");

const getSuppliers = async (req, res) => {

    try {

        const suppliers =
            await supplierService.getSuppliers();

        res.json({

            success: true,
            count: suppliers.length,
            data: suppliers

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
    getSuppliers
};