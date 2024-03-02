require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

app.user(cors())

const port = process.env.port

app.listen(port, () => {
   console.log('http://localhost:${port}')
})
