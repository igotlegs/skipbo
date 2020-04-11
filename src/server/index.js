const express = require('express')
const responseFormatter = require('express-response-formatter').default
const setupEndpoints = require('./setup-endpoints')
const setupEnvironment = require('./setup-environment')

const app = express()
const port = 3001

app.use(responseFormatter())
app.use(express.json())

setupEnvironment(app)
setupEndpoints(app)

app.listen(port, () => {
  const startMsg = `Game server started, port: ${port} \nReady to play?`
  console.log(startMsg)
})
