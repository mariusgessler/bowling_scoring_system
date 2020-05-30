import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import './nanos/AddPlayer.js';
import './nanos/RemovePlayer.js';
import '@material/mwc-button';

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
    mwc-button {
      --mdc-theme-primary: #29B6F6;
     }`
  }

  stateChanged(state) {
    this.gameStarted = false;
    this.players = state.players;
  }

  changeGameStatus() {
    this.gameStarted = !this.gameStarted;
    if (!this.gameStarted) {
      // reset stats;
    }
  }

  render() {
    return html`
    ${!this.gameStarted ?
      html`
      <add-player></add-player>
      <remove-player></remove-player>` : ''}
      <mwc-button raised ?disabled='${!Object.values(this.players).length}' 
        @click='${this.changeGameStatus}'>${!this.gameStarted ? 'Start' : 'Reset'} Game</mwc-button>`
  }
}

customElements.define('game-controls', GameControls);
