const Product = require("../models/productModel");
const productService = require("../services/productService");

const createProduct = async (req, res) => {

    try {

        const id = await productService.createProduct(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            productId: id
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

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

module.exports = {
    getProducts,
    getProduct,
    createProduct
};