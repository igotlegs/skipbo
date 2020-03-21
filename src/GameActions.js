import { 
	ADD_CARD_TO_GAME_TABLE,
	SELECT_CARD_FROM_PLAYER_HAND,
	CLEAR_SELECTED_PLAYER_CARD,
} from './ActionTypes'

export const addCardToGameTable = (stack, card) => {
	return (dispatch) => {
		dispatch({
			type: ADD_CARD_TO_GAME_TABLE,
			stack,
			card,
		})

		dispatch(clearSelectedPlayerCard())
	}
}

export const selectCardFromPlayerHand = (card) => ({
	type: SELECT_CARD_FROM_PLAYER_HAND,
	card,
})

export const clearSelectedPlayerCard = () => ({
	type: CLEAR_SELECTED_PLAYER_CARD,
})