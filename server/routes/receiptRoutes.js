const express = require("express");

const router = express.Router();

const receiptController =
require("../controllers/receiptController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

/*
|--------------------------------------------------------------------------
| Get Receipt By Sale ID
|--------------------------------------------------------------------------
*/

router.get(
    "/:saleId",
    authenticate,
    authorize(
        "admin",
        "manager",
        "cashier"
    ),
    receiptController.getReceiptBySaleId
);

module.exports = router;