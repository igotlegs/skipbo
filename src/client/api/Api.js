import axios from 'axios'

export const API_ENDPOINTS = {
  GAME: '/game',
  PLAYER: '/player',
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
  getClient: () => client
}

function transformOkResponse(response) {
  return response.data.data
}

function transformErrResponse(error) {
  return Promise.reject(error.response.data.errors)
}

export default API
