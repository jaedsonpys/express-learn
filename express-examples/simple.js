const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/send', (req, res) => {
    var data = req.body
    res.send(`You send: ${data}`)
})