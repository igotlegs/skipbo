import { connect } from 'react-redux'
import { selectCard } from '../actions/GamePlayActions'
import PlayerHand from '../components/PlayerHand'
import CardOrigin from '../constants/CardOrigin'

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.myHand.toJS(),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPickCard: (card) => {
      dispatch(selectCard(card, CardOrigin.PLAYER_HAND))
    },
  }
}

const PlayerHandContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerHand)

export default PlayerHandContainer
