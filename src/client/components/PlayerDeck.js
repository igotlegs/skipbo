import React from 'react'
import PropTypes from 'prop-types'

const PlayerDeck = (props) => {
  
    return (
      <div className="player-deck">
        <div onClick={()=> props.onSelectCard(props.topMostCard)}>
          {props.topMostCard}
        </div>
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
