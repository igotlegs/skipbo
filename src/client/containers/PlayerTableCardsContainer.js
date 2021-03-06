import { connect } from 'react-redux'
import PlayerTableCards from '../components/PlayerTableCards'
import { 
  addCardToPlayerTableCards, 
  selectCard, 
} from '../actions/GamePlayActions'
import CardOrigin from '../constants/CardOrigin'

const mapStateToProps = (state, ownProps) => {
  const myIdentity = state.players.get('myIdentity')
  const myTableCards = state.tableCards.find((val, key) => key === myIdentity)

	return {
		selectedCard: state.selectedCard.get('card'),
		cardStacks: myTableCards.get('stacks').toJS(),
    acceptCards: state.selectedCard.get('origin') === CardOrigin.PLAYER_HAND,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectCardStack: (stack, card) => {
      dispatch(addCardToPlayerTableCards(stack, card))
    },
    onSelectCard: (stack, card) => {
      dispatch(selectCard(card, CardOrigin.PLAYER_TABLE_STACK, stack))
    },
  }
}

const PlayerTableCardsContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerTableCards)

export default PlayerTableCardsContainer
