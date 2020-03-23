import { connect } from 'react-redux'
import { selectCard } from './GameActions'
import PlayerDeck from './PlayerDeck'

const mapStateToProps = (state, ownProps) => {
	return {
		size: state.myDeck.get('size'),
		topMostCard: state.myDeck.get('topMostCard'),
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectCard: (card) => {
    		dispatch(selectCard(card))
    }
  }
}

const PlayerDeckContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerDeck)

export default PlayerDeckContainer
