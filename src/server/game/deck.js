import shortid from 'shortid'

const NUM_OF_DECKS = 12
const SKIP_BO_VALUE = 0
const NUM_OF_SKIPBOS = 18

const CARD_VALUES = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
]

const Deck = {

  generate: () => {
    let generated = []

    for (let i = 0; i < NUM_OF_DECKS; i++) {
      generated = generated.concat(CARD_VALUES)
    }

    for (let i = 0; i < NUM_OF_SKIPBOS; i++) {
      generated.push(SKIP_BO_VALUE)
    }  
    
    const cards = generated.map((number) => ({number, id: shortid.generate()}))
    return cards
  },

  shuffle: (cards) => {
    let copy = []
    let j, x, i

    cards.forEach((card) => {
      copy.push(Object.assign({}, card))
    })

    for (i = copy.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = copy[i]
      copy[i] = copy[j]
      copy[j] = x
    }

    return copy
  },

  deal: (deck, numOfCards) => {
    const part = []
    const rest = []

    for (let i = 0; i < numOfCards; i++) {
      part.push(Object.assign({}, deck[i]))
    }

    for (let i = numOfCards; i < deck.length; i++) {
      rest.push(Object.assign({}, deck[i]))
    }

    return [part, rest]
  }
}

export default Deck
