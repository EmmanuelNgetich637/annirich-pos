const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const getCategories = async () => {

    return await Category.getAllCategories();

};

const getCategory = async (id) => {

    const category = await Category.getCategoryById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return category;

};

const createCategory = async (data) => {

    const exists = await Category.getCategoryByName(data.name);

    if (exists) {
        throw new Error("Category already exists.");
    }

    const id = await Category.createCategory(data);

    return await Category.getCategoryById(id);

};

const updateCategory = async (id, data) => {

    const category = await Category.getCategoryById(id);

    if (!category) {
        throw new Error("Category not found.");
    }

    const duplicate =
        await Category.getCategoryByNameExcludingId(
            data.name,
            id
        );

    if (duplicate) {
        throw new Error("Category name already exists.");
    }

    await Category.updateCategory(id, data);

    return await Category.getCategoryById(id);

};

const deleteCategory = async (id) => {

    const category = await Category.getCategoryById(id);

    if (!category) {
        throw new Error("Category not found.");
    }

    const totalProducts =
        await Product.countProductsByCategory(id);

    if (totalProducts > 0) {
        throw new Error(
            "Cannot delete category. Active products are assigned to it."
        );
    }

    await Category.deleteCategory(id);

};

const searchCategories = async (query) => {

    return await Category.searchCategories(query);

};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    searchCategories
};