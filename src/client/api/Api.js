import axios from 'axios'

export const API_ENDPOINTS = {
  GAME: '/game',
  GAME_DECK: '/game/deck',
  PLAYER: '/player',
  PLAYER_HAND: '/player/my-hand',
}

const API_BASE_PATHNAME = 'api'
const WEBSOCKET_URL = 'ws://localhost:3001'

const client = axios.create({
  baseURL: API_BASE_PATHNAME,
})
client.interceptors.response.use(transformOkResponse, transformErrResponse)

let ws = null

const API = {
  createGame: (playerCount) => {
    return client.post(API_ENDPOINTS.GAME, {playerCount})
  },
  getGame: (gameId) => {
    return client.get(API_ENDPOINTS.GAME + `/${gameId}`)
  },
  addPlayerToGame: (playerName, gameId) => {
    return client.post(API_ENDPOINTS.PLAYER, {playerName, gameId})
  },
  dealCards: (numOfCards) => {
    return client.put(API_ENDPOINTS.GAME_DECK, {numOfCards})
  },
  Socket: {
    connect: () => {
      if(ws) return
      ws = new WebSocket(WEBSOCKET_URL)
    },
    onMsg: (cb) => {
      checkWsInit()
      ws.onmessage = (msg) => {
        cb.call(null, JSON.parse(msg.data))
      }
    },
    sendMsg: (msg) => {
      checkWsInit()
      ws.send(JSON.stringify(msg))
    },
    registerClient: (gameId) => {
      API.Socket.sendMsg({
        type: 'REGISTER_TEMP_CLIENT',
        gameId,
      })
    },
  },
  getWebSocket: () => ws,
  getHttpClient: () => client,
}

function transformOkResponse(response) {
  return response.data.data
}

function transformErrResponse(error) {
  return Promise.reject(error.response.data.errors)
}

function checkWsInit() {
  if(!ws) {
    throw new Error('Socket not connected!')
  }
}

export default API
