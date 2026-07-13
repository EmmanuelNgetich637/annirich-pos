const express = require("express");

const {
    createProductValidation,
    validate
} = require("../validators/productValidator");

const router = express.Router();

const productController = require("../controllers/productController");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

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

module.exports = router;