import express from 'express'
import http from 'http'
import setupEnvironment from './setup-environment'
import setupEndpoints from './setup-endpoints'

const app = express()
const server = http.createServer(app)
const port = 3001

setupEnvironment(app, server)
setupEndpoints(app)

server.listen(port, () => {
  const startMsg = `Game server started on port: ${port} \nReady to play?`
  console.log(startMsg)
})
