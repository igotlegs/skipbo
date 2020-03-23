import { connect } from 'react-redux'
import { addCardToGameTable } from './GameActions'
import GameTable from './GameTable'

const mapStateToProps = (state, ownProps) => {
	return {
		selectedCard: state.selectedCard.get('card'),
		cardStacks: state.gameTable.toJS(),
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectCardStack: (stack, card) => {
    	if(Number.isInteger(card)) {
      	dispatch(addCardToGameTable(stack, card))	
    	}
    }
  }
}

const GameTableContainer = connect(mapStateToProps, mapDispatchToProps)(GameTable)

export default GameTableContainer
