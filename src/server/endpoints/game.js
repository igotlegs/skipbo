import express from 'express'
import Game from '../game/game'
import { addToRegistry, findFromRegistry, } from '../game/registry'
import { 
  getSessionData, 
  sessionIdentityOk, 
  setGameIdToSession,
} from '../session/session-handlers'

const ERR_GET_GAME = 'ERR_GET_GAME'
const ERR_CREATE_GAME = 'ERR_CREATE_GAME'
const ERR_DEAL_FROM_DECK = 'ERR_DEAL_FROM_DECK'

function game() {
  const router = express.Router()
  
  router
  .get('/game/:gameId', (req, res) => {
    const game = findFromRegistry(req.params.gameId)
    
    if(!game) {
      res.formatter.badRequest([ERR_GET_GAME])
      return
    }
    if(!gameWaitsForPlayersOrPlayerHasSession(game, req.session)) {
      res.formatter.badRequest([ERR_GET_GAME])
      return
    }

    setGameIdToSession(req.params.gameId, req.session)
    const players = Object.values(game.getPlayers()).map((player) => {
      return {
        id: player.getId(),
        name: player.getName(),
      }
    })

    res.formatter.ok({
      id: game.getId(),
      players,
      playerCount: game.getPlayerCount(),
    })
  })
  .post('/game', (req, res) => {
    try {
      const game = new Game(req.body.playerCount)
      addToRegistry(game)
      setGameIdToSession(game.getId(), req.session)

      res.formatter.ok({
        id: game.getId(),
        playerCount: game.getPlayerCount(),
      })
    } catch(e) {
      console.log(e)
      res.formatter.badRequest([ERR_CREATE_GAME])
    }
  })
  .put('/game/deck', (req, res) => {
    let errors = false
    
    if(!sessionIdentityOk(req.session)) {
      errors = true
    }
    if(!Number.isInteger(req.body.numOfCards) && req.body.numOfCards < 1) {
      errors = true
    }
    if(errors) {
      res.formatter.badRequest([ERR_GET_HAND])
      return
    }

    const identity = getSessionData(req.session)
    const game = findFromRegistry(identity.gameId)
    const player = game.getPlayer(identity.playerId)

    try {
      const cards = game.dealFromGameDeck(req.body.numOfCards)
      player.addCardsToHand(cards)

      res.formatter.ok({
        cards: player.getHand(),
      })
    } catch(e) {
      console.log(e)
      res.formatter.badRequest([ERR_DEAL_FROM_DECK])
    }
  })

  return router
}

function gameWaitsForPlayersOrPlayerHasSession(game, session) {
  const waitsForPlayers = Object.values(game.getPlayers()).length < game.getPlayerCount()
  return waitsForPlayers || sessionIdentityOk(session)
}

export default game
