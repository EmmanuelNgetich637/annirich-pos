const { body, validationResult } = require("express-validator");

const createCustomerValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Customer name is required.")
        .isLength({ min: 2, max: 100 })
        .withMessage("Customer name must be between 2 and 100 characters."),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required.")
        .isLength({ min: 7, max: 20 })
        .withMessage("Phone number must be between 7 and 20 characters."),

    body("email")
        .optional({ checkFalsy: true })
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

    createCustomerValidation,
    validate

};