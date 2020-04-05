import React from 'react'
import PropTypes from 'prop-types'
import Card, { CardSize, } from './Card'

const PlayerHand = (props) => {

    return (
      <div className="player-hand">
        {renderCards(props.cards, props.onPickCard)}
      </div>
    )
}

function renderCards(cards, onPickCard) {
  let showCardByPx = 80
  let offset = showCardByPx

  const cardElements = cards.map((card, i) => {
    const overlapStyle = {
      position: 'absolute',
      left: `${offset}px`
    }

    offset += showCardByPx

    return (
      <div key={i} style={overlapStyle}>
        <Card 
          value={card} 
          size={CardSize.SMALL} 
          onSelect={onPickCard}/>
      </div>
    )
  })

  const style = {
    position: 'relative',
    left: `-${showCardByPx}px`
  }

  return (
     <div className="player-hand__cards" style={style}>
       {cardElements}
     </div>
  )
}

PlayerHand.propTypes = {
  onPickCard: PropTypes.func.isRequired,
}

export default PlayerHand