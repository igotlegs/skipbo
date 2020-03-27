import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

const PlayerDeck = (props) => {
  
    return (
      <div className="player-deck">
        <Card value={props.topMostCard} onSelect={props.onSelectCard}/>
        {props.size}
      </div>
    )
}

PlayerDeck.propTypes = {
  size: PropTypes.number,
  topMostCard: PropTypes.number,
  onSelectCard: PropTypes.func.isRequired,
}

export default PlayerDeck
