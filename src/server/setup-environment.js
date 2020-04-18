import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'

function setupEnvironment(app) {
  if(isProd()) {
    app.use(helmet())
    app.use(compression())
    app.use(express.static('build'))
  }
  
  setupLogging(app)
  setupSessionHandling(app)
}

function setupLogging(app) {
  const logLevel = isProd() ? 'combined' : 'dev'
  app.use(morgan(logLevel))
}

function setupSessionHandling(app) {
  if(isProd()) {
    console.log('prod session not implemented!')
    return 
  }

  app.use(session({
    secret: 'super weasel',
    resave: false,
    saveUninitialized: false,
  }))
}

function isProd() {
  return process.env.NODE_ENV === 'production'
}

export default setupEnvironment
