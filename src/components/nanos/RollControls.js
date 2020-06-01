import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store.js';
import { advanceGame } from '../../logic/game.js';
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
  }

  stateChanged(state) {
    this.players = state.players;
    this.currentPlayer = state.currentPlayer;
  };


  getRoll() {
    const input = this.shadowRoot.getElementById('getRollsInput');
    this.roll = parseInt(input.value, 10);
    advanceGame(this.players, this.roll, this.currentPlayer)
  };

  render() {
    return html`
    <div class='roll-controls'>
      <mwc-textfield id='getRollsInput' type='number' min=0 max=10 icon='group_work' label='Knocked over pins'></mwc-textfield>
      <mwc-button raised icon='navigate_next' @click='${this.getRoll}'>Next roll</mwc-button>
    </div>`
  }
}

customElements.define('roll-controls', RollControls);
