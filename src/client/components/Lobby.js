import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'
import { AddBox, IndeterminateCheckBox, } from '@material-ui/icons'
import './Lobby.css'

const Lobby = (props) => {
  return (
    <div className="lobby">
      <Paper>
        {
          typeof props.gameId !== 'string' ?
            <InitGame {...props}/> :
            <JoinGame {...props}/>
        }
      </Paper>
    </div>
  )
}

function InitGame(props) {
  const [playerCount, setCount] = React.useState(2)
  const addPlayer = () => playerCount < 4 && setCount(playerCount + 1)
  const removePlayer = () => playerCount > 2 && setCount(playerCount - 1)

  return (
    <div className="lobby__new-game">
      <div className="lobby__players">
        <span className="lobby__player-count">
          Pelaajien määrä: {playerCount}
        </span>
        <IconButton 
          aria-label="Vähemmän pelaajia"
          onClick={removePlayer}
          disabled={playerCount === 2}>
            <IndeterminateCheckBox/>
        </IconButton>
        <IconButton 
          aria-label="Enemmän pelaajia" 
          onClick={addPlayer}
          disabled={playerCount === 4}>
            <AddBox/>
        </IconButton>
      </div>
      <div className="lobby__start-game">
        <Fab 
          variant="extended" 
          color="primary" 
          onClick={() => props.onNewGame(playerCount)}>
            Luo uusi peli
        </Fab>
      </div>
    </div>
  )
}

function JoinGame(props) {
  return (
    <div>
      game id: {props.gameId}
      <Fab 
        variant="extended" 
        color="primary" 
        onClick={() => props.onStartGame()}>
          Aloita peli
      </Fab>
    </div>
  )
}

Lobby.propTypes = {
  gameId: PropTypes.string,
  onNewGame: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired,
}

Lobby.defaultProps = {
  gameId: null,
}

export default Lobby
