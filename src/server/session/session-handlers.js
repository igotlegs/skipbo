import { findFromRegistry, } from '../game/registry'

export function setPlayerIdToSession(playerId, session) {
  if(!session) {
    throw new Error(`Expected session! Got: ${session}`)
  }
  session.data = session.data || {}
  session.data.playerId = playerId
}

export function setGameIdToSession(gameId, session) {
  if(!session) {
    throw new Error(`Expected session! Got: ${session}`)
  }
  session.data = session.data || {}
  session.data.gameId = gameId
}

export function getSessionData(session) {
  if(!session) return {}

  return session.data !== undefined ?
    session.data :
    {}
}

export function sessionIdentityOk(session) {
  const { gameId, playerId, } = getSessionData(session)

  if(gameId && playerId) {
    const game = findFromRegistry(gameId)

    if(game) {
      const player = game.getPlayer(playerId)

      if(player) {
        return true
      }
    }
  }
  return false
}
