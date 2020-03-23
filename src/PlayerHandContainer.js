import { connect } from 'react-redux'
import { selectCard } from './GameActions'
import PlayerHand from './PlayerHand'
import CardOrigin from './CardOrigin'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPickCard: (card) => {
      dispatch(selectCard(card, CardOrigin.PLAYER_HAND))
    }
  }
}

const PlayerHandContainer = connect(null, mapDispatchToProps)(PlayerHand)

export default PlayerHandContainer
