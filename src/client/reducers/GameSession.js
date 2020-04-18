import { fromJS } from 'immutable'
import { 
  CREATE_GAME, 
  START_GAME,
  SETUP_GAME, 
  NEW_PLAYER, 
  SET_PLAYER_IDENTITY,
} from '../constants/ActionTypes'
import GameStage from '../constants/GameStage'

const gameInitialState = fromJS({
  id: null,
  stage: GameStage.INIT,
  playerCount: 0,
}) 

const playersInitialState = fromJS({
  entities: {},
  myIdentity: null,
})

export function game(state = gameInitialState, action) {
  switch(action.type) {
    case CREATE_GAME: 
      return state.merge({
        id: action.id,
        playerCount: action.playerCount,
      })

    case SETUP_GAME: 
      return state.set('stage', GameStage.PRE_GAME)

    case START_GAME: 
      return state.set('stage', GameStage.IN_PROGRESS)

    default: 
      return state
  }
}

export function players(state = playersInitialState, action) {
  switch(action.type) {
    case NEW_PLAYER:
      const players = {
        entities: {}
      }
      players.entities[action.id] = {
        id: action.id,
        name: action.name,
      }
      return state.mergeDeep(players)

    case SET_PLAYER_IDENTITY: 
      if(state.get('myIdentity')) {
        return state
      }
      return state.set('myIdentity', action.id)

    default: 
      return state
  }
}


 