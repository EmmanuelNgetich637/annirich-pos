const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register User
const register = async (data) => {
  // Check if email already exists
  const existingUser = await User.findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const userId = await User.createUser({
    ...data,
    password: hashedPassword,
  });

  return userId;
};

// Login User
const login = async (username, password) => {
  // Find user
  const user = await User.findUserByUsername(username);

  if (!user) {
    throw new Error("Invalid username or password");
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  register,
  login,
};