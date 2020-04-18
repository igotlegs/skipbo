import axios from 'axios'

export const API_ENDPOINTS = {
  GAME: '/game',
  GAME_DECK: '/game/deck',
  PLAYER: '/player',
  PLAYER_HAND: '/player/my-hand',
}

const client = axios.create({
  baseURL: 'api',
})

client.interceptors.response.use(transformOkResponse, transformErrResponse)

const API = {
  createGame: (playerCount) => {
    return client.post(API_ENDPOINTS.GAME, {playerCount})
  },
  addPlayerToGame: (playerName, gameId) => {
    return client.post(API_ENDPOINTS.PLAYER, {playerName, gameId})
  },
  dealCards: (numOfCards) => {
    return client.put(API_ENDPOINTS.GAME_DECK, {numOfCards})
  },
  getClient: () => client
}

function transformOkResponse(response) {
  return response.data.data
}

function transformErrResponse(error) {
  return Promise.reject(error.response.data.errors)
}

export default API
