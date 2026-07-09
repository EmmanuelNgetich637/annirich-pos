const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const testRoutes = require("./routes/testRoutes");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Annirich Hardware POS API"
  });
});

// Port
const PORT = process.env.PORT || 5000;
app.use("/api/test", testRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});