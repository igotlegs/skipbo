import React from 'react'
import PropTypes from 'prop-types'

const PlayerHand = (props) => {
  
    return (
      <div>  
        <div onClick={() => props.onPickCard(1)}>
          blue 1        
        </div>

        <div onClick={() => props.onPickCard(2)}>
          blue 2        
        </div>

        <div onClick={() => props.onPickCard(11)}>
          red 11       
        </div>

        <div onClick={() => props.onPickCard(7)}>
          green 7        
        </div>

        <div onClick={() => props.onPickCard(0)}>
          skipbo       
        </div>
      </div>
    )
}

PlayerHand.propTypes = {
  onPickCard: PropTypes.func.isRequired
}

export default PlayerHand