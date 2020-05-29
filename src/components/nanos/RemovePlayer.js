import { LitElement, html } from 'lit-element';
import '@material/mwc-button';

export class RemovePlayer extends LitElement {
  render() {
    return html`
    <div class='player-action__container'>
      <mwc-button primary raised icon="remove">Remove Player</mwc-button>
    </div>`;
  }
}

customElements.define('remove-player', RemovePlayer);
