const shortid = require('shortid')
const deck = require('./deck')

class Game {
  constructor(playerCount) {
    this._id = shortid.generate()
    this._playerCount = this._checkPlayerCount(playerCount)
    this._deck = deck.shuffle(deck.generate())
    this._players = {}
  }  

  static get MIN_PLAYERS() {
    return 2
  }

  static get MAX_PLAYERS() {
    return 4
  }

  _checkPlayerCount(playerCount) {
    if(Number.isInteger(playerCount) && 
      playerCount >= Game.MIN_PLAYERS && playerCount <= Game.MAX_PLAYERS) {
      return playerCount
    }
    throw new Error(`playerCount must be an integer and range from 2 to 4! Got: ${playerCount}`)
  }

  getId() {
    return this._id
  }

  addPlayer(player) {
    if(Object.keys(this._players).length === this._playerCount) {
      throw new Error(`Cannot add player to game, game's player count has been reached already!`)
    }
    
    const id = player.getId()
    this._players[id] = player
  }

  getPlayerCount() {
    return this._playerCount
  }

  dealFromGameDeck(numOfCards) {
    if(numOfCards < 1) {
      throw new Error(`numOfCards must be greater than 1. Got ${numOfCards}`)
    }
    if(numOfCards > this._deck.length) {
      throw new Error(`numOfCards must be less than deck size. Deck size: ${this._deck.length}, got: ${numOfCards}`)
    }

    const cards = this._deck.slice(0, numOfCards)
    this._deck = this._deck.slice(numOfCards - 1, this._deck.length)
    return cards
  }
}

module.exports = Game
