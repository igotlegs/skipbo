import { fromJS } from 'immutable'
import { CREATE_GAME, SETUP_GAME, } from '../constants/ActionTypes'
import GameStage from '../constants/GameStage'

const gameInitialState = fromJS({
  id: null,
  stage: GameStage.INIT,
  playerCount: 0,
  players: {},
})

export function game(state = gameInitialState, action) {
  switch(action.type) {
    case CREATE_GAME: 
      return state.merge({
        id: action.id,
        playerCount: action.playerCount,
      })

    case SETUP_GAME: 
      return state.set('stage', GameStage.IN_PROGRESS) // todo: should be PRE_GAME

    default: 
      return state
  }
}
