export const isSkipBo = (card) => Number.isInteger(card) && card === 0

export const isNextCard = (next, current) => {
	if(Number.isInteger(next) && Number.isInteger(current)) {
		return current + 1 === next || isSkipBo(next)
	}
	return false
}

export const noop = () => {}
