const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/database", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW() AS currentTime");

    res.status(200).json({
      success: true,
      message: "Database connected successfully.",
      data: rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed.",
      error: error.message,
    });
  }
});

module.exports = router;