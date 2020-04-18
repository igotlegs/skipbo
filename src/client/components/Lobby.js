import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { 
  AddBox, 
  IndeterminateCheckBox, 
  PersonAdd,
} from '@material-ui/icons'
import GameRules from '../../shared/game-rules'
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
  const [playerCount, setCount] = React.useState(GameRules.MIN_PLAYERS)
  const addPlayer = () => {
    return playerCount < GameRules.MAX_PLAYERS && 
           setCount(playerCount + 1)
  }
  const removePlayer = () => {
    return playerCount > GameRules.MIN_PLAYERS && 
           setCount(playerCount - 1)
  }

  return (
    <div className="lobby__content">
      <div className="lobby__players">
        <span className="lobby__player-count">
          Pelaajien määrä: {playerCount}
        </span>
        <div className="lobby__player-count-controls">
          <IconButton 
            className="lobby__player-remove"
            aria-label="Vähemmän pelaajia"
            variant="outlined"
            onClick={removePlayer}
            disabled={playerCount === GameRules.MIN_PLAYERS}>
              <IndeterminateCheckBox/>
          </IconButton>
          <IconButton 
            aria-label="Enemmän pelaajia" 
            variant="outlined"
            onClick={addPlayer}
            disabled={playerCount === GameRules.MAX_PLAYERS}>
              <AddBox/>
          </IconButton>
        </div>
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
  const [playerName, setPlayerName] = React.useState('')
  const onPlayerNameChange = (event) => setPlayerName(event.target.value)
  const shareProps = {
    "readOnly": true,
  }
  
  const addPlayerOnEnter = (event) => {
    if(event.key === 'Enter' && playerName.length >= GameRules.MIN_PLAYER_NAME_LENGTH) {
      props.onAddPlayer(playerName)
    }
  }

  return (
    <div className="lobby__content">
      <span className="lobby__share-info">
        Kutsu muut peliin jakamalla heille pelilinkki
      </span>
      <div className="lobby__share">
        <TextField 
          defaultValue={props.gameId}
          label="Pelilinkki"
          size="small"
          variant="outlined"
          fullWidth
          inputProps={shareProps} />
      </div>
      <div className="lobby__join">
        <span className="lobby__joined-players">
          Pelaajat 0/{props.playerCount}
        </span>
        <div className="lobby__player">
          <TextField 
            className="lobby__player-name"
            label="Pelaajan nimi" 
            size="small"
            variant="outlined"
            value={playerName}
            onChange={onPlayerNameChange}
            onKeyDown={addPlayerOnEnter} />
          <Button 
            variant="outlined"
            color="secondary"
            startIcon={<PersonAdd/>}
            onClick={() => props.onAddPlayer(playerName)}
            disabled={playerName.length < GameRules.MIN_PLAYER_NAME_LENGTH}>
              Lisää
          </Button>
        </div>
      </div>
      <div className="lobby__start-game-btn">
        <Fab 
          variant="extended" 
          color="primary" 
          onClick={() => props.onStartGame()}>
            Aloita peli
        </Fab>
      </div>
    </div>
  )
}

Lobby.propTypes = {
  gameId: PropTypes.string,
  playerCount: PropTypes.number,
  onNewGame: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired,
  onAddPlayer: PropTypes.func.isRequired,
}

Lobby.defaultProps = {
  gameId: null,
  playerCount: GameRules.MIN_PLAYERS,
}

export default Lobby
