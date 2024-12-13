const pool = require('../config/db')

const getAllTransactionByUserId= async (id, name, email, no_rek, no_hp, password, saldo) => {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2,no_rek = $3, no_hp = $4, password = $4, saldo = $5 WHERE id = $6 RETURNING *",
      [name, email, no_rek, no_hp, password, saldo, id]
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