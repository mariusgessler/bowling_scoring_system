import { LitElement, html, css } from 'lit-element';
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

  static get styles() {
    return css`
    .add-player {
      display: flex;
      flex-direction: column;
      width: 250px;
    }

    mwc-textfield {
      margin-bottom: 15px;
    }`;
  }

  addPlayer() {
    const input = this.shadowRoot.getElementById('addPlayerInput');
    this.nameInput = input.value;
    if (this.nameInput) {
      store.dispatch(addPlayer(this.nameInput));
      this.nameInput = '';
    }
    input.value = '';
  }

  render() {
    return html`
    <div class='add-player'>
      <mwc-textfield id='addPlayerInput' placeholder='Enter name' required></mwc-textfield>
      <mwc-button raised icon="add" @click="${this.addPlayer}">Add Player</mwc-button>
    </div>`;
  }
}

customElements.define('add-player', AddPlayer);
