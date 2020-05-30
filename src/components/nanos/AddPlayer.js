import { LitElement, html } from 'lit-element';
import { store } from '../../redux/store.js';
import { addPlayer } from '../../redux/actions.js';
import '@material/mwc-button';
import '@material/mwc-textfield';

export class AddPlayer extends (LitElement) {
  static get properties() {
    return {
      nameInput: { 
        type: String,
       },
    };
  }

  addPlayer() {
    const input = this.shadowRoot.getElementById('addPlayerInput');
    this.nameInput = input.value;
    if (this.nameInput) {
      store.dispatch(addPlayer(this.nameInput));
      this.nameInput = '';
    }
    input.value = '';
  };

  render() {
    return html`
      <mwc-textfield id='addPlayerInput' placeholder='Enter name' required></mwc-textfield>
      <mwc-button raised icon="add" @click="${this.addPlayer}">Add Player</mwc-button>`;
  }
}

customElements.define('add-player', AddPlayer);
