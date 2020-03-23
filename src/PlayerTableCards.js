import React from 'react'
import PropTypes from 'prop-types'
import { noop } from './utils'

const PlayerTableCards = (props) => {

  const cardStackElements = props.cardStacks.map((stack, stackIndex) => {
    const selectStack = () => props.onSelectCardStack(stackIndex, props.selectedCard)
    
    return (
      <div className="player-table-cards__stack" key={stackIndex} onClick={selectStack}>
        {
          stack.map((card, j) => {
            let onClick = noop

            if(j === stack.length - 1) {
              onClick = () => props.onSelectCard(stackIndex, card)
            }
            return (
              <div key={j} onClick={onClick}>
                {card}
              </div>
            )
          })
        }
      </div>
    )
  })

  return (
    <div className="player-table-cards">
      {cardStackElements}
    </div>
  )
}

PlayerTableCards.propTypes = {
  selectedCard: PropTypes.number,
  cardStacks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  onSelectCardStack: PropTypes.func.isRequired,
  onSelectCard: PropTypes.func.isRequired,
}

export default PlayerTableCards