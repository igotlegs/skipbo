import React from 'react'
import PlayerHand from '../containers/PlayerHandContainer'
import GameTable from '../containers/GameTableContainer'
import PlayerDeck from '../containers/PlayerDeckContainer'
import PlayerTableCards from '../containers/PlayerTableCardsContainer'
import './GameLayout.css'

const GameLayout = () => {
  return (
    <div className="game-layout">
      <div className="game-layout__column">
        <div className="game-layout__other-player-area"/>
      </div>
      <div className="game-layout__column">
        <div className="game-layout__game-table">
          <GameTable/>
        </div>
        <div className="game-layout__my-player-area">
          <div className="game-layout__player-hand">
            <PlayerHand/>
          </div>
          <div className="game-layout__player-deck">
            <PlayerDeck/>
          </div>
          <div className="game-layout__player-table-cards">
            <PlayerTableCards/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameLayout
