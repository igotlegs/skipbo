import redis from 'redis'
import RedisStore from 'connect-redis'
import session from 'express-session'
import { isProd, } from '../../shared/utils'

function setup(app) {
  return setupSessionHandling(app)
}

function createSessionStore() {
  const SessionStore = RedisStore(session)
  const redisClient = redis.createClient()
  return new SessionStore({
    client: redisClient
  }) 
}

function setupSessionHandling(app) {
  if(isProd()) {
    throw new Error('Session handling for production is not implemented!')
  }

  const store = createSessionStore()
  
  const sessionParser = session({
    secret: 'super weasel',
    resave: false,
    saveUninitialized: true,
    store,
  })

  app.use(sessionParser)
  return sessionParser
}

export default setup
