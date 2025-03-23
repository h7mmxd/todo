require('dotenv').config()
console.log(process.env)

const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = process.env

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Connected to database');
    release();
  }
});

app.get("", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM task');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/new", async (req, res) => {
  try {
    const result = await pool.query(
      'INSERT INTO task (description) VALUES ($1) RETURNING *',
      [req.body.description]
    );
    res.status(200).json({ id: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    
    try {
        // Use the pool object directly to run the query
        const result = await pool.query('DELETE FROM task WHERE id = $1', [id]);
        
        if (result.rowCount > 0) {
            res.status(200).json({ id: id });
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
