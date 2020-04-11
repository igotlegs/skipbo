import API from '../api/Api'
import { CREATE_GAME, SETUP_GAME, } from '../constants/ActionTypes'

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
