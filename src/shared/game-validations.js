import GameRules from './game-rules'

export function validateAddingCardsToPlayerHand(cards, playerHand) {
  let msg = ''

  if(!Array.isArray(cards) || !Array.isArray(playerHand)) {
    msg = `cards and playerHand must be arrays! Got: ${cards} and ${playerHand}`
    return [false, msg]
  }
  if(cards.length > 0) {
    const additionOK = playerHand.length + cards.length === GameRules.PLAYER_HAND_SIZE

    if(!additionOK) {
      const msgBase = `Player hand must hold ${GameRules.PLAYER_HAND_SIZE} cards! `
      const msgDetail = `Given player hand: ${playerHand.length}, tried to add: ${cards.length} cards.`
      msg = msgBase + msgDetail
    }
    return [additionOK, msg]
  }
  return [false, msg]
}
