const { body, validationResult } = require("express-validator");


// Purchase validation rules

const createPurchaseValidation = [

    body("supplier_id")
        .notEmpty()
        .withMessage("Supplier is required.")
        .isInt()
        .withMessage("Supplier ID must be a number."),


    body("items")
        .isArray({ min: 1 })
        .withMessage("Purchase items are required."),


    body("items.*.product_id")
        .notEmpty()
        .withMessage("Product ID is required.")
        .isInt()
        .withMessage("Product ID must be a number."),


    body("items.*.quantity")
        .notEmpty()
        .withMessage("Quantity is required.")
        .isInt({ min: 1 })
        .withMessage("Quantity must be greater than zero."),


    body("items.*.buying_price")
        .notEmpty()
        .withMessage("Buying price is required.")
        .isFloat({ min: 0 })
        .withMessage("Invalid buying price.")

];



// Validation middleware

const validate = (req, res, next) => {

    const errors =
        validationResult(req);


    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            errors: errors.array()

        });

    }


    next();

};



module.exports = {

    createPurchaseValidation,

    validate

};