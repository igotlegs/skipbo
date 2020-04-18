export const isSkipBo = (card) => {
  if(!isCard(card)) {
    return false
  }
  return Number.isInteger(card.number) && card.number === 0
}

export const isNextCard = (next, current) => {
  if(!isCard(next) || !isCard(current)) {
    return false
  }
	if(Number.isInteger(next.number) && Number.isInteger(current.number)) {
		return current.number + 1 === next.number || isSkipBo(next)
	}
	return false
}

export const isCard = (card) => {
  const keys = Object.keys(card)
  return keys.includes('id') && keys.includes('number')
}

export const noop = () => {}
