import { LitElement, html,css } from 'lit-element';
import { connect } from 'pwa-helpers'; // connects a Custom Element base class to the Redux store
import { store } from '../redux/store.js';
import { getGameTotal, getFrameTotal } from '../logic/game.js';
import '@material/mwc-textfield';

export class PlayerScoreboard extends connect(store)(LitElement) {
  static get properties() {
    return {
      players: {
        type: Array,
      }
    };
  }

  static get styles() {
    return css`

    .mdc-data-table {
      width: 100%;
    }

    .total_frame {
      text-align: center;
      background-color: whitesmoke;
    }

    .mdc-data-table__cell[colspan='1'] {
      text-align: center;
      width: 55px;
    }

    .frames {
      text-align: center;
    }`;
  }

  constructor() {
    super();
    this.frames = Array.from(Array(10).keys());
  }

  stateChanged(state) {
    this.players = state.players;
  }

  render() {
    return html`
    <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet">
    <div class="mdc-data-table">
      <div class='mdc-data-table__table-container'>
      <table class="mdc-data-table__table" aria-label="Scoreboard">
        <thead>
          <tr class="mdc-data-table__header-row">
            <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Name</th>
            ${this.frames.map((i) => html`<th class="mdc-data-table__header-cell frames" role="columnheader" colspan="2" scope="col">${i + 1}</th>`)}
            <th class="mdc-data-table__header-cell" role="columnheader" >Total</th>
          </tr>
        </thead>
        <tbody class="mdc-data-table__content">
            ${this.players.map((player) => html`
            <tr class='mdc-data-table__row'>
              <td class='mdc-data-table__cell' rowspan='2'> ${player.name}</td>
              ${this.frames.map((i) => html`
              <td class='mdc-data-table__cell' colspan='1'>${player.rolls[i+1][0]}</td>
              <td class='mdc-data-table__cell' colspan='1'>${player.rolls[i+1][1]}</td>`)}
              <td class='mdc-data-table__cell' rowspan='2'> ${getGameTotal(player.rolls)}</td>
            </tr>
            <tr class="mdc-data-table__row">
              ${this.frames.map((i) => html`
              <td class='mdc-data-table__cell total_frame' colspan="2">
              ${getFrameTotal(player.rolls[i + 1])}
              </td>`)}
            </tr>`
            )}
          </tbody>
        </tbody>
      </table>
      <div>
    </div>`;
  }
}

customElements.define('player-scoreboard', PlayerScoreboard);
