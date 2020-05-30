import uid from 'uid';

export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const ADD_ROLL = 'ADD_ROLL';

export const addPlayer = name => {
  return {
    type: ADD_PLAYER,
    player: {
      id: uid(),
      name,
      roll: 0,
      totalWins: 0,
    }
  }
}

export const removePlayer = () => {
  return {
    type: REMOVE_PLAYER,
  }
}

export const addRoll = roll => {
  return {
    type: ADD_ROLL,
    player: {
      roll
    }
  }
}

// export const resetGame = () => {
//   return {
//     type: RESET_GAME,
//     // give each player score of zero
//   }
// }