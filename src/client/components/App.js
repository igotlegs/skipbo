import React from 'react'
import PropTypes from 'prop-types'
import GameLayout from './GameLayout'
import Lobby from '../containers/LobbyContainer'
import GameStage from '../constants/GameStage'
import './App.css'

export default class App extends React.Component {

  componentDidMount() {
    let params = window.location.pathname.split('/')
    params = params.filter((p) => p !== '')

    if(params.length === 1) {
      this.props.onGameId(params[0])
    }
  }

  componentDidUpdate() {
    if(this.props.gameId) {
      window.history.replaceState({}, null, `/${this.props.gameId}`)
    }
  }

  render() {
    return (
      <div className="app">
        {this.renderContent()}
      </div>
    )
  }

 renderContent() {
  switch(this.props.gameStage) {
    case GameStage.INIT:
    case GameStage.PRE_GAME:
      return <Lobby/>

    case GameStage.IN_PROGRESS:
      return <GameLayout/>

    case GameStage.GAME_END:
      console.log('not implemented yet')
      return null

    default:
      throw new Error(`Unkown game stage ${this.props.gameStage}`)
    }
  }
}

App.propTypes = {
  gameStage: PropTypes.oneOf(Object.values(GameStage)),
  gameId: PropTypes.string,
  onGameId: PropTypes.func.isRequired,
}

App.defaultProps = {
  gameStage: GameStage.INIT,
}
