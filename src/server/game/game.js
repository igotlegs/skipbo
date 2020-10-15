import shortid from 'shortid'
import Deck from './deck'
import GameRules from '../../shared/game-rules'

class Game {
  constructor(playerCount) {
    this._id = shortid.generate()
    this._playerCount = this._checkPlayerCount(playerCount)
    this._deck = Deck.shuffle(Deck.generate())
    this._players = {}
  }  

  _checkPlayerCount(playerCount) {
    if(Number.isInteger(playerCount) && 
      playerCount >= GameRules.MIN_PLAYERS && playerCount <= GameRules.MAX_PLAYERS) {
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

  getPlayer(id) {
    return this._players[id] ?
      this._players[id] :
      null
  }

  getPlayers() {
    return this._players
  }

  getPlayerCount() {
    return this._playerCount
  }

  dealFromGameDeck(numOfCards) {
    if(!Number.isInteger(numOfCards) || numOfCards < 1) {
      throw new Error(`numOfCards must be greater than 0. Got ${numOfCards}`)
    }
    if(numOfCards > this._deck.length) {
      throw new Error(`numOfCards must be less than deck size. Deck size: ${this._deck.length}, got: ${numOfCards}`)
    }

    const cards = this._deck.slice(0, numOfCards)
    this._deck = this._deck.slice(numOfCards - 1, this._deck.length)
    return cards
  }
}

export default Game
