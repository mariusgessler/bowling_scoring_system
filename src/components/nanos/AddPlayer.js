import { LitElement, html } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-textfield';

export class AddPlayer extends LitElement {
  render() {
    return html`
    <div class='player-action__container'>
      <mwc-textfield label='Name' required></mwc-textfield>
      <mwc-button raised icon="add">Add Player</mwc-button>
    </div>`;
  }
}

customElements.define('add-player', AddPlayer);
