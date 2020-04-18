import { fromJS, } from 'immutable'
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
} from '../constants/ActionTypes'
import { isSkipBo, isNextCard, } from '../utils'

const gameTableInitialState = fromJS({
  stacks: [
    [],
    [],
    [],
    [],
  ],
  previousMoveFailed: false,
})

const selectedCardInitialState = fromJS({
  card: null,
  origin: null,
  stack: null,
})

export function gameTable(state = gameTableInitialState, action) {
  switch(action.type) {
    case ADD_CARD_TO_GAME_TABLE:
      const stack = state.getIn(['stacks', action.stack])
      const lastCardInStack = stack.last(null)
      const setViolation = (state, flag) => state.set('previousMoveFailed', flag)
      
      // Empty stack and card must be SkipBo or 1.
      if(lastCardInStack === null && action.card.number > 1) {
        return setViolation(state, true)
      }
      // Non-empty stack 
      if(lastCardInStack !== null) {
        // ... and card must be next in sequence to the last non-SkipBo card.
        if(!isSkipBo(lastCardInStack) && !isNextCard(action.card, lastCardInStack)) {
          return setViolation(state, true)
        }
        // ... and last card is SkipBo. Also, when the card being placed is not SkipBo 
        // we have to check if it's next in sequence to the last card.
        if(isSkipBo(lastCardInStack) && !isSkipBo(action.card)) {
          let lastSkipBoWithRealValue = null

          if(stack.size > 1) {
            const skipBos = stack.reverse().takeWhile(isSkipBo)
            const lastNonSkipBoIndex = stack.size - skipBos.size - 1
            const skipBoValueInStack = stack.get(lastNonSkipBoIndex).number + skipBos.size
            lastSkipBoWithRealValue = skipBos.last()
            lastSkipBoWithRealValue.number = skipBoValueInStack
          } else {
            lastSkipBoWithRealValue = stack.first()
            lastSkipBoWithRealValue.number = 1
          }

          if(!isNextCard(action.card, lastSkipBoWithRealValue)) {
            return setViolation(state, true)
          }
        }
      }

      const newState = state.updateIn(
        ['stacks', action.stack],
        cardStack => cardStack.push(action.card)
      )
      return setViolation(newState, false)

    default: 
      return state
  }
}

export function playerDeck(state = fromJS({}), action) {
  switch(action.type) {
    case SET_PLAYER_DECK:
      let playerDeck = {}
      
      playerDeck[action.playerId] = {
        playerId: action.playerId,
        topMostCard: action.topMostCard,
        size: action.size,
      }

      return state.merge(fromJS(playerDeck))

    default: 
      return state
  }
}

export function tableCards(state = fromJS({}), action) {
  switch(action.type) {
    case INIT_PLAYER_TABLE_CARDS:
      const playerTableCards = {}

      playerTableCards[action.playerId] = {
        playerId: action.playerId,
        stacks: [
          [],
          [],
          [],
          [],
        ],
        previousMoveFailed: false,
      }
      return state.merge(fromJS(playerTableCards))

    case ADD_CARD_TO_PLAYER_TABLE_CARDS:
      return state.updateIn(
        [action.playerId, 'stacks', action.stack],
        cardStack => cardStack.push(action.card)
      ).set('previousMoveFailed', false)

    case REMOVE_CARD_FROM_PLAYER_TABLE_STACK:
      return state.updateIn(
        [action.playerId, 'stacks', action.stack],
        cardStack => cardStack.pop()
      )

    case SET_PLAYER_TABLE_CARDS_VIOLATION: 
      return state.set('previousMoveFailed', true)

    default: 
      return state
  }
}

export function selectedCard(state = selectedCardInitialState, action) {
  switch(action.type) {
    case SELECT_CARD:
      return state.merge({
        card: action.card, 
        origin: action.origin,
        stack: action.stack,
      })
    case CLEAR_SELECTED_CARD:
      return state.merge({
        card: null, 
        origin: null, 
        stack: null,
      })

    default: 
      return state
  }
}

export function myHand(state = fromJS([]), action) {
  switch(action.type) {
    case REMOVE_CARD_FROM_PLAYER_HAND:
      return state.filter((card) => card.id !== action.card.id)

    case ADD_CARDS_TO_MY_HAND: 
      return state.concat(action.cards)

    default: 
      return state
  }
}
