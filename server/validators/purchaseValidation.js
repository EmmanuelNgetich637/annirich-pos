const { body } = require("express-validator");

const createPurchaseValidation = [

    body("supplier_id")
        .notEmpty()
        .withMessage("Supplier is required.")
        .isInt({ min: 1 })
        .withMessage("Supplier ID must be a valid integer."),

    body("invoice_number")
        .optional()
        .isLength({ max: 100 })
        .withMessage("Invoice number cannot exceed 100 characters."),

    body("remarks")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Remarks cannot exceed 500 characters."),

    body("items")
        .isArray({ min: 1 })
        .withMessage("Purchase must contain at least one item."),

    body("items.*.product_id")
        .notEmpty()
        .withMessage("Product is required.")
        .isInt({ min: 1 })
        .withMessage("Product ID must be valid."),

    body("items.*.quantity")
        .notEmpty()
        .withMessage("Quantity is required.")
        .isInt({ min: 1 })
        .withMessage("Quantity must be greater than zero."),

    body("items.*.buying_price")
        .notEmpty()
        .withMessage("Buying price is required.")
        .isFloat({ min: 0.01 })
        .withMessage("Buying price must be greater than zero.")

];

module.exports = {
    createPurchaseValidation
};