import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, } from '@chakra-ui/core'
import { noop } from '../utils'
import Card, { CardSize, } from './Card'
import './PlayerTableCards.css'

const PlayerTableCards = (props) => {

  const cardStackElements = props.cardStacks.map((stack, stackIndex) => {
    const selectStack = () => props.onSelectCardStack(stackIndex, props.selectedCard)

    return (
      <div className="player-table-cards__stack" key={stackIndex}>
        <div className="player-table-cards__stack-controls">
          <IconButton 
            className="player-table-cards__stack-add" 
            icon="add" 
            onClick={selectStack}/>
          <span className="player-table-cards__stack-count">{stack.length}</span>
        </div>
        <div className="player-table-cards__stack-cards">
          {renderStack(stack, stackIndex, props.onSelectCard)}
        </div>
      </div>
    )
  })

  return (
    <div className="player-table-cards">
      {cardStackElements}
    </div>
  )
}

function renderStack(stack, stackIndex, onSelectCard) {
  const initialOffset = 7
  const showCardBelowByPx = 35
  let offset = getMaxOffset(stack.length, initialOffset, showCardBelowByPx)

  return stack.map((card, i) => {
    let onClick = noop
    const style = {
      position: 'absolute',
    }
    
    if(isTopCard(i, stack)) {
      style.bottom = `${initialOffset}px`
    } else {
      style.bottom = `${offset}px`
      offset -= showCardBelowByPx
    }

    if(i === stack.length - 1) {
      onClick = () => onSelectCard(stackIndex, card)
    }
    return (
      <div key={i} style={style}>
        <Card 
          value={card} 
          size={CardSize.SMALL}
          onSelect={onClick}/>
      </div>
    )
  })          
}

function isTopCard(index, stack) {
  return stack.length === 1 || index === stack.length - 1
}

function getMaxOffset(numOfCards, initialOffset, showCardBelowByPx) {
  let offset = 0

  if(numOfCards === 1) {
    return initialOffset
  }
  if(numOfCards > 1) {
    let i = 0
    offset = initialOffset
    
    while(i < numOfCards - 1) {
      offset += showCardBelowByPx
      i++
    }
    return offset
  }
  return offset
}

PlayerTableCards.propTypes = {
  selectedCard: PropTypes.number,
  cardStacks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  onSelectCardStack: PropTypes.func.isRequired,
  onSelectCard: PropTypes.func.isRequired,
}

export default PlayerTableCards