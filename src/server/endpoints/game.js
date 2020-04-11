const express = require('express')
const getBody = require('./get-body')
const Game = require('../game')

const ERR_PLAYER_COUNT = 'playerCount must be an integer and range from 2 to 4.'

function game() {
  const router = express.Router()
  
  router.post('/game', (req, res) => {
    const body = getBody(req)

    if(!body) {
      res.formatter.badRequest([ERR_PLAYER_COUNT])
      return
    }

    const playerCount = body.playerCount

    if(!Number.isInteger(playerCount) || (playerCount < 2 || playerCount > 4)) {
      res.formatter.badRequest([ERR_PLAYER_COUNT])
      return
    } 

    const game = Game.create(playerCount)
    res.formatter.ok(game)
  })

  return router
}

module.exports = game
