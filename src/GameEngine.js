import { combineReducers } from 'redux'
import { fromJS } from 'immutable'
import { 
	ADD_CARD_TO_GAME_TABLE,
	SELECT_CARD_FROM_PLAYER_HAND,
	CLEAR_SELECTED_PLAYER_CARD,
} from './ActionTypes'

const gameTableInitialState = fromJS([
	[],
	[],
	[],
	[],
])

const myHandInitialState = fromJS({
	selectedPlayerCard: null,
})


function players(state = fromJS({}), action) {
	switch(action.type) {
		default: 
			return state
	}
}

function gameTable(state = gameTableInitialState, action) {
	switch(action.type) {
		case ADD_CARD_TO_GAME_TABLE:
			const lastCardInStack = state.get(action.stack).last(0)
			
			if(action.card !== 0 && lastCardInStack + 1 !== action.card) {
				return state
			}
			return state.updateIn(
				[action.stack],
				cardStack => cardStack.push(action.card)
			)
		default: 
			return state
	}
}

function myDeck(state = fromJS({}), action) {
	switch(action.type) {
		default: 
			return state
	}
}

function myHand(state = myHandInitialState, action) {
	switch(action.type) {
		case SELECT_CARD_FROM_PLAYER_HAND:
			return state.set('selectedPlayerCard', action.card)
		case CLEAR_SELECTED_PLAYER_CARD:
			return state.set('selectedPlayerCard', null)
		default: 
			return state
	}
}

const GameEngine = combineReducers({
	myHand,
	myDeck,
	players,
	gameTable,
})

export default GameEngine