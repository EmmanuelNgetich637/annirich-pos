const Supplier = require("../models/supplierModel");

const getSuppliers = async () => {

    return await Supplier.getAllSuppliers();

};

module.exports = {
    getSuppliers
};