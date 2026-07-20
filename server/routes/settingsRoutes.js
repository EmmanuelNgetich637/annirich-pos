const express = require("express");

const router = express.Router();

const settingsController =
require("../controllers/settingsController");

const authenticate =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const validate =
require("../middleware/validate");

const {
    saveSettingsValidation
} = require("../validators/settingsValidator");

/*
|--------------------------------------------------------------------------
| Get Settings
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    authenticate,
    authorize("admin", "manager"),
    settingsController.getSettings
);

/*
|--------------------------------------------------------------------------
| Save Settings
|--------------------------------------------------------------------------
*/

router.put(
    "/",
    authenticate,
    authorize("admin"),
    saveSettingsValidation,
    validate,
    settingsController.saveSettings
);

module.exports = router;
