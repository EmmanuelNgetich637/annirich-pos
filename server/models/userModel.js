const db = require("../config/db");

const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return rows[0];
};

const findUserByUsername = async (username) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  return rows[0];
};

const createUser = async (user) => {
  const {
    full_name,
    username,
    email,
    password,
    role
  } = user;

  const [result] = await db.query(
    `INSERT INTO users
    (full_name, username, email, password, role)
    VALUES (?, ?, ?, ?, ?)`,
    [full_name, username, email, password, role]
  );

  return result.insertId;
};

module.exports = {
  findUserByEmail,
  findUserByUsername,
  createUser
};