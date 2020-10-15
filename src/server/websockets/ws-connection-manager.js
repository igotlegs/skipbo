import WebSocket from 'ws'
import handlers from './handlers'
import { getSessionData, sessionIdentityOk, } from '../session/session-handlers'

const WsConnectionManager = {
  _sockets: {},
  _wss: null,
  _server: null,
  _sessionParser: null,
  _initDone: false,

  _bindListeners: () => {
    WsConnectionManager._server.on('upgrade', (request, socket, head) => {

      WsConnectionManager._sessionParser(request, {}, () => {
        WsConnectionManager._wss.handleUpgrade(request, socket, head, (ws) => {
          WsConnectionManager._wss.emit('connection', ws, request)
        })
      })
    })

    WsConnectionManager._wss.on('connection', (ws, request) => {
      ws.on('message', (data) => {
        request.session.reload((err) => {
          const success = WsConnectionManager._handleIdentification(ws, request.session)

          if(success) {
            const { gameId, playerId, } = getSessionData(request.session)
            handlers.route(data, gameId, playerId, ws, WsConnectionManager)
          }
        })
      })
    })
  },
  
  _registerSocketForGame: (ws, gameId) => {
    const sockets = WsConnectionManager.getSocketsForGame(gameId)
    let registered = false

    sockets.forEach((socket) => {
      if(socket === ws) {
        registered = true
      }
    })

    if(!registered) {
      sockets.push({ ws, joinComplete: false, })
      WsConnectionManager._sockets[gameId] = sockets
    }
  },

  _handleIdentification: (ws, session) => {
    const { gameId, playerId, } = getSessionData(session)

    if(!gameId) {
      return false
    }
    WsConnectionManager._registerSocketForGame(ws, gameId)
    
    if(sessionIdentityOk(session)) {
      const sockets = WsConnectionManager.getSocketsForGame(gameId)

      sockets.forEach((socketObj) => {
        if(socketObj.ws === ws) {
          socketObj.joinComplete = true
        }
      })

      // todo: delete all sockets with joinComplete false when game started
    }

    return true
  },

  getSocketsForGame: (gameId) => {
    return WsConnectionManager._sockets[gameId] || []
  },

  broadcastToOthersInGame: (data, gameId, currentSocket) => {
    const sockets = WsConnectionManager.getSocketsForGame(gameId)
    
    sockets.map((socketObj) => {
      if(socketObj.ws !== currentSocket && socketObj.ws.readyState === WebSocket.OPEN) {
        socketObj.ws.send(data)
      }
    })
  },

}

function WsConnectionManagerSetup(server, sessionParser) {
  if(WsConnectionManager._initDone) {
    return WsConnectionManager
  }
  if(!server) {
    throw new Error(`Expected server! Got ${server}`)
  }
  if(!sessionParser) {
    throw new Error(`Expected sessionParser! Got ${sessionParser}`)
  }

  WsConnectionManager._server = server
  WsConnectionManager._sessionParser = sessionParser
  WsConnectionManager._wss = new WebSocket.Server({ 
    noServer: true,
  })

  WsConnectionManager._bindListeners()
  WsConnectionManager._initDone = true

  return WsConnectionManager
}

export default WsConnectionManagerSetup
