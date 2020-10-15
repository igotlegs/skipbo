import joinGame from './join-game-handler'

const handlers = {
  route: (data, gameId, playerId, ws, wsManager) => {
    // todo: switch case based on msg 
    joinGame(data, gameId, playerId, ws, wsManager)
  },
}

export default handlers
