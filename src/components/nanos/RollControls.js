import { LitElement, html, css } from 'lit-element';
import { store } from '../../redux/store';
import '@material/mwc-button';
import '@material/mwc-textfield';

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
    mwc-button {
      --mdc-theme-primary: #018786;
    }`
  }

  constructor() {
    super();
    this.score = [];
    this.roll = 0;
  }

  getRolls() {
    const input = this.shadowRoot.getElementById('getRollsInput');
    this.roll = input.value;
    if (this.roll) {
      this.score = [...this.score, this.roll]
    }
  };

  render() {
    return html`
    <mwc-textfield id='getRollsInput' type='number' min=0 max=10 icon='group_work' placeholder='Knocked over pins' required></mwc-textfield>
    <mwc-button raised icon='navigate_next' @click='${this.getRolls}'>Next roll</mwc-button>
    `
  }
}

customElements.define('roll-controls', RollControls);
