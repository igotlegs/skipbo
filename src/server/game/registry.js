const gameRegistry = {}

export function addToRegistry(game) { 
  const id = game.getId()

  if(findFromRegistry(id) !== null) {
    throw new Error(`Game with ${id} already exists!`)
  }
  gameRegistry[id] = game
}

export function findFromRegistry(id) {
  const game = gameRegistry[id]
  return game !== undefined ? game : null
}
