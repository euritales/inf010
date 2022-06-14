const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

// pool.query("SELECT * FROM compras WHERE id = $1 and $1 = true", [1, "arroz"]);

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = {
  query,
};
