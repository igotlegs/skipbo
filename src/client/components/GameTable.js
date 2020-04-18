import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isSkipBo, } from '../../shared/utils'
import Card, { CardSize, CardValuePropType, } from './Card'
import './GameTable.css'

const GameTable = (props) => {

  const cardStackElements = props.cardStacks.map((stack, i) => {
    const className = classNames(
                      "game-table__stack",
                      {"game-table__stack--empty": stack.length === 0})

    const selectStack = () => {
      if(props.selectedCard) {
        props.onSelectCardStack(i, props.selectedCard)
      }
    }

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
                <div key={previousIndex}>
                  <Card 
                    value={previousCard}
                    size={CardSize.LARGE}/>
                </div>,
                <div key={j} style={showPreviousCardStyle}>
                  <Card 
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
  selectedCard: CardValuePropType,
  cardStacks: PropTypes.arrayOf(PropTypes.arrayOf(CardValuePropType)),
  onSelectCardStack: PropTypes.func.isRequired,
}

GameTable.defaultProps = {
  cardStacks: [],
  selectedCard: null,
}

export default GameTable