import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store.js';
import { addRoll, nextFrame } from '../../redux/actions.js';
import '@material/mwc-button';
import '@material/mwc-textfield';

export class RollControls extends connect(store)(LitElement) {
  static get properties() {
    return {
      rolls: {
        type: Array,
      },
      players: {
        type: Array,
      }
    };
  };

  static get styles() {
    return css`
    .roll-controls {
      display: flex;
      flex-direction: column;
    }

    mwc-button {
      width: 250px;
      --mdc-theme-primary: #018786;
    }
    
    mwc-textfield {
      width: 250px;
      margin-bottom: 15px;
    }`
  }

  constructor() {
    super();
    this.roll = 0;
    this.numberOfRolls = 0; // Start at -1 so player can go twice in first frame;
    this.playersTurn = 0;
    // this.currentFrame = 1;
    this.nextPlayer = false;
  }

  stateChanged(state) {
    this.players = state.players;
  };


  getRoll() {
    const input = this.shadowRoot.getElementById('getRollsInput');
    this.roll = parseInt(input.value, 10);
    
    this.addRoll();
  };

  addRoll() {
    const { currentFrame } = this.players[this.playersTurn];
    const lastPlayer = this.players.length - 1 === this.playersTurn;

    if (this.players[this.playersTurn].rolls[currentFrame].length !== 2) {
      this.nextPlayer = false;
      store.dispatch(addRoll(this.players[this.playersTurn].currentFrame, this.roll, this.players[this.playersTurn].id));
    } else if (lastPlayer) {
        store.dispatch(nextFrame(this.players[this.playersTurn].id))
        this.playersTurn = 0;
        this.nextPlayer = true;
        store.dispatch(addRoll(this.players[this.playersTurn].currentFrame, this.roll, this.players[this.playersTurn].id));
    } else {
      store.dispatch(nextFrame(this.players[this.playersTurn].id));
      this.playersTurn++;
      this.nextPlayer = true;
      store.dispatch(addRoll(this.players[this.playersTurn].currentFrame, this.roll, this.players[this.playersTurn].id));
    }
  };

  render() {
    return html`
    <div class='roll-controls'>
      <mwc-textfield id='getRollsInput' type='number' min=0 max=10 icon='group_work' placeholder='Knocked over pins' required></mwc-textfield>
      <mwc-button raised icon='navigate_next' @click='${this.getRoll}'>Next roll</mwc-button>
    </div>`
  }
}

customElements.define('roll-controls', RollControls);

// Add rolls to player in score
// After clicking 'Next roll' twice go to next player
// If at the last player go to first one again