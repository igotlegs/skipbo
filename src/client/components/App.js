import React from 'react'
import PlayerHand from '../containers/PlayerHandContainer'
import GameTable from '../containers/GameTableContainer'
import PlayerDeck from '../containers/PlayerDeckContainer'
import PlayerTableCards from '../containers/PlayerTableCardsContainer'

export default function App(props) {
  
    return (
      <div className="App">
        <div>
          <GameTable/>
        </div>
        <PlayerDeck/>
        <PlayerHand/>
        <PlayerTableCards/>
      </div>
    )
}
