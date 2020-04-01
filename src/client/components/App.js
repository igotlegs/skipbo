import React from 'react'
import { HeadProvider, Link, } from 'react-head'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import PlayerHand from '../containers/PlayerHandContainer'
import GameTable from '../containers/GameTableContainer'
import PlayerDeck from '../containers/PlayerDeckContainer'
import PlayerTableCards from '../containers/PlayerTableCardsContainer'
import './App.css'

export default function App(props) {
  
    return (
      <HeadProvider>
        <ThemeProvider>
          <CSSReset/>
          <Link href="https://fonts.googleapis.com/css?family=Baloo+Da+2:400,700&display=swap" 
                rel="stylesheet"/>
          <div className="app">
            <div className="app__column">
              <div className="app__other-player-area"/>
            </div>
            <div className="app__column">
              <div className="app__game-table">
                <GameTable/>
              </div>
              <div className="app__my-player-area">
               <div className="app__player-hand">
                  <PlayerHand/>
                </div>
                <div className="app__player-deck">
                  <PlayerDeck/>
                </div>
                <div className="app__player-table-cards">
                  <PlayerTableCards/>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </HeadProvider>
    )
}
