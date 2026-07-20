const express = require("express");

const router = express.Router();

const dashboardController =
require("../controllers/dashboardController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    authenticate,
    authorize(
        "admin",
        "manager"
    ),
    dashboardController.getDashboard
);

module.exports = router;