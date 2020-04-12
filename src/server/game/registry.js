const gameRegistry = {}

function add(game) { 
  console.log(gameRegistry)
  const id = game.getId()

  if(findById(id) !== null) {
    throw new Error(`Game with ${id} already exists!`)
  }
  gameRegistry[id] = game
}

function findById(id) {
  const game = gameRegistry[id]
  return game !== undefined ? game : null
}

module.exports = {
  add,
  findById,
}
