import { connect } from 'react-redux'
import { selectCardFromPlayerHand } from './GameActions'
import PlayerHand from './PlayerHand'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPickCard: (card) => {
      dispatch(selectCardFromPlayerHand(card))
    }
  }
}

const PlayerHandContainer = connect(null, mapDispatchToProps)(PlayerHand)

export default PlayerHandContainer
