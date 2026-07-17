const express = require("express");

const router = express.Router();

const purchaseController = require("../controllers/purchaseController");

const {
    createPurchaseValidation
} = require("../validators/purchaseValidation");

const validate = require("../middleware/validate");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
    "/",
    authenticate,
    authorize("admin", "manager"),
    createPurchaseValidation,
    validate,
    purchaseController.createPurchase
);

module.exports = router;