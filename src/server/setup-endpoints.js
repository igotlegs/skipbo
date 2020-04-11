const endpoints = require('./endpoints')

function setupEndpoints(app) {
  endpoints.map((endpoint) => app.use('/api', endpoint.call(null)))
}

module.exports = setupEndpoints
