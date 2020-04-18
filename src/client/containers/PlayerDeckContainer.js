import { connect } from 'react-redux'
import { selectCard } from '../actions/GamePlayActions'
import PlayerDeck from '../components/PlayerDeck'
import CardOrigin from '../constants/CardOrigin'

const mapStateToProps = (state, ownProps) => {
  const myIdentity = state.players.get('myIdentity')
  const myDeck = state.playerDeck.find((val, key) => key === myIdentity)

	return {
		size: myDeck.get('size'),
		topMostCard: myDeck.get('topMostCard').toJS(),
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectCard: (card) => {
    		dispatch(selectCard(card, CardOrigin.PLAYER_DECK))
    },
  }
}

const PlayerDeckContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerDeck)

export default PlayerDeckContainer
