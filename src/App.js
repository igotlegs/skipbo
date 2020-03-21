import React from 'react'
import PlayerHand from './PlayerHandContainer'
import GameTable from './GameTableContainer'

export default function App(props) {
  
    return (
      <div className="App">
        <div>
          <GameTable/>
        </div>
        
        <PlayerHand/>
      </div>
    )
}
