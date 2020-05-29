import { LitElement, html } from 'lit-element';
import { store } from '../../redux/store.js';
import { addPlayer, removePlayer } from '../../redux/actions.js';
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

  constructor() {
    super();
    this.nameInput = '';
  };

  addPlayer() {
    const input = this.shadowRoot.getElementById('addPlayerInput')
    this.nameInput = input.value;
    if (this.nameInput) {
      store.dispatch(addPlayer(this.nameInput));
      this.nameInput = ''
    }
    input.value = '';
  }

  static removePlayer() {
    store.dispatch(removePlayer());
  }

  render() {
    return html`
    <div class='add-remove-player__container'>
      <mwc-textfield id='addPlayerInput' placeholder='Enter name' required></mwc-textfield>
      <mwc-button raised icon="add" @click="${this.addPlayer}">Add Player</mwc-button>
      <mwc-button raised icon="remove" @click="${AddPlayer.removePlayer}">Remove Player</mwc-button>
    </div>`;
  }
}

customElements.define('add-remove-player', AddPlayer);
