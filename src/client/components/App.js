import React from 'react'
import { HeadProvider, Link, } from 'react-head'
import PlayerHand from '../containers/PlayerHandContainer'
import GameTable from '../containers/GameTableContainer'
import PlayerDeck from '../containers/PlayerDeckContainer'
import PlayerTableCards from '../containers/PlayerTableCardsContainer'

export default function App(props) {
  
    return (
      <HeadProvider>
        <Link href="https://fonts.googleapis.com/css?family=Baloo+Da+2:400,700&display=swap" rel="stylesheet"/>
        <div className="App">
          <div>
            <GameTable/>
          </div>
          <PlayerDeck/>
          <PlayerHand/>
          <PlayerTableCards/>
        </div>
      </HeadProvider>
    )
}
