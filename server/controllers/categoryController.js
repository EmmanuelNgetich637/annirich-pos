const categoryService = require("../services/categoryService");

const getCategories = async (req, res) => {

    try {

        const categories =
            await categoryService.getCategories();

        res.json({

            success: true,
            count: categories.length,
            data: categories

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const getCategory = async (req, res) => {

    try {

        const category = await categoryService.getCategory(
            req.params.id
        );

        res.json({
            success: true,
            data: category
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

const createCategory = async (req, res) => {

    try {

        const category =
            await categoryService.createCategory(req.body);

        res.status(201).json({
            success: true,
            message: "Category created successfully.",
            data: category
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getCategories,
    getCategory,
    createCategory
};