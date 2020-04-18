import Game from './game/game'
import Player from './game/player'

export function setIdentity(req, game, player) {
  if(!game instanceof Game || !player instanceof Player) {
    const errBase = 'game and player must be instances of classes Game and Player respectively!'
    const errDetail = ` Got: ${game} and ${player}.`
    throw new Error(errBase + errDetail)
  }

  req.session.data = {}
  req.session.data.gameId = game.getId()
  req.session.data.playerId = player.getId()
}

export function getIdentity(req) {
  return req.session.data
}
