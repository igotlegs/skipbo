import React from 'react'
import PlayerHand from './PlayerHandContainer'
import GameTable from './GameTableContainer'
import PlayerDeck from './PlayerDeckContainer'
import PlayerTableCards from './PlayerTableCardsContainer'

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
