const { body, validationResult } = require("express-validator");

const createCategoryValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required.")
        .isLength({ min: 2, max: 100 })
        .withMessage("Category name must be between 2 and 100 characters."),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Description cannot exceed 255 characters.")

];

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array()
        });

    }

    next();

};

module.exports = {
    createCategoryValidation,
    validate
};