import { store } from '../redux/store.js';
import { addRoll, nextFrame, nextPlayer } from '../redux/actions.js';

export const getGameTotal = (rolls) => {
  let total = 0;

  Object.values(rolls).forEach((frames) => {
    if (frames.length) {
      frames.forEach((singleRoll) => {
          total += singleRoll;
      });
    };
  });
  return total; // Shave off the strike symbol
};

export const getFrameTotal = (rolls) => {
  let total = null;
  rolls.forEach((roll) => {
    total += roll;
  })
  return total;
}

export const calculateRolls = (frame,roll, player) => {
  store.dispatch(addRoll(frame, roll, player));

  const getPrevRoll = ( rollsBack ) => {
    return store.getState().players.find((i) => i.id === player).rolls[frame - rollsBack]
  }
  const currentRoll = store.getState().players.find((i) => i.id === player).rolls[frame]

  if (currentRoll[0] === 10) {
    store.dispatch(addRoll(frame, 0, player));
  } 

    if (getPrevRoll(1) && getPrevRoll(1)[0] === 10) {
      store.dispatch(addRoll(frame - 1,roll, player ))
      if (getPrevRoll(2) && getPrevRoll(2)[0] === 10) {
        store.dispatch(addRoll(frame - 2,roll, player ))
      }
    }

  if (getPrevRoll(1) && (getPrevRoll(1)[0] + getPrevRoll(1)[1] === 10) && (getPrevRoll(1)[0] !== 10)) {
    if(currentRoll.length !== 2) {
      store.dispatch(addRoll(frame - 1,currentRoll[0], player ))
    }
  }
}


export const advanceGame = (players, roll, currentPlayer) => {
  const lastPlayer = players.length - 1 === currentPlayer;
  const { currentFrame } = players[currentPlayer];
 
  if (players[currentPlayer].rolls[currentFrame].length === 2 && !lastPlayer) {
    store.dispatch(nextPlayer(true));
    const updatedPlayer = store.getState().currentPlayer;
    
    store.dispatch(nextFrame(players[currentPlayer].id));
    const updatedFrame = store.getState().players[updatedPlayer].currentFrame;

    calculateRolls(updatedFrame, roll, players[updatedPlayer].id);
  } else if ((players[currentPlayer].rolls[currentFrame].length === 2 && lastPlayer)) {
    store.dispatch(nextPlayer(false));
    const updatedPlayer = store.getState().currentPlayer;

    store.dispatch(nextFrame(players[currentPlayer].id));
    const updatedFrame = store.getState().players[updatedPlayer].currentFrame;

    calculateRolls(updatedFrame, roll, players[updatedPlayer].id);
  } else {
    calculateRolls(currentFrame, roll, players[currentPlayer].id);
  }
};

export const getRemaining = (players, roll, currentPlayer) => {
  const  { currentFrame } = players[currentPlayer];
  return 10 - players[currentPlayer].rolls[currentFrame];
}
