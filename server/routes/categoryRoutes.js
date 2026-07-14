const express = require("express");

const router = express.Router();

const categoryController =
require("../controllers/categoryController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

router.get(
    "/",
    authenticate,
    authorize("admin", "manager", "cashier"),
    categoryController.getCategories
);

router.get(
    "/:id",
    authenticate,
    authorize("admin", "manager", "cashier"),
    categoryController.getCategory
);

module.exports = router;