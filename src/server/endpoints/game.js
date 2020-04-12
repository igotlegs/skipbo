const express = require('express')
const Game = require('../game/game')
const GameRegistry = require('../game/registry')

const ERR_CREATE_GAME = 'ERR_CREATE_GAME'

function game() {
  const router = express.Router()
  
  router.post('/game', (req, res) => {
    try {
      const game = new Game(req.body.playerCount)
      GameRegistry.add(game)

      res.formatter.ok({
        id: game.getId(),
        playerCount: game.getPlayerCount(),
      })
    } catch(e) {
      console.log(e)
      res.formatter.badRequest([ERR_CREATE_GAME])
    }
  })

  return router
}

module.exports = game
