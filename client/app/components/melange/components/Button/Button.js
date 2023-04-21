import { LitElement, html } from 'lit'
import { tokens } from './styles/button.tokens'
import { styles } from './styles/button.styles'

/**
 * Link oder Button im Wiener Melange Style.
 *
 * @slot default - Link oder Button
 */

/**
* @cssprop --button-background - Hintergrundfarbe des Buttons
* @cssprop --button-border - Rahmenfarbe des Buttons
* @cssprop --button-color - Textfarbe des Buttons
* @cssprop --button-text-transform - Groß-/Kleinschreibung
*/

export class Button extends LitElement {
  static properties = {
    kind: { type: String, reflect: true },
    color: { type: String, reflect: true },
    full: { type: Boolean, reflect: true },
    alignment: { type: String, reflect: true }
  }

  static styles = [tokens, styles]

  constructor () {
    super()

    /**
     * @type {String} - Art des Buttons
     * @summary <code>primary</code> - Primärer Standardbutton<br>
     * <code>secondary</code> - Invertierter Sekundärbutton<br>
     * <code>tertiary</code> - Tertiärer Buttons, der wie ein Link aussieht<br>
     * <code>clean</code> - Button ohne Hintergrundfarbe, Innenabstand, Rahmen, etc.
     * <code>tag</code> - Button, der aussieht wie ein Tag
     */
    this.kind = 'primary'

    /** @type {Boolean} - Button über die volle Breite darstellen */
    this.full = false

    /**
     * @type {String} - Inhalt im Button zentrieren
     * @summary <code>center</code>, <code>space-between</code>
     */
    this.alignment = false

    /** @type {string} - Hintergrundfarbe des Buttons. */
    this.color = undefined
  }

  render () {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('wm-button', Button)

export const tagName = 'wm-button'
