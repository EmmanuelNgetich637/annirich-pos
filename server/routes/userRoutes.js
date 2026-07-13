const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get(
    "/profile",
    authenticate,
    (req, res) => {

        res.json({
            success: true,
            user: req.user
        });

    }
);

router.get(
    "/admin",
    authenticate,
    authorize("admin"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Admin"
        });

    }
);

router.get(
    "/manager",
    authenticate,
    authorize("admin", "manager"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Manager"
        });

    }
);

router.get(
    "/cashier",
    authenticate,
    authorize("admin", "manager", "cashier"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Cashier"
        });

    }
);

module.exports = router;