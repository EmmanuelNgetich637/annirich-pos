const express = require("express");

const {
    createProductValidation,
    updateProductValidation,
    validate
} = require("../validators/productValidator");

const router = express.Router();

const productController = require("../controllers/productController");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get(
    "/search",
    authenticate,
    authorize("admin", "manager", "cashier"),
    productController.searchProducts
);

router.get(
    "/",
    authenticate,
    authorize("admin", "manager", "cashier"),
    productController.getProducts
);

router.get(
    "/:id",
    authenticate,
    authorize("admin", "manager", "cashier"),
    productController.getProduct
);

router.post(
    "/",
    authenticate,
    authorize("admin", "manager"),
    createProductValidation,
    validate,
    productController.createProduct
);

router.put(
    "/:id",
    authenticate,
    authorize("admin", "manager"),
    updateProductValidation,
    validate,
    productController.updateProduct
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    productController.deleteProduct
);

module.exports = router;