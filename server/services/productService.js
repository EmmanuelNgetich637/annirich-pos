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

const deleteProduct = async (id) => {

    const product = await Product.getProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    await Product.deleteProduct(id);

    return;

};

const searchProducts = async (query) => {

    return await Product.searchProducts(query);

};

const getProductsPaginated = async (page, limit) => {

    return await Product.getProductsPaginated(page, limit);

};

const updateProductImage = async (id, file) => {

    const product = await Product.getProductById(id);

    if (!product) {

        throw new Error("Product not found");

    }

    await Product.updateProductImage(
        id,
        file.filename
    );

    return await Product.getProductById(id);

};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsPaginated,
    updateProductImage
};