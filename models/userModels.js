// models/userModel.js
const pool = require("../config/db");

const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const getUserById = async (id) => {
    
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

const createUser = async (name, email, no_rek, no_hp, password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, no_rek, no_hp, password, saldo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, email, no_rek, no_hp, password, 0]
  );
  return result.rows[0];
};

const updateUser = async (id, name, email, no_rek, no_hp, password, saldo) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2,no_rek = $3, no_hp = $4, password = $4, saldo = $5 WHERE id = $6 RETURNING *",
    [name, email, no_rek, no_hp, password, saldo, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
