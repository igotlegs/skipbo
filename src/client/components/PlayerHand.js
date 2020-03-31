import React from 'react'
import PropTypes from 'prop-types'
import Card, { CardSize, } from './Card'

const PlayerHand = (props) => {

    return (
      <div>  
        {props.cards.map((card, i) => 
          <Card 
            key={i} 
            value={card} 
            size={CardSize.SMALL} 
            onSelect={props.onPickCard}/>
        )}
      </div>
    )
}

PlayerHand.propTypes = {
  onPickCard: PropTypes.func.isRequired
}

export default PlayerHand