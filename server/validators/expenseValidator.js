const { body } = require("express-validator");

const createExpenseValidation = [

    body("expense_name")
        .trim()
        .notEmpty()
        .withMessage("Expense name is required.")
        .isLength({ max: 150 })
        .withMessage("Expense name must not exceed 150 characters."),

    body("amount")
        .notEmpty()
        .withMessage("Amount is required.")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be greater than zero."),

    body("expense_date")
        .notEmpty()
        .withMessage("Expense date is required.")
        .isDate()
        .withMessage("Invalid expense date."),

    body("description")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Description is too long.")

];

module.exports = {
    createExpenseValidation
};