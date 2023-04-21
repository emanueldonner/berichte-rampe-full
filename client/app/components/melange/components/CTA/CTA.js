import { LitElement, html } from 'lit'
import { styles } from './styles/cta.styles'
import { tokens } from './styles/cta.tokens.js'

/**
 * Komponente zur Darstellung CTA Links oder Button, die aussehen wie Links.
 *
 * @slot default - Link oder Button
 *
 */

/**
* @cssprop --cta-icon - Ausrichtung der Tabs in der tablist
* @cssprop --cta-icon-start - Ausrichtung der Tabs in der tablist
* @cssprop --cta-color-link - Standard :link Farbe
* @cssprop --cta-color-visited - Standard :visited Farbe
* @cssprop --cta-font-variation-settings - Schriftstärke für WM Variablefont
* @cssprop --cta-font-weight - Standard-Schriftstärke
* @cssprop --cta-padding - Innenabstand
* @cssprop --cta-padding-start - Innenabstand
*/

export class CTA extends LitElement {
  static properties = {
    full: { type: String, reflect: true },
    start: { type: String, reflect: true }
  }

  static styles = [tokens, styles]

  constructor () {
    super()

    /** @type {string} - Über die volle Breite anzeigen */
    this.full = 'false'
    /** @type {string} - Pfeil auf der linken Seite */
    this.start = 'false'
  }

  render () {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('wm-cta', CTA)

export const tagName = 'wm-cta'
