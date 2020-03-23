import { connect } from 'react-redux'
import { selectCard } from './GameActions'
import PlayerHand from './PlayerHand'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPickCard: (card) => {
      dispatch(selectCard(card))
    }
  }
}

const PlayerHandContainer = connect(null, mapDispatchToProps)(PlayerHand)

export default PlayerHandContainer
