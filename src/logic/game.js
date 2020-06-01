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
  return total;
};

export const getFrameTotal = (rolls) => {
  let total = null;
  rolls.forEach((roll) => {
    total += roll;
  })
  return total;
}


export const advanceGame = (players, roll, currentPlayer) => {
  const lastPlayer = players.length - 1 === currentPlayer;
  const { currentFrame } = players[currentPlayer];
 
  if (players[currentPlayer].rolls[currentFrame].length === 2 && !lastPlayer) {
    store.dispatch(nextPlayer(true));
    const updatedPlayer = store.getState().currentPlayer;
    
    store.dispatch(nextFrame(players[currentPlayer].id));
    const updatedFrame = store.getState().players[updatedPlayer].currentFrame;

    store.dispatch(addRoll(updatedFrame, roll, players[updatedPlayer].id));
  } else if ((players[currentPlayer].rolls[currentFrame].length === 2 && lastPlayer)) {
    store.dispatch(nextPlayer(false));
    const updatedPlayer = store.getState().currentPlayer;

    store.dispatch(nextFrame(players[currentPlayer].id));
    const updatedFrame = store.getState().players[updatedPlayer].currentFrame;

    store.dispatch(addRoll(updatedFrame, roll, players[updatedPlayer].id));
  } else {
    store.dispatch(addRoll(currentFrame, roll, players[currentPlayer].id));
  }
};
