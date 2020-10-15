import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import responseFormatter from 'express-response-formatter'
import { isProd, } from '../shared/utils'
import setupSession from './session/setup'
import WsConnectionManager from './websockets/ws-connection-manager'

function setupEnvironment(app, server) {
  setMiddleware(app)
  setupLogging(app)
  setupConnectionManager(server, setupSession(app))
}

function setMiddleware(app) {
  app.use(responseFormatter())
  app.use(express.json())

  if(isProd()) {
    app.use(helmet())
    app.use(compression())
    app.use(express.static('build'))
  }
}

function setupLogging(app) {
  const logLevel = isProd() ? 'combined' : 'dev'
  app.use(morgan(logLevel))
}

function setupConnectionManager(server, sessionParser) {
  WsConnectionManager(server, sessionParser)
}

export default setupEnvironment
