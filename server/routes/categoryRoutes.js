const express = require("express");

const router = express.Router();

const categoryController =
require("../controllers/categoryController");

const {
    createCategoryValidation,
    updateCategoryValidation,
    validate
} = require("../validators/categoryValidator");

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

router.post(
    "/",
    authenticate,
    authorize("admin", "manager"),
    createCategoryValidation,
    validate,
    categoryController.createCategory
);

router.put(
    "/:id",
    authenticate,
    authorize("admin", "manager"),
    updateCategoryValidation,
    validate,
    categoryController.updateCategory
);

module.exports = router;