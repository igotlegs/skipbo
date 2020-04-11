const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')

function setupEnvironment(app) {
  if(isProd()) {
    app.use(helmet())
    app.use(compression())
    app.use(express.static('build'))
  }
  
  setupLogging(app)
}

function setupLogging(app) {
  const logLevel = isProd() ? 'combined' : 'dev'
  app.use(morgan(logLevel))
}

function isProd() {
  return process.env.NODE_ENV === 'production'
}

module.exports = setupEnvironment
