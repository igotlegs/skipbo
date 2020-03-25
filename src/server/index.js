const express = require('express')
const app = express()
const port = 3001

app.get('/deck', (req, res) => {
  res.json({
    size: 25,
    topMostCard: 4,
  })
})

app.listen(port, () => console.log(`Game server started, port: ${port}`))