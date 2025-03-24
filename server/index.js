require('dotenv').config()
// console.log(process.env)

const express = require('express')
const cors = require('cors')
const { todoRouter } = require('./routes/todo.js')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', todoRouter)
const port = process.env.PORT || 3000 







app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
