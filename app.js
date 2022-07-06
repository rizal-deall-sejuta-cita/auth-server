require('dotenv').config()
const express = require('express')

const routes = require("./routes/index")
const { connectDb } = require('./config/db');

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

try {
    connectDb()
} catch (err) {
    console.log(err);
}

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})