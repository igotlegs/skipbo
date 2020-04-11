const shortid = require('shortid')
const deck = require('./deck')
const gamePlayers = require('./players')

const PLAYER_DECK_SIZE = 25
const gameRegistry = {}

function create(playerCount) {
  const id = shortid.generate()
  let gameDeck = deck.shuffle(deck.generate())
  const players = gamePlayers.create(playerCount)
  
  players.forEach((player) => {
    const result = deck.deal(gameDeck, PLAYER_DECK_SIZE)

    gameDeck = result[1]
    player.setDeck(result[0])
  })
   
  gameRegistry[id] = {
    id,
    playerCount,
    gameDeck,
    players,
  }

  return id
}

module.exports = {
  create,
}
