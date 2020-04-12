const shortid = require('shortid')

class Player {
  constructor(name, deck) {
    this._id = shortid.generate()
    this._name = this._checkName(name)
    this._deck = this._checkDeck(deck)
    this._hand = []
  }

  static get PLAYER_DECK_SIZE() {
    return 25
  }

  static get PLAYER_HAND_SIZE() {
    return 5
  }

  _checkName(name) {
    if(typeof name === 'string' && name.length >= 3) {
      return name
    }
    throw new Error(`Name must string with minimum length of 3! Got: ${name}`)
  }

  _checkDeck(deck) {
    if(Array.isArray(deck) && deck.length === Player.PLAYER_DECK_SIZE) {
      return deck
    }
    throw new Error(`Deck must be an array of size ${Player.PLAYER_DECK_SIZE}! Got: ${deck}`)
  }

  getId() {
    return this._id
  }

  getName() {
    return this._name
  }

  setDeck(deck) {
    this._deck = this._checkDeck(deck)
  }

  getDeck() {
    return [].concat(this._deck)
  }

  addCardsToHand(cards) {
    if(Array.isArray(cards) && cards.length > 0) {
      if(this._hand.length + cards.length === Player.PLAYER_HAND_SIZE) {
        this._hand = this._hand.concat(cards)
      }
      const errBase = 'Player hand must hold 5 cards! '
      const errDetail = `Current player hand: ${this._hand.length}, tried to add: ${cards.length} cards.`
      throw new Error(errBase + errDetail)
    }
    throw new Error(`Cards must be a non empty array! Got: ${cards}`)
  }

  getTopMostCardFromDeck() {
    return this._deck[0]
  }
}

module.exports = Player
