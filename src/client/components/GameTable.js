import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isSkipBo, } from '../utils'
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
            if(j < stack.length - 1) return null
              
            if(isSkipBo(card) && stack.length > 1) {
              const previousIndex = j - 1
              const previousCard = stack[previousIndex]
              const showPreviousCardStyle = {
                position: 'absolute',
                top: '75px',
              }

              return [
                <div>
                  <Card 
                    key={previousIndex}
                    value={previousCard}
                    size={CardSize.LARGE}/>
                </div>,
                <div style={showPreviousCardStyle}>
                  <Card 
                    key={j}
                    value={card}
                    size={CardSize.LARGE}/>
                </div>
              ]
            }

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