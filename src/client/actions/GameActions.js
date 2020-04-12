import API from '../api/Api'
import { CREATE_GAME, SETUP_GAME, NEW_PLAYER, } from '../constants/ActionTypes'

export const createNewGame = (playerCount) => {
  return (dispatch) => {
    API.createGame(playerCount)
      .then((data) => {
        dispatch({
          type: CREATE_GAME,
          ...data,
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export const setupGame = () => ({
  type: SETUP_GAME,
})

export const joinGame = (playerName) => {
  return (dispatch, getState) => {
    const gameId = getState().game.get('id')

    API.addPlayerToGame(playerName, gameId)
      .then((data) => {
        dispatch({
          type: NEW_PLAYER,
          ...data,
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
