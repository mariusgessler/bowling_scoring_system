import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store.js';
import '@material/mwc-list';

export class TotalWinners extends connect(store)(LitElement) {
  static get properties() {
    return {
      players: {
        type: Array
      }
    };
  }

  static get styles() {
    return css`
    mwc-list {
      margin: 65px auto;
      width: 250px;
      min-height: 300px;
    }`;
  }

  stateChanged(state) {
    this.players = state.players;
  }

  render() {
    return html`
    <mwc-list>
      <mwc-list-item>
        <span>Total Wins</span>
      </mwc-list-item>
      <li divider role="separator"></li>
    ${this.players.map((player) => html`
      <mwc-list-item>${player.name}: ${player.totalWins}</mwc-list-item> <br/>
    ` )}
    </mwc-list>`;
  }
}

customElements.define('total-winners', TotalWinners);
