import express from 'express'
import responseFormatter from 'express-response-formatter'
import setupEnvironment from './setup-endpoints'
import setupEnvironment from './setup-environment'

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
