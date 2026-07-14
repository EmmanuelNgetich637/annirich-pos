const Category = require("../models/categoryModel");

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

module.exports = {
    getCategories,
    getCategory,
    createCategory
};