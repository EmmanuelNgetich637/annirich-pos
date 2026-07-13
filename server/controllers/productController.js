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

const updateProduct = async (req, res) => {

    try {

        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Product updated successfully.",
            data: product
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

const deleteProduct = async (req, res) => {

    try {

        await productService.deleteProduct(req.params.id);

        res.json({
            success: true,
            message: "Product deleted successfully."
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};