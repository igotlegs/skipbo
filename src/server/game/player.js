import shortid from 'shortid'
import {
  validateAddingCardsToPlayerHand,
} from '../../shared/game-validations'
import GameRules from '../../shared/game-rules'

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
    const [success, errMsg] = validateAddingCardsToPlayerHand(cards, this._hand)
    
    if(success) {
      this._hand = this._hand.concat(cards)
    } else {
      throw new Error(errMsg)
    }
  }

  getTopMostCardFromDeck() {
    return this._deck[0]
  }
}

export default Player