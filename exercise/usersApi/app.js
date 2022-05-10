const express = require('express')
const app = express()

const port = 5500
const host = '127.0.0.1'

const userRoutes = require('./routes/userRoutes')

app.use(express.json()) // to get body in JSON
app.use(userRoutes) // to use separated routes in other files

app.listen(port, host, () => console.log(`Server started in http://${host}:${port}`))