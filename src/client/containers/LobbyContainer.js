import { connect } from 'react-redux'
import { createNewGame, startGame, joinGame, } from '../actions/GameActions'
import Lobby from '../components/Lobby'

const mapStateToProps = (state, ownProps) => {
  return {
    gameId: state.game.get('id'),
    playerCount: state.game.get('playerCount'),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNewGame: (playerCount) => {
      dispatch(createNewGame(playerCount))
    },
    onStartGame: () => {
      dispatch(startGame())
    },
    onAddPlayer: (playerName) => {
      dispatch(joinGame(playerName))
    },
  }
}

const LobbyContainer = connect(mapStateToProps, mapDispatchToProps)(Lobby)

export default LobbyContainer
