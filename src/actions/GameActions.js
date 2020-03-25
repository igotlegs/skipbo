import { 
	ADD_CARD_TO_GAME_TABLE,
	SELECT_CARD,
	CLEAR_SELECTED_CARD,
	ADD_CARD_TO_PLAYER_TABLE_CARDS,
	REMOVE_CARD_FROM_PLAYER_TABLE_STACK,
	SET_PLAYER_TABLE_CARDS_VIOLATION,
} from '../constants/ActionTypes'
import CardOrigin from '../constants/CardOrigin'

export const addCardToGameTable = (stack, card) => {
	return (dispatch, getState) => {
		dispatch({
			type: ADD_CARD_TO_GAME_TABLE,
			stack,
			card,
		})

		const previousMoveFailed = getState().gameTable.get('previousMoveFailed')

		if(!previousMoveFailed) {
			const selectedCardState = getState().selectedCard.toJS()

			if(selectedCardState.origin === CardOrigin.PLAYER_TABLE_STACK) {
				dispatch(popCardFromPlayerTableStack(selectedCardState.stack))
			}
			dispatch(clearSelectedCard())
		}
	}
}

export const selectCard = (card, origin, stack = null) => ({
	type: SELECT_CARD,
	card,
	origin,
	stack,
})

export const clearSelectedCard = () => ({
	type: CLEAR_SELECTED_CARD,
})

export const addCardToPlayerTableCards = (stack, card) => {
	return (dispatch, getState) => {
		if(getState().selectedCard.get('origin') === CardOrigin.PLAYER_HAND) {
			dispatch({
				type: ADD_CARD_TO_PLAYER_TABLE_CARDS,
				stack,
				card,
			})

			dispatch(clearSelectedCard())
		} else {
			dispatch(setCanNotMoveCardToPlayerTableCards())
		}
	}
}

export const popCardFromPlayerTableStack = (stack) => ({
	type: REMOVE_CARD_FROM_PLAYER_TABLE_STACK,
	stack,
})

export const setCanNotMoveCardToPlayerTableCards = () => ({
	type: SET_PLAYER_TABLE_CARDS_VIOLATION,
})
