const endpoints = require('./endpoints')

const API_BASE_PATH = '/api'

function setupEndpoints(app) {
  endpoints.map((endpoint) => app.use(API_BASE_PATH, endpoint.call(null)))
}

module.exports = setupEndpoints
