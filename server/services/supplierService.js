const Supplier = require("../models/supplierModel");
const Purchase = require("../models/purchaseModel");

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

const createSupplier = async (data) => {
    if (!data.name || data.name.trim() === "") {
        throw new Error("Supplier name is required.");
    }

    const exists = await Supplier.getSupplierByName(data.name.trim());

    if (exists) {
        throw new Error("Supplier already exists.");
    }

    const id = await Supplier.createSupplier({
        ...data,
        name: data.name.trim()
    });

    return await Supplier.getSupplierById(id);
};

const updateSupplier = async (id, data) => {
    const supplier = await Supplier.getSupplierById(id);

    if (!supplier) {
        throw new Error("Supplier not found.");
    }

    if (!data.name || data.name.trim() === "") {
        throw new Error("Supplier name is required.");
    }

    const duplicate = await Supplier.getSupplierByNameExcludingId(
        data.name.trim(),
        id
    );

    if (duplicate) {
        throw new Error("Supplier name already exists.");
    }

    await Supplier.updateSupplier(id, {
        ...data,
        name: data.name.trim()
    });

    return await Supplier.getSupplierById(id);
};

const deleteSupplier = async (id) => {
    const supplier = await Supplier.getSupplierById(id);

    if (!supplier) {
        throw new Error("Supplier not found.");
    }

    const purchases = await Purchase.countPurchasesBySupplier(id);

    if (purchases > 0) {
        throw new Error(
            "Cannot delete supplier. Purchase history exists."
        );
    }

    await Supplier.deleteSupplier(id);

    return {
        message: "Supplier deleted successfully."
    };
};

const searchSuppliers = async (query) => {
    return await Supplier.searchSuppliers(query);
};

const getSuppliersPaginated = async (page, limit) => {
    return await Supplier.getSuppliersPaginated(page, limit);
};

const getSupplierStatistics = async () => {
    return await Supplier.getSupplierStatistics();
};

module.exports = {
    getSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    searchSuppliers,
    getSuppliersPaginated,
    getSupplierStatistics
};