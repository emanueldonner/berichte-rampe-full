import { LitElement, html } from 'lit'
import { tokens } from './styles/highlight.tokens'
import { styles } from './styles/highlight.styles'

/**
 * Farbliche Texthervorhebung
 *
 * @slot default - HTML oder Text-Content
 */

/**
* @cssprop --highlight-background - Hintergrundfarbe
* @cssprop --highlight-color - Textfarbe
* @cssprop --highlight-padding - Innenabstand
* @cssprop --highlight-padding-large - Innenabstand für Large-Variante
*/

export class Highlight extends LitElement {
  static properties = {
    color: { type: String, reflect: true },
    type: { type: String, reflect: true }
  }

  static styles = [tokens, styles]

  constructor () {
    super()

    /**
     * @type {string} - Farbe
     * @summary <code>abendstimmung</code>, <code>abendstimmung-light</code>, <code>flieder</code>, <code>flieder-light</code>, <code>frischgruen</code>, <code>frischgruen-light</code>, <code>goldgelb</code>, <code>goldgelb-light</code>, <code>morgenrot</code>, <code>morgenrot-light</code>, <code>nebelgrau</code>, <code>nebelgrau-light</code>, <code>wasserblau</code>, <code>wasserblau-light</code>
     */
    this.color = 'nebelgrau-light'
    /**
     * @type {string} - Art der Hervorhebung
     * @summary <code>large</code>
     */
    this.type = ''
  }

  render () {
    return html`
      <div class="content">
        <slot></slot>
      </div>
    `
  }
}

customElements.define('wm-highlight', Highlight)

export const tagName = 'wm-highlight'
