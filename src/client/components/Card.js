import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Card.css'
import { isSkipBo, noop, } from '../utils'

const Card = (props) => {
    const value = isSkipBo(props.value) ? 'Skip-Bo' : props.value
    const colorStyle = getCardColorStyle(props.value)
    const className = classNames("card", {"card--skipbo": isSkipBo(props.value)})

    return (
      <div className={className} onClick={()=> props.onSelect(props.value)}>
        <div className="card__outer-edge">
          <div style={colorStyle} className="card__inner-edge">
            <div className="card__header">
              <span className="card__value">
                {value}
              </span>
            </div>
            <div className="card__center">
              <span className="card__value card__value--shadow">
                {value}
              </span>
            </div>
            <div className="card__footer">
              <span className="card__value card__value--upside-down">
                {value}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
}

function getCardColorStyle(value) {
  const style = {background: ''}

  if(value === 0) {
    style.background = '#de7b1f'
  }
  if(value >= 1 && value <= 4) {
    style.background = '#0926b3'
  }
  if(value >= 5 && value <= 8) {
    style.background = '#0b940b'
  }
  if(value >= 9 && value <= 12) {
    style.background = '#b31e1e'    
  }

  return style
}

Card.propTypes = {
  value: PropTypes.number,
  onSelect: PropTypes.func,
}

Card.defaultProps = {
  onSelect: noop
}

export default Card
