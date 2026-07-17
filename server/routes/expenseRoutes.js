const express = require("express");

const router = express.Router();

const expenseController =
require("../controllers/expenseController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const validate =
require("../middleware/validate");

const {
    createExpenseValidation
} = require("../validators/expenseValidator");


// Create Expense
router.post(
    "/",
    authenticate,
    authorize("admin", "manager"),
    createExpenseValidation,
    validate,
    expenseController.createExpense
);


// Get All Expenses
router.get(
    "/",
    authenticate,
    authorize("admin", "manager"),
    expenseController.getExpenses
);


// Search Expenses
router.get(
    "/search",
    authenticate,
    authorize("admin", "manager"),
    expenseController.searchExpenses
);


// Pagination
router.get(
    "/page/list",
    authenticate,
    authorize("admin", "manager"),
    expenseController.getExpensesPaginated
);


// Statistics
router.get(
    "/stats",
    authenticate,
    authorize("admin", "manager"),
    expenseController.getExpenseStatistics
);


// Get Expense By ID
router.get(
    "/:id",
    authenticate,
    authorize("admin", "manager"),
    expenseController.getExpense
);


// Update Expense
router.put(
    "/:id",
    authenticate,
    authorize("admin", "manager"),
    createExpenseValidation,
    validate,
    expenseController.updateExpense
);


// Delete Expense
router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    expenseController.deleteExpense
);

module.exports = router;