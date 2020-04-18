import express from 'express'
import Game from '../game/game'
import { addToRegistry, findFromRegistry, } from '../game/registry'
import { getIdentity, } from '../session-handlers'

const ERR_CREATE_GAME = 'ERR_CREATE_GAME'
const ERR_DEAL_FROM_DECK = 'ERR_DEAL_FROM_DECK'

function game() {
  const router = express.Router()
  
  router.post('/game', (req, res) => {
    try {
      const game = new Game(req.body.playerCount)
      addToRegistry(game)

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
    const identity = getIdentity(req)

    if(!identity) {
      errors = true
    }
    if(!Number.isInteger(req.body.numOfCards) && req.body.numOfCards < 1) {
      errors = true
    }
    if(errors) {
      res.formatter.badRequest([ERR_GET_HAND])
      return
    }

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

export default game
