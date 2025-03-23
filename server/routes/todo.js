const express = require('express')
const { query } = require('../helpers/db.js')

const todoRouter = express.Router()

todoRouter.post("/new", async (req, res) => {
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
  
  todoRouter.delete("/delete/:id", async (req, res) => {
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
  
  
  todoRouter.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  