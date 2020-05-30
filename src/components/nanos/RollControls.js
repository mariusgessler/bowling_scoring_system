import { LitElement, html, css } from 'lit-element';
import { store } from '../../redux/store.js';
import { addRoll } from '../../redux/actions.js';
import '@material/mwc-button';
import '@material/mwc-textfield';
import { isStrike } from '../../logic/logic.js';

export class RollControls extends (LitElement) {
  static get properties() {
    return {
      rolls: {
        type: Array,
      }
    };
  };

  static get styles() {
    return css`
    .roll-controls {
      display: flex;
      flex-direction: column;
    }

    mwc-button {
      width: 250px;
      --mdc-theme-primary: #018786;
    }
    
    mwc-textfield {
      width: 250px;
      margin-bottom: 15px;
    }`
  }

  constructor() {
    super();
    this.score = [];
    this.roll = 0;
    this.numberOfRolls = 0;
  }

  getRoll() {
    const input = this.shadowRoot.getElementById('getRollsInput');
    this.roll = parseInt(input.value, 10);
    if (this.roll) {
      this.score = [...this.score, this.roll]
      store.dispatch(addRoll(this.roll));
    }
    console.log(store.getState())
  };

  render() {
    return html`
    <div class='roll-controls'>
      <mwc-textfield id='getRollsInput' type='number' min=0 max=10 icon='group_work' placeholder='Knocked over pins' required></mwc-textfield>
      <mwc-button raised icon='navigate_next' @click='${this.getRoll}'>Next roll</mwc-button>
    </div>`
  }
}

customElements.define('roll-controls', RollControls);
