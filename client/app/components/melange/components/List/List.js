import { LitElement, html } from 'lit'
import { styles } from './styles/list.styles'
import { tokens } from './styles/list.tokens.js'

/**
 * Darstellung von Listen vertikal, horizontal oder mit Trenner
 *
 * @slot default - <ol> oder <ul>
 *
 */

/**
* @cssprop --list-border - Rahmen zwischen Listelementen
* @cssprop --list-border-color - Rahmenfarbe
* @cssprop --list-gap - Abstand zwischen Elementen
*/

export class List extends LitElement {
  static properties = {
    clean: { type: String, reflect: true },
    type: { type: String, reflect: true },
    separator: { type: String, reflect: true },
    alignment: { type: String, reflect: true }
  }

  static styles = [tokens, styles]

  constructor () {
    super()

    /**
     * @type {String} Liste ohne Aufzählungszeichen, Innen- und Außenabstand
     * @summary Ohne Formatierung
     */
    this.clean = 'true'

    /**
     * @type {String} Art der Darstellung
     * @summary <code>horizontal</code>, <code>row</code>
     */
    this.type = 'default'

    /**
     * @type {String} Trennzeichen zwischen Elementen
     * @summary <code>pipe</code>
     */
    this.separator = 'none'

    /**
     * @type {String} Ausrichtung der Elemente
     * @summary <code>center</code>
     */
    this.alignment = ''
  }

  render () {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('wm-list', List)

export const tagName = 'wm-list'
