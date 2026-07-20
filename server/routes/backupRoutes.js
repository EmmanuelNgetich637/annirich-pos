const express = require("express");

const router = express.Router();

const backupController =
    require("../controllers/backupController");

const authMiddleware =
    require("../middleware/authMiddleware");


// Create database backup
router.post(

    "/create",

    authMiddleware,

    backupController.createBackup

);


// List all backups
router.get(

    "/list",

    authMiddleware,

    backupController.listBackups

);


// Download backup
router.get(

    "/download/:fileName",

    authMiddleware,

    backupController.downloadBackup

);

// Restore database from backup
router.post(

    "/restore/:fileName",

    authMiddleware,

    backupController.restoreBackup

);


module.exports = router;