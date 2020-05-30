import { LitElement, html,css } from 'lit-element';
import { connect } from 'pwa-helpers'; // connects a Custom Element base class to the Redux store
import { store } from '../redux/store.js';
import '@material/mwc-textfield'

export class PlayerScoreboard extends connect(store)(LitElement) {
  static get properties() {
    return {
      players: {
        type: Array,
      }
    };
  };

  static get style() {
    return css`
    
    `
  }

  stateChanged(state) {
    this.players = state.players;
    this.frames = Array.from(Array(10).keys())
  }

  render() {
    return html`
    <div class='player-scoreboard__container'>
      <table class="player-scoreboard">
        <thead>
          <tr>
            <th class='player-scoreboard__name'>Name</th>
            ${this.frames.map((i) => html`<th class='player-scoreboard__frame' colspan='2'>${i}</th>`)}
            <th class='player-scoreboard__total_score'>Total Score </th>
          </tr>
        </thead>
        <tbody>
          ${this.players.map((player) => html`
          <tr>
            <td class='player-scoreboard__name' rowspan='2'> ${player.name}</td>
            ${this.frames.map(() => html`
            <td class='player-scoreboard__points' colspan='1'>0</td>
            <td class='player-scoreboard__points' colspan='1'>0</td>`)}
            `)}
          </tr>
          ${this.players.map(() => html`
          <tr>
            ${this.frames.map(() => html`
            <td class='player-scoreboard__total_points_frame' colspan='2'>
              0
            </td>`)}
          </tr>
          `)}
        </tbody>
      </table>
    </div>`
  }
}

customElements.define('player-scoreboard', PlayerScoreboard);