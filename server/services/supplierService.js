const Supplier = require("../models/supplierModel");

const getSuppliers = async () => {

    return await Supplier.getAllSuppliers();

};

const getSupplier = async (id) => {

    const supplier = await Supplier.getSupplierById(id);

    if (!supplier) {
        throw new Error("Supplier not found.");
    }

    return supplier;

};

module.exports = {
    getSuppliers,
    getSupplier
};