import {
  ADD_PLAYER,
  NEXT_PLAYER,
  REMOVE_PLAYER,
  ADD_ROLL,
  NEXT_FRAME,
  RESET_GAME,
} from './actions.js';

const INITIAL_STATE = {
  players: [],
  currentPlayer: 0,
}

export const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.player],
      };
    case NEXT_PLAYER: 
      return {
        ...state,
        currentPlayer: action.next === false ? 0 :state.currentPlayer += 1,
      };
    case REMOVE_PLAYER: 
      return {
        ...state,
        players: state.players.splice(0, state.players.length - 1),
      };
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
    case RESET_GAME:
      return {
        ...state,
        players: state.players.map((player) => {
          return {
            ...player,
            currentFrame: 1,
            rolls: Object.assign(player.rolls, Object.values(player.rolls).map(() => []) )
          }
        }),
        currentPlayer: 0,
      }
    default:
      return state;
  }
};
