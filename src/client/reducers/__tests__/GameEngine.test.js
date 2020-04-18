import { fromJS, List, } from 'immutable'
import { 
  ADD_CARD_TO_GAME_TABLE,
  SELECT_CARD,
  CLEAR_SELECTED_CARD,
  ADD_CARD_TO_PLAYER_TABLE_CARDS,
  REMOVE_CARD_FROM_PLAYER_TABLE_STACK,
  SET_PLAYER_TABLE_CARDS_VIOLATION,
  REMOVE_CARD_FROM_PLAYER_HAND,
  SET_PLAYER_DECK,
  INIT_PLAYER_TABLE_CARDS,
  ADD_CARDS_TO_MY_HAND,
} from '../../constants/ActionTypes'
import * as GameEngine from '../GameEngine'

describe('GameEngine', () => {

  describe('GameEngine::myHand', () => {
    it('should return an empty list for initial state', () => {
      expect(GameEngine.myHand(undefined, {})).toEqual(List())
    })

    it('should only update if hand would contain 5 cards', () => {
      const initialState = fromJS([
        {
          id: 'erw',
          number: 0,
        },
        {
          id: 'yew',
          number: 4,
        },
        {
          id: 'lal',
          number: 2,
        },
      ])

      const newCards = [
        { 
          id: 'asd', 
          number: 1, 
        },
        {
          id: 'poi',
          number: 9
        },
      ]
      
      const expectedState = fromJS(initialState.concat(fromJS(newCards)))
      const action = {
        type: ADD_CARDS_TO_MY_HAND,
        cards: newCards,
      }

      expect(GameEngine.myHand(initialState, action)).toEqual(expectedState)
      expect(GameEngine.myHand(undefined, action)).not.toEqual(expectedState)
    })
  })
})
