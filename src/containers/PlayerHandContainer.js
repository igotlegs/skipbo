import { connect } from 'react-redux'
import { selectCard } from '../actions/GameActions'
import PlayerHand from '../components/PlayerHand'
import CardOrigin from '../constants/CardOrigin'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPickCard: (card) => {
      dispatch(selectCard(card, CardOrigin.PLAYER_HAND))
    }
  }
}

const PlayerHandContainer = connect(null, mapDispatchToProps)(PlayerHand)

export default PlayerHandContainer