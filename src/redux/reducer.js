import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  ADD_ROLL,
  NEXT_FRAME,
} from './actions.js';

const INITIAL_STATE = {
  players: [],
}

export const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.player],
      };
    case REMOVE_PLAYER: 
      return {
        ...state,
        players: state.players.splice(0, state.players.length - 1),
      }
    case ADD_ROLL:
      return {
      ...state,
      players: state.players.map((player) => {
        if (player.id === action.id) {
          return {
            ...player,
            rolls: {
              ...player.rolls,
              [action.frame]: [
                ...player.rolls[action.frame],
                action.roll
              ]
            }
          }
        }
        return player;
      })
    };
    case NEXT_FRAME:
      return {
      ...state,
      players: state.players.map((player) => {
        if (player.id === action.id) {
          return {
            ...player,
            currentFrame: player.currentFrame + 1,
          }
        }
        return player;
      })
    }
    default:
      return state;
  }
};
