import { connect } from 'react-redux'
import { getGame, } from '../actions/GameActions'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {
    gameId: state.game.get('id'),
    gameStage: state.game.get('stage'),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGameId: (gameId) => {
      dispatch(getGame(gameId))
    },
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
