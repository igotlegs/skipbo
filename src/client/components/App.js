import React from 'react'
import PropTypes from 'prop-types'
import GameLayout from './GameLayout'
import Lobby from '../containers/LobbyContainer'
import GameStage from '../constants/GameStage'
import './App.css'

export default function App(props) {
  return (
    <div className="app">
      {renderContent(props.gameStage)}
    </div>
  )
}

function renderContent(gameStage) {
  switch(gameStage) {
    case GameStage.INIT:
    case GameStage.PRE_GAME:
      return <Lobby/>

    case GameStage.IN_PROGRESS:
      return <GameLayout/>

    case GameStage.GAME_END:
      console.log('not implemented yet')
      return null

    default:
      throw new Error(`Unkown game stage ${gameStage}`)
  }
}

App.propTypes = {
  gameStage: PropTypes.oneOf(Object.values(GameStage))
}

App.defaultProps = {
  gameStage: GameStage.INIT,
}
