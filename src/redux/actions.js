import uid from 'uid';

export const ADD_PLAYER = 'ADD_PLAYER';
export const NEXT_PLAYER = 'NEXT_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const ADD_ROLL = 'ADD_ROLL';
export const NEXT_FRAME = 'NEXT_FRAME';
export const RESET_GAME = 'RESET_GAME';
export const SET_WINNER = 'SET_WINNER';

export const addPlayer = name => {
  return {
    type: ADD_PLAYER,
    player: {
      id: uid(),
      name,
      currentFrame: 1,
      rolls: {
       1: [],
       2: [],
       3: [],
       4: [],
       5: [],
       6: [],
       7: [],
       8: [],
       9: [],
       10: [],
      },
      totalWins: 0,
    }
  };
};

export const nextPlayer = (next) => {
  return {
    type: NEXT_PLAYER,
    next,
  };
};

export const removePlayer = () => {
  return {
    type: REMOVE_PLAYER,
  };
};

export const addRoll = (frame,roll, id) => {
  return {
    type: ADD_ROLL,
    frame,
    roll,
    id,
  };
};

export const nextFrame = (id) => {
  return {
    type: NEXT_FRAME,
    id,
  };
};

export const resetGame = () => {
  return {
    type: RESET_GAME,
  };
};

export const setWinner = (id) => {
  return {
    type: SET_WINNER,
    id,
  };
};
