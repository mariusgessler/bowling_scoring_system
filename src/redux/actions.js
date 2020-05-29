export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export const addPlayer = name => {
  return {
    type: ADD_PLAYER,
    player: {
      name,
      totalScore: 0,
      winner: false,
    }
  }
}

export const removePlayer = () => {
  return {
    type: REMOVE_PLAYER,
  }
}

// export const resetGame = () => {
//   return {
//     type: RESET_GAME,
//     // give each player score of zero
//   }
// }