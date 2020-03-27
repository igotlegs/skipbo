import React from 'react'
import PropTypes from 'prop-types'

const PlayerHand = (props) => {
  
    const cards = props.cards.map((card, i) => {
      return <div key={i} onClick={() => props.onPickCard(card)}>
               {card}
             </div>
    })

    return (
      <div>  
        {cards}
      </div>
    )
}

PlayerHand.propTypes = {
  onPickCard: PropTypes.func.isRequired
}

export default PlayerHand