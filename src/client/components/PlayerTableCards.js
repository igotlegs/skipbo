import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { noop } from '../utils'
import Card, { CardSize, } from './Card'
import './PlayerTableCards.css'

const PlayerTableCards = (props) => {

  const cardStackElements = props.cardStacks.map((stack, stackIndex) => {
    const selectStack = () => props.onSelectCardStack(stackIndex, props.selectedCard)
    const className = classNames(
                        "player-table-cards__stack",
                        {"player-table-cards__stack--empty": stack.length === 0})
    
    return (
      <div className={className} key={stackIndex} onClick={selectStack}>
        {
          stack.map((card, j) => {
            let onClick = noop

            if(j === stack.length - 1) {
              onClick = () => props.onSelectCard(stackIndex, card)
            }
            return (
              <Card 
                key={j} 
                value={card} 
                size={CardSize.SMALL}
                onSelect={onClick}/>
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