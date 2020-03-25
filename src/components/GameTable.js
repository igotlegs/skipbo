import React from 'react'
import PropTypes from 'prop-types'

const GameTable = (props) => {

  const cardStackElements = props.cardStacks.map((stack, i) => {
    const selectStack = () => props.onSelectCardStack(i, props.selectedCard)

    return (
      <div className="game-table__stack" key={i} onClick={selectStack}>
        {
          stack.map((card, j) => {
            return (
              <div key={j}>
                {card}
              </div>
            )
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