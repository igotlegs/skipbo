import { combineReducers } from 'redux'
import { fromJS } from 'immutable'
import { 
	ADD_CARD_TO_GAME_TABLE,
	SELECT_CARD,
	CLEAR_SELECTED_CARD,
	ADD_CARD_TO_PLAYER_TABLE_CARDS,
	REMOVE_CARD_FROM_PLAYER_TABLE_STACK,
} from './ActionTypes'
import { isSkipBo, isNextCard, } from './utils'

const gameTableInitialState = fromJS([
	[],
	[],
	[],
	[],
])

const selectedCardInitialState = fromJS({
	card: null,
	origin: null,
	stack: null,
})

// Fetch from server
const myDeckInitialState = fromJS({
	size: 25, 
	topMostCard: 4,
})

const myTableCardsInitialState = fromJS([
	[],
	[],
	[],
	[],
])

function players(state = fromJS({}), action) {
	switch(action.type) {
		default: 
			return state
	}
}

function gameTable(state = gameTableInitialState, action) {
	switch(action.type) {
		case ADD_CARD_TO_GAME_TABLE:
			const stack = state.get(action.stack)
			const lastCardInStack = stack.last(null)
			
			// Empty stack and card must be SkipBo or 1.
			if(lastCardInStack === null && action.card > 1) {
				return state
			}
			// Non-empty stack 
			if(lastCardInStack !== null) {
				// ... and card must be next in sequence to the last card.
				if(!isSkipBo(lastCardInStack) && !isNextCard(action.card, lastCardInStack)) {
					return state
				}
				// ... and last card is SkipBo. Also, when the card being placed is not SkipBo 
				// we have to check if it's next in sequence to the last card.
				if(isSkipBo(lastCardInStack) && !isSkipBo(action.card)) {
				  const skipBos = stack.reverse().takeWhile(isSkipBo)
				  const lastNonSkipBoIndex = stack.size - skipBos.size - 1
					const skipBoValueInStack = stack.get(lastNonSkipBoIndex) + skipBos.size

					if(!isNextCard(action.card, skipBoValueInStack)) {
						return state
					}
				}
			}
			return state.updateIn(
				[action.stack],
				cardStack => cardStack.push(action.card)
			)
		default: 
			return state
	}
}

function myDeck(state = myDeckInitialState, action) {
	switch(action.type) {
		default: 

			return state
	}
}

function myTableCards(state = myTableCardsInitialState, action) {
	switch(action.type) {
		case ADD_CARD_TO_PLAYER_TABLE_CARDS:
			return state.updateIn(
				[action.stack],
				cardStack => cardStack.push(action.card)
			)

		case REMOVE_CARD_FROM_PLAYER_TABLE_STACK:
			return state.updateIn(
				[action.stack],
				cardStack => cardStack.pop()
			)

		default: 
			return state
	}
}

function selectedCard(state = selectedCardInitialState, action) {
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
				stack: null
			})
		default: 
			return state
	}
}

const GameEngine = combineReducers({
	selectedCard, // never sync
	gameTable, // will be synced
	myDeck, // never sync
	myTableCards, // will be synced
	players,
})

export default GameEngine