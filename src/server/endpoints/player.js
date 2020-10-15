import express from 'express'
import { findFromRegistry, } from '../game/registry'
import Player from '../game/player'
import GameRules from '../../shared/game-rules'
import { 
  getSessionData, 
  setPlayerIdToSession,
  setGameIdToSession,
  sessionIdentityOk,
} from '../session/session-handlers'

const ERR_GAME_ID = 'gameId must be a non empty string!'
const ERR_ADD_JOIN_PLAYER = 'ERR_ADD_JOIN_PLAYER'
const ERR_GET_HAND = 'ERR_GET_HAND'

function player() {
  const router = express.Router()
  
  router.post('/player', (req, res) => {
    if(typeof req.body.gameId !== 'string' || req.body.gameId.length === 0) {
      res.formatter.badRequest([ERR_GAME_ID])
      return
    }
    
    try {
      const game = findFromRegistry(req.body.gameId)
      const playerDeck = game.dealFromGameDeck(GameRules.PLAYER_DECK_SIZE)
      const player = new Player(req.body.playerName, playerDeck)
      
      game.addPlayer(player)
      setPlayerIdToSession(player.getId(), req.session)
      setGameIdToSession(game.getId(), req.session)

      res.formatter.ok({
        id: player.getId(),
        name: player.getName(),
        deckTopMostCard: player.getTopMostCardFromDeck(),
        deckSize: player.getDeckSize(),
      })
    } catch(e) {
      console.log(e)
      res.formatter.badRequest([ERR_ADD_JOIN_PLAYER])
    }
  })
  .get('/player/my-hand', (req, res) => {
    if(!sessionIdentityOk(req.session)) {
      res.formatter.badRequest([ERR_GET_HAND])
      return
    }

    try {
      const identity = getSessionData(req.session)
      const game = findFromRegistry(identity.gameId)
      const player = game.getPlayer(identity.playerId)

      res.formatter.ok({
        hand: player.getHand(),
      })
    } catch(e) {
      console.log(e)
      res.formatter.badRequest([ERR_GET_HAND])
    }
  })

  return router
}

export default player
