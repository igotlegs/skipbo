import { 
	ADD_CARD_TO_GAME_TABLE,
	SELECT_CARD,
	CLEAR_SELECTED_CARD,
} from './ActionTypes'

export const addCardToGameTable = (stack, card) => {
	return (dispatch) => {
		dispatch({
			type: ADD_CARD_TO_GAME_TABLE,
			stack,
			card,
		})

		dispatch(clearSelectedCard())
	}
}

export const selectCard = (card) => ({
	type: SELECT_CARD,
	card,
})

export const clearSelectedCard = () => ({
	type: CLEAR_SELECTED_CARD,
})