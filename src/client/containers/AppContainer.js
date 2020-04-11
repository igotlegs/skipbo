import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {
    gameStage: state.game.get('stage'),
  }
}

const AppContainer = connect(mapStateToProps, null)(App)

export default AppContainer
