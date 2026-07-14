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

module.exports = {
    getCategories,
    getCategory
};