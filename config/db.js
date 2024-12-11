const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host:'localhost',
  database: "BSI",
  password: "bsi",
  port: 5432, 
});

module.exports = pool;
