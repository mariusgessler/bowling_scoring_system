import { LitElement, html } from 'lit-element';
import './components/PlayerScoreboard.js';
import './components/ScoreboardControls.js';
import './components/GameControls.js';

export class BowlingScoringSystem extends LitElement {
  render() {
    return html`
    <player-scoreboard></player-scoreboard>
    <scoreboard-controls></scoreboard-controls>
    <game-controls></game-controls>`
  }
}
