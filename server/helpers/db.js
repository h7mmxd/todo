require('dotenv').config()
const { Pool } = require('pg')

const query = (sql, values = []) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = openDb()
      const result = await pool.query(sql, values)
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}

const openDb = () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })
  return pool
}
app.get("/", async (req, res) => {
    console.log(query);

    try {
        const result = await query('select * from task');
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});
module.exports = {
  query
}