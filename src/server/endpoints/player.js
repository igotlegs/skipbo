const express = require('express')
const GameRegistry = require('../game/registry')
const Player = require('../game/player')

const ERR_GAME_ID = 'gameId must be a non empty string!'
const ERR_ADD_JOIN_PLAYER = 'ERR_ADD_JOIN_PLAYER'

function player() {
  const router = express.Router()
  
  router.post('/player', (req, res) => {
    if(typeof req.body.gameId !== 'string' || req.body.gameId.length === 0) {
      res.formatter.badRequest([ERR_GAME_ID])
      return
    }
    
    try {
      const game = GameRegistry.findById(req.body.gameId)
      const playerDeck = game.dealFromGameDeck(Player.PLAYER_DECK_SIZE)
      const player = new Player(req.body.playerName, playerDeck)
      
      game.addPlayer(player)
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

  return router
}

module.exports = player
