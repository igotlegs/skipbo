import shortid from 'shortid'
import GameRules from '../../shared/GameRules'

class Player {
  constructor(name, deck) {
    this._id = shortid.generate()
    this._name = this._checkName(name)
    this._deck = this._checkDeck(deck)
    this._hand = []
  }

  _checkName(name) {
    if(typeof name === 'string' && name.length >= GameRules.MIN_PLAYER_NAME_LENGTH) {
      return name
    }
    throw new Error(`Name must string with minimum length of 3! Got: ${name}`)
  }

  _checkDeck(deck) {
    if(Array.isArray(deck) && deck.length === GameRules.PLAYER_DECK_SIZE) {
      return deck
    }
    throw new Error(`Deck must be an array of size ${GameRules.PLAYER_DECK_SIZE}! Got: ${deck}`)
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

  getDeckSize() {
    return this._deck.length
  }

  getHand() {
    return this._hand
  }

  addCardsToHand(cards) {
    if(Array.isArray(cards) && cards.length > 0) {
      if(this._hand.length + cards.length === GameRules.PLAYER_HAND_SIZE) {
        this._hand = this._hand.concat(cards)
        return
      }
      const errBase = 'Player hand must hold max. 5 cards! '
      const errDetail = `Current player hand: ${this._hand.length}, tried to add: ${cards.length} cards.`
      throw new Error(errBase + errDetail)
    }
    throw new Error(`Cards must be a non empty array! Got: ${cards}`)
  }

  getTopMostCardFromDeck() {
    return this._deck[0]
  }
}

export default Player