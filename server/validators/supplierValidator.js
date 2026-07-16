const { body, validationResult } = require("express-validator");

const createSupplierValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Supplier name is required.")
        .isLength({ min: 2, max: 150 })
        .withMessage("Supplier name must be between 2 and 150 characters."),

    body("contact_person")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Contact person cannot exceed 100 characters."),

    body("phone")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("Phone cannot exceed 20 characters."),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Invalid email address."),

    body("address")
        .optional()
        .trim()

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

    createSupplierValidation,
    validate

};