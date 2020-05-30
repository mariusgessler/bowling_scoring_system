import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  ADD_ROLL,
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
        players: [state.players.roll, action.roll]
      }
    default:
      return state;
  }
};
