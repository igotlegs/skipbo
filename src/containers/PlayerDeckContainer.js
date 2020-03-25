import { connect } from 'react-redux'
import { selectCard } from '../actions/GameActions'
import PlayerDeck from '../components/PlayerDeck'
import CardOrigin from '../constants/CardOrigin'

const mapStateToProps = (state, ownProps) => {
	return {
		size: state.myDeck.get('size'),
		topMostCard: state.myDeck.get('topMostCard'),
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectCard: (card) => {
    		dispatch(selectCard(card, CardOrigin.PLAYER_DECK))
    }
  }
}

const PlayerDeckContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerDeck)

export default PlayerDeckContainer
