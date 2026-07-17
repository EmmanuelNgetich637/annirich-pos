const express = require("express");

const router = express.Router();

const supplierController = require("../controllers/supplierController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    createSupplierValidation,
    validate
} = require("../validators/supplierValidator");

/*
|--------------------------------------------------------------------------
| Supplier Routes
|--------------------------------------------------------------------------
*/

// Get all suppliers
router.get(
    "/",
    authenticate,
    authorize("admin", "manager", "cashier"),
    supplierController.getSuppliers
);

// Search suppliers
router.get(
    "/search",
    authenticate,
    authorize("admin", "manager", "cashier"),
    supplierController.searchSuppliers
);

// Paginated suppliers
router.get(
    "/page/list",
    authenticate,
    authorize("admin", "manager", "cashier"),
    supplierController.getSuppliersPaginated
);

// Supplier statistics
router.get(
    "/stats",
    authenticate,
    authorize("admin", "manager"),
    supplierController.getSupplierStatistics
);

// Get supplier by ID
router.get(
    "/:id",
    authenticate,
    authorize("admin", "manager", "cashier"),
    supplierController.getSupplier
);

// Create supplier
router.post(
    "/",
    authenticate,
    authorize("admin", "manager"),
    createSupplierValidation,
    validate,
    supplierController.createSupplier
);

// Update supplier
router.put(
    "/:id",
    authenticate,
    authorize("admin", "manager"),
    createSupplierValidation,
    validate,
    supplierController.updateSupplier
);

// Soft delete supplier
router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    supplierController.deleteSupplier
);

module.exports = router;