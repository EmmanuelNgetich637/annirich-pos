const express = require("express");

const router = express.Router();

const supplierController =
require("../controllers/supplierController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

router.get(
    "/",
    authenticate,
    authorize("admin", "manager", "cashier"),
    supplierController.getSuppliers
);

module.exports = router;