import { connect } from 'react-redux'
import { addCardToGameTable } from '../actions/GameActions'
import GameTable from '../components/GameTable'

const mapStateToProps = (state, ownProps) => {
	return {
		selectedCard: state.selectedCard.get('card'),
		cardStacks: state.gameTable.get('stacks').toJS(),
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
