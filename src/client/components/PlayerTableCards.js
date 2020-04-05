import React from 'react'
import PropTypes from 'prop-types'
import { noop, } from '../utils'
import Card, { CardSize, } from './Card'
import './PlayerTableCards.css'

const PlayerTableCards = (props) => {

  const cardStackElements = props.cardStacks.map((stack, stackIndex) => {
    let selectStack = noop
    let onSelectCard = props.onSelectCard

    if(props.acceptCards) {
      selectStack = () => props.onSelectCardStack(stackIndex, props.selectedCard)
      onSelectCard = noop
    }

    return (
      <div className="player-table-cards__stack" key={stackIndex} onClick={selectStack}>
        {renderStackContent(stack, stackIndex, onSelectCard)}
      </div>
    )
  })

  return (
    <div className="player-table-cards">
      {cardStackElements}
    </div>
  )
}

function renderStackContent(stack, stackIndex, onSelectCard) {
  const initialOffset = 7
  const showCardBelowByPx = 35
  let offset = getMaxOffset(stack.length, initialOffset, showCardBelowByPx)

  const cardsInStack = stack.map((card, i) => {
    let onClick = noop
    const cardOverlayStyle = {
      position: 'absolute',
    }
    
    if(isTopCard(i, stack)) {
      cardOverlayStyle.bottom = `${initialOffset}px`
    } else {
      cardOverlayStyle.bottom = `${offset}px`
      offset -= showCardBelowByPx
    }

    if(i === stack.length - 1) {
      onClick = () => onSelectCard(stackIndex, card)
    }
    return (
      <div key={i} style={cardOverlayStyle}>
        <Card 
          value={card} 
          size={CardSize.SMALL}
          onSelect={onClick}/>
      </div>
    )
  })   

  return <CardsInStack cards={cardsInStack}/>
}

class CardsInStack extends React.Component {
  
  constructor(props) {
    super(props)
    this.scrollEl = React.createRef()
  }

  componentDidUpdate() {
    this.scrollEl.current.scrollTop = this.scrollEl.current.scrollHeight
  }

  render() {
    return (
      <div ref={this.scrollEl} className="player-table-cards__stack-scroll">
        <div className="player-table-cards__stack-cards">
          {this.props.cards}
        </div>
      </div>
    )
  }
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
  acceptCards: PropTypes.bool,
}

PlayerTableCards.defaultProps = {
  acceptCards: true,
}

export default PlayerTableCards
