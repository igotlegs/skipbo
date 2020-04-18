import React from 'react'
import PropTypes from 'prop-types'
import Card, { CardValuePropType, } from './Card'
import './PlayerDeck.css'

const PlayerDeck = (props) => {
  
    return (
      <div className="player-deck">
        <span className="player-deck__size">
          {props.size}
        </span>
        <Card value={props.topMostCard} onSelect={props.onSelectCard}/>
      </div>
    )
}

PlayerDeck.propTypes = {
  size: PropTypes.number,
  topMostCard: CardValuePropType.isRequired,
  onSelectCard: PropTypes.func.isRequired,
}

export default PlayerDeck
