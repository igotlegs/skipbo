import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isSkipBo, noop, } from '../utils'
import './Card.css'

export const CardSize = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
}

const Card = (props) => {
  const cardValue = isSkipBo(props.value) ? 
    getSkipBoValue() : 
    props.value.number

  const colorStyle = getCardColorStyle(props.value)
  const className = classNames(
                      "card", 
                      {"card--skipbo": isSkipBo(props.value)},
                      `card--${props.size.toLowerCase()}`,
                      {"card--selected": props.selected})

  return (
    <div className={className} onClick={()=> props.onSelect(props.value)}>
      <div className="card__outer-edge">
        <div style={colorStyle} className="card__inner-edge">
          <div className="card__header">
            <span className="card__value">
              {cardValue}
            </span>
          </div>
          <div className="card__center">
            <span className="card__value card__value--shadow">
              {cardValue}
            </span>
          </div>
          <div className="card__footer">
            <span className="card__value card__value--upside-down">
              {cardValue}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function getSkipBoValue() {
  return <div className="card__multiline">
           <span>Skip-</span>
           <span>Bo</span>
         </div>
}

function getCardColorStyle(card) {
  const style = {background: ''}

  if(card.number === 0) {
    style.background = '#de7b1f'
  }
  if(card.number >= 1 && card.number <= 4) {
    style.background = '#0926b3'
  }
  if(card.number >= 5 && card.number <= 8) {
    style.background = '#0b940b'
  }
  if(card.number >= 9 && card.number <= 12) {
    style.background = '#b31e1e'
  }

  return style
}

export const CardValuePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
})

Card.propTypes = {
  value: CardValuePropType.isRequired,
  onSelect: PropTypes.func,
  size: PropTypes.oneOf([CardSize.SMALL, CardSize.MEDIUM, CardSize.LARGE]),
  selected: PropTypes.bool,
}

Card.defaultProps = {
  onSelect: noop,
  size: CardSize.MEDIUM,
  selected: false,
}

export default Card
