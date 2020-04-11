function create(playerCount) {
  const players = []

  for (let i = 0; i < playerCount; i++) {
    players.push(new Player())
  }
  return players
}

class Player {
  constructor() {
    this.deck = null
  }

  setDeck(deck) {
    if(this.deck) {
      throw new Error('Player deck is already set!')
    }
    this.deck = deck    
  }

  getDeck() {
    return [].concat(this.deck)
  }
}

module.exports = {
  create,
  Player,
}
