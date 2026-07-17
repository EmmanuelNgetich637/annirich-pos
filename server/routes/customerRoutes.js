const express = require("express");

const router = express.Router();

const customerController =
require("../controllers/customerController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
    createCustomerValidation,
    validate
} = require("../validators/customerValidator");

router.get(
    "/search",
    authenticate,
    authorize("admin", "manager", "cashier"),
    customerController.searchCustomers
);

router.get(
    "/",
    authenticate,
    authorize("admin", "manager", "cashier"),
    customerController.getCustomers
);

router.get(
    "/:id",
    authenticate,
    authorize("admin", "manager", "cashier"),
    customerController.getCustomer
);

router.post(
    "/",
    authenticate,
    authorize("admin", "manager", "cashier"),
    createCustomerValidation,
    validate,
    customerController.createCustomer
);

router.put(
    "/:id",
    authenticate,
    authorize("admin", "manager"),
    createCustomerValidation,
    validate,
    customerController.updateCustomer
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin", "manager"),
    customerController.deleteCustomer
);

module.exports = router;