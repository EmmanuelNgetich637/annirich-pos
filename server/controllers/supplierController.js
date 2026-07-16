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

const getSupplier = async (req, res) => {

    try {

        const supplier =
            await supplierService.getSupplier(req.params.id);

        res.json({
            success: true,
            data: supplier
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

const createSupplier = async (req, res) => {

    try {

        const supplier =
            await supplierService.createSupplier(req.body);

        res.status(201).json({

            success: true,
            message: "Supplier created successfully.",
            data: supplier

        });

    } catch (error) {

        res.status(400).json({

            success: false,
            message: error.message

        });

    }

};

const updateSupplier = async (req, res) => {

    try {

        const supplier =
            await supplierService.updateSupplier(
                req.params.id,
                req.body
            );

        res.json({

            success: true,
            message: "Supplier updated successfully.",
            data: supplier

        });

    } catch (error) {

        const status =
            error.message === "Supplier not found."
                ? 404
                : 400;

        res.status(status).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
    getSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier
};