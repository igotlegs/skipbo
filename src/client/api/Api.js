import axios from 'axios'

export const API_ENDPOINTS = {
  GAME: '/game',
}

const client = axios.create({
  baseURL: 'api',
})

client.interceptors.response.use(transformOkResponse, transformErrResponse)

const API = {
  createGame: (playerCount) => {
    return client.post(API_ENDPOINTS.GAME, {playerCount})
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
