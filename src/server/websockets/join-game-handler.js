export default function joinGame(data, gameId, playerId, ws, wsManager) {
  wsManager.broadcastToOthersInGame(data, gameId, ws)
}
