import { LitElement, html } from 'lit-element';
import './components/PlayerScoreboard.js';
import './components/GameControls.js';
import './components/nanos/TotalWinners.js';

export class BowlingScoringSystem extends LitElement {

  render() {
    return html`
    <player-scoreboard></player-scoreboard>
    <game-controls></game-controls>
    <total-winners></total-winners>
    `
  };
}
