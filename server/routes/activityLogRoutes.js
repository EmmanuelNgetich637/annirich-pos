const express = require("express");

const router = express.Router();

const activityLogController =
require("../controllers/activityLogController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");


/*
|--------------------------------------------------------------------------
| Create Activity Log
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authenticate,
    authorize(
        "admin",
        "manager"
    ),
    activityLogController.createLog
);


/*
|--------------------------------------------------------------------------
| Get All Activity Logs
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    authenticate,
    authorize(
        "admin",
        "manager"
    ),
    activityLogController.getAllLogs
);


/*
|--------------------------------------------------------------------------
| Get Logs By User
|--------------------------------------------------------------------------
*/

router.get(
    "/user/:id",
    authenticate,
    authorize(
        "admin",
        "manager"
    ),
    activityLogController.getLogsByUser
);


module.exports = router;