import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store.js';
import { advanceGame, isGameOver } from '../../logic/game.js';
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
      },
      currentPlayer: {
        type: Number,
      },
      remaining: {
        type: Number,
      },
    };
  }

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
    }`;
  }

  constructor() {
    super();
    this.roll = 0;
    this.remaining = 10;
  }

  stateChanged(state) {
    this.players = state.players;
    this.currentPlayer = state.currentPlayer;
  }

  getRoll() {
    const input = this.shadowRoot.getElementById('getRollsInput');
    const roll = input.value !== '' && parseInt(input.value, 10);

    if (roll <= 10 && input.value <= this.remaining) {
     this.roll = roll;
     advanceGame(this.players, this.roll, this.currentPlayer);
    } else {
      this.roll = 0;
    }

    this.setRemaining();
  }

  setRemaining() {
    const input = this.shadowRoot.getElementById('getRollsInput');
    const { currentFrame } = this.players[this.currentPlayer];
    const rolls = this.players[this.currentPlayer].rolls[currentFrame];

    if (!rolls.length || rolls.length === 2) {
      this.remaining = 10;
    } else {
      this.remaining = 10 - rolls[0];
    }

    input.value = 0;
  }

  getNextPlayer() {
    const lastPlayer = this.players.length - 1 === this.currentPlayer;
    const { currentFrame } = this.players[this.currentPlayer];

    if (this.players[this.currentPlayer].rolls[currentFrame].length === 2 && lastPlayer) {
      return this.players[0].name;
    }
    if (this.players[this.currentPlayer].rolls[currentFrame].length === 2) {
      return this.players[this.currentPlayer + 1].name;
    }
    return this.players[this.currentPlayer].name;
  }

  render() {
    return html`
    <div class='roll-controls'>
      <mwc-button disabled outlined> ${this.getNextPlayer()}</mwc-button>
      <mwc-textfield id='getRollsInput' type='number' min=0 max='${this.remaining}' icon='group_work' label='${this.remaining} pins remaining'></mwc-textfield>
      <mwc-button ?disabled=${isGameOver(this.players)} raised icon='navigate_next' @click='${this.getRoll}'>Next roll</mwc-button>
    </div>`;
  }
}

customElements.define('roll-controls', RollControls);
