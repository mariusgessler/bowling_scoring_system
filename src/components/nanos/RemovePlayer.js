import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store.js';
import { removePlayer } from '../../redux/actions.js';
import '@material/mwc-button';

export class RemovePlayer extends connect(store)(LitElement) {
  static get properties() {
    return {
      players: {
        type: Array,
      }
    };
  };

  static get styles() {
    return css`
     mwc-button {
      --mdc-theme-primary: #B00020;
     }`
  }

  stateChanged(state) {
    this.players = state.players;
  };

  removePlayer() {
    if (this.players) {
      store.dispatch(removePlayer())
    };
  };

  render() {
    return html`
    <mwc-button class='themed' raised ?disabled = ${!Object.values(this.players).length}  icon="remove" @click="${this.removePlayer}">Remove Player</mwc-button>`
  };
};

customElements.define('remove-player', RemovePlayer);
