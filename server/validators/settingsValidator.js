const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Save Settings Validation
|--------------------------------------------------------------------------
*/

const saveSettingsValidation = [

    body("business_name")
        .notEmpty()
        .withMessage("Business name is required.")
        .isLength({ max: 150 })
        .withMessage("Business name cannot exceed 150 characters."),

    body("phone")
        .optional()
        .isLength({ max: 20 })
        .withMessage("Phone number cannot exceed 20 characters."),

    body("email")
        .optional({ nullable: true, checkFalsy: true })
        .isEmail()
        .withMessage("Invalid email address."),

    body("address")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Address is too long."),

    body("receipt_footer")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Receipt footer is too long.")

];

module.exports = {
    saveSettingsValidation
};