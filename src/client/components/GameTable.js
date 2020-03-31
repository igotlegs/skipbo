import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Card, { CardSize, } from './Card'
import './GameTable.css'

const GameTable = (props) => {

  const cardStackElements = props.cardStacks.map((stack, i) => {
    const selectStack = () => props.onSelectCardStack(i, props.selectedCard)
      const className = classNames(
                        "game-table__stack",
                        {"game-table__stack--empty": stack.length === 0})

    return (
      <div className={className} key={i} onClick={selectStack}>
        {
          stack.map((card, j) => {
            return <Card 
                      key={j} 
                      value={card}
                      size={CardSize.LARGE}/>
          })
        }
      </div>
    )
  })

  return (
    <div className="game-table">
      {cardStackElements}
    </div>
  )
}

GameTable.propTypes = {
  selectedCard: PropTypes.number,
  cardStacks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  onSelectCardStack: PropTypes.func.isRequired,
}

export default GameTable