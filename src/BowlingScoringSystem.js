import { LitElement, html } from 'lit-element';
import './components/nanos/AddRemovePlayer.js';

export class BowlingScoringSystem extends LitElement {
  render() {
    return html`
    <add-remove-player></add-remove-player>`;
  }
}
