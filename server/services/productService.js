const Product = require("../models/productModel");

const createProduct = async (data) => {

    return await Product.createProduct(data);

};

const getProducts = async () => {

    return await Product.getAllProducts();

};

const getProduct = async (id) => {

    const product = await Product.getProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;

};

const updateProduct = async (id, data) => {

    const existing = await Product.getProductById(id);

    if (!existing) {
        throw new Error("Product not found");
    }

    await Product.updateProduct(id, data);

    return await Product.getProductById(id);
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct
};