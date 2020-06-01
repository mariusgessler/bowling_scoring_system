import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import './nanos/AddPlayer.js';
import './nanos/RemovePlayer.js';
import './nanos/RollControls.js';
import '@material/mwc-button';
import { resetGame } from '../redux/actions.js';

export class GameControls extends connect(store)(LitElement) {
  static get properties() {
    return {
      gameStarted: {
        type: Boolean,
      },
      players: {
        type: Array,
      }
    };
  };

  static get styles() {
    return css`
    .game-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 60px auto 0;
    }

    mwc-button {
      width: 250px;
      margin-top: 15px;
      --mdc-theme-primary: #29B6F6;
     }`
  }

  constructor() {
    super();
    this.gameStarted = false;
  }

  stateChanged(state) {
    this.players = state.players;
  }

  changeGameStatus() {
    this.gameStarted = !this.gameStarted;
    if (!this.gameStarted) {
      store.dispatch(resetGame());
    }
  }

  render() {
    return html`
    <div class='game-controls'>
    ${this.gameStarted ?
      html`<roll-controls></roll-controls>`
      :html`
      <add-player></add-player>
      <remove-player></remove-player>`}
    <mwc-button raised ?disabled='${!Object.values(this.players).length}' 
    @click='${this.changeGameStatus}'>${!this.gameStarted ? 'Start' : 'Reset'} Game</mwc-button>
    </div>`
  }
}

customElements.define('game-controls', GameControls);
