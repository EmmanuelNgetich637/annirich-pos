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

const upload = require("../middleware/uploadMiddleware");

router.get(
    "/search",
    authenticate,
    authorize("admin", "manager", "cashier"),
    productController.searchProducts
);

router.get(
    "/page/list",
    authenticate,
    authorize("admin", "manager", "cashier"),
    productController.getProductsPaginated
);

router.get(
    "/low-stock",
    authenticate,
    authorize("admin", "manager"),
    productController.getLowStockProducts
);

router.get(
    "/stats",
    authenticate,
    authorize("admin", "manager"),
    productController.getProductStatistics
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

router.post(
    "/:id/upload",
    authenticate,
    authorize("admin", "manager"),
    upload.single("image"),
    productController.updateProductImage
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