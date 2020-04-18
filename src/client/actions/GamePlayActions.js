import API from '../api/Api'
import { 
	ADD_CARD_TO_GAME_TABLE,
	SELECT_CARD,
	CLEAR_SELECTED_CARD,
	ADD_CARD_TO_PLAYER_TABLE_CARDS,
	REMOVE_CARD_FROM_PLAYER_TABLE_STACK,
	SET_PLAYER_TABLE_CARDS_VIOLATION,
	REMOVE_CARD_FROM_PLAYER_HAND,
	ADD_CARDS_TO_MY_HAND,
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
			if(selectedCardState.origin === CardOrigin.PLAYER_HAND) {
				dispatch(removeCardFromPlayerHand(card))
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
			const playerId = getState().players.get('myIdentity')

			dispatch({
				type: ADD_CARD_TO_PLAYER_TABLE_CARDS,
				stack,
				card,
				playerId,
			})

			dispatch(removeCardFromPlayerHand(card))
			dispatch(clearSelectedCard())
		} else {
			dispatch(setCanNotMoveCardToPlayerTableCards())
		}
	}
}

export const popCardFromPlayerTableStack = (stack) => {
	return (dispatch, getState) => {
		const playerId = getState().players.get('myIdentity')
		
		dispatch({
			type: REMOVE_CARD_FROM_PLAYER_TABLE_STACK,
			stack,
			playerId,
		})
	}
}

export const setCanNotMoveCardToPlayerTableCards = () => ({
	type: SET_PLAYER_TABLE_CARDS_VIOLATION,
})

export const removeCardFromPlayerHand = (card) => ({
	type: REMOVE_CARD_FROM_PLAYER_HAND,
	card
}) 

export const addCardsToMyHand = (cards) => ({
	type: ADD_CARDS_TO_MY_HAND,
	cards,
})

export const dealCardsToMyHand = (numOfCards) => {
	return (dispatch) => {
		API.dealCards(numOfCards)
      .then((data) => {
        dispatch(addCardsToMyHand(data.cards))
      })
      .catch((e) => {
        console.log(e)
      })
	}
}
