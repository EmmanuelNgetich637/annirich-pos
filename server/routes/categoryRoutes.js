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
    "/search",
    authenticate,
    authorize("admin", "manager", "cashier"),
    categoryController.searchCategories
);

router.get(
    "/page/list",
    authenticate,
    authorize("admin", "manager", "cashier"),
    categoryController.getCategoriesPaginated
);

router.get(
    "/stats",
    authenticate,
    authorize("admin", "manager"),
    categoryController.getCategoryStatistics
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

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    categoryController.deleteCategory
);

module.exports = router;