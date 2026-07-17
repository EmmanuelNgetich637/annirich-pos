const express = require("express");

const router = express.Router();


const saleController =
require("../controllers/saleController");


const authenticate =
require("../middleware/authMiddleware");


const authorize =
require("../middleware/roleMiddleware");



// CREATE SALE

router.post(
    "/",
    authenticate,
    authorize(
        "admin",
        "manager",
        "cashier"
    ),
    saleController.createSale
);



// GET ALL SALES

router.get(
    "/",
    authenticate,
    authorize(
        "admin",
        "manager",
        "cashier"
    ),
    saleController.getSales
);



// SEARCH

router.get(
    "/search",
    authenticate,
    authorize(
        "admin",
        "manager",
        "cashier"
    ),
    saleController.searchSales
);



// PAGINATION

router.get(
    "/page/list",
    authenticate,
    authorize(
        "admin",
        "manager",
        "cashier"
    ),
    saleController.getSalesPaginated
);



// STATISTICS

router.get(
    "/stats",
    authenticate,
    authorize(
        "admin",
        "manager"
    ),
    saleController.getSaleStatistics
);



// GET BY ID

router.get(
    "/:id",
    authenticate,
    authorize(
        "admin",
        "manager",
        "cashier"
    ),
    saleController.getSale
);



module.exports = router;