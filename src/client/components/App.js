import React from 'react'
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
      return <Lobby/>

    // case GameStage.PRE_GAME:
    //   return <ChooseWhoStarts/> etc

    case GameStage.IN_PROGRESS:
      return <GameLayout/>
  }
}
