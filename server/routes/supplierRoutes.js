const express = require("express");

const router = express.Router();

const supplierController =
require("../controllers/supplierController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
    createSupplierValidation,
    validate
} = require("../validators/supplierValidator");

router.get(
    "/",
    authenticate,
    authorize("admin", "manager", "cashier"),
    supplierController.getSuppliers
);

router.get(
    "/:id",
    authenticate,
    authorize("admin", "manager", "cashier"),
    supplierController.getSupplier
);

router.post(
    "/",
    authenticate,
    authorize("admin", "manager"),
    createSupplierValidation,
    validate,
    supplierController.createSupplier
);

router.put(
    "/:id",
    authenticate,
    authorize("admin", "manager"),
    createSupplierValidation,
    validate,
    supplierController.updateSupplier
);

module.exports = router;