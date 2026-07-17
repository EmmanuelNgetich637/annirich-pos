const express = require("express");

const router = express.Router();

const customerController =
require("../controllers/customerController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

router.get(
    "/",
    authenticate,
    authorize("admin", "manager", "cashier"),
    customerController.getCustomers
);

module.exports = router;