import { connect } from 'react-redux'
import { createNewGame, setupGame, } from '../actions/GameActions'
import Lobby from '../components/Lobby'

const mapStateToProps = (state, ownProps) => {
  return {
    gameId: state.game.get('id'),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNewGame: (playerCount) => {
      dispatch(createNewGame(playerCount))
    },
    onStartGame: () => {
      dispatch(setupGame())
    },
  }
}

const LobbyContainer = connect(mapStateToProps, mapDispatchToProps)(Lobby)

export default LobbyContainer
