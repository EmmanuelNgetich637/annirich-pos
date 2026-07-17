const express = require("express");

const router = express.Router();

const purchaseController =
require("../controllers/purchaseController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
    createPurchaseValidation,
    validate
} = require("../validators/purchaseValidation");


// Get all purchases
router.get(
    "/",
    authenticate,
    authorize("admin", "manager", "cashier"),
    purchaseController.getPurchases
);


// Search purchases
router.get(
    "/search",
    authenticate,
    authorize("admin", "manager", "cashier"),
    purchaseController.searchPurchases
);


// Pagination
router.get(
    "/page/list",
    authenticate,
    authorize("admin", "manager", "cashier"),
    purchaseController.getPurchasesPaginated
);


// Statistics
router.get(
    "/stats",
    authenticate,
    authorize("admin", "manager"),
    purchaseController.getPurchaseStatistics
);


// Get purchase by ID
router.get(
    "/:id",
    authenticate,
    authorize("admin", "manager", "cashier"),
    purchaseController.getPurchase
);


// Create purchase
router.post(
    "/",
    authenticate,
    authorize("admin", "manager"),
    createPurchaseValidation,
    validate,
    purchaseController.createPurchase
);


module.exports = router;