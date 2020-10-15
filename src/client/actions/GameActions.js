import API from '../api/Api'
import { 
  SET_GAME_DATA, 
  SETUP_GAME, 
  START_GAME,
  NEW_PLAYER, 
  SET_PLAYER_DECK,
  INIT_PLAYER_TABLE_CARDS,
  SET_PLAYER_IDENTITY,
} from '../constants/ActionTypes'
import { dealCardsToMyHand, } from './GamePlayActions'

export const createNewGame = (playerCount) => {
  return (dispatch) => {
    API.createGame(playerCount)
      .then((data) => {
        dispatch(setGameData(data.id, data.playerCount))
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export const setGameData = (id, playerCount) => ({
  type: SET_GAME_DATA,
  id,
  playerCount,
})

export const setupGame = (data) => {
  return (dispatch) => {
    dispatch({ type: SETUP_GAME })
    dispatch(setPlayerDeck(data))
    dispatch(initPlayerTableCards(data.id))

    // MOCK, should be linked to game turn
    dispatch(dealCardsToMyHand(5))
  }
}

export const setPlayerDeck = (data) => ({
  type: SET_PLAYER_DECK,
  playerId: data.id,
  topMostCard: data.deckTopMostCard,
  size: data.deckSize,
})

export const initPlayerTableCards = (playerId) => ({
  type: INIT_PLAYER_TABLE_CARDS,
  playerId,
})

export const startGame = () => ({
  type: START_GAME,
})

export const joinGame = (playerName) => {
  return (dispatch, getState) => {
    const gameId = getState().game.get('id')

    API.addPlayerToGame(playerName, gameId)
      .then((data) => {
        dispatch(setWhoAmI(data.id))
        dispatch(newPlayer(data.id, data.name))
        dispatch(setupGame(data))
        API.Socket.sendMsg(newPlayer(data.id, data.name))
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export const newPlayer = (id, name) => ({
  type: NEW_PLAYER,
  id,
  name,
})

export const setWhoAmI = (id) => ({
  type: SET_PLAYER_IDENTITY,
  id,
})

export const getGame = (gameId) => {
  return (dispatch) => {
    API.getGame(gameId)
      .then((data) => {
        dispatch(setGameData(data.id, data.playerCount))
        data.players.map((player) => dispatch(newPlayer(player.id, player.name)))
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
