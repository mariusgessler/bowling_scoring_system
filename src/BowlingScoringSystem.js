import { LitElement, html } from 'lit-element';
import './components/nanos/AddPlayer.js';
import './components/nanos/RemovePlayer.js';

export class BowlingScoringSystem extends LitElement {
  render() {
    return html`
    <add-player></add-player>
    <remove-player></remove-player>`;
  }
}
