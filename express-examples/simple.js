const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World! Welcome to home page')
})

// add more methods here...