import { LitElement, html } from 'lit'
import { styles } from './styles/grid.styles'
import { tokens } from './styles/grid.tokens'

/**
 * Komponente zur Darstellung eines Grid Layouts
 *
 * @slot Cards
 */

/**
* @cssprop --grid-spacing - Abstand Standard
* @cssprop --grid-spacing-xs - Abstand XS
* @cssprop --grid-spacing-s - Abstand S
* @cssprop --grid-spacing-m - Abstand M
* @cssprop --grid-spacing-l - Abstand L
*/

export class Grid extends LitElement {
  static properties = {
    gap: { type: String, reflect: true },
    size: { type: String, reflect: true }
  }

  constructor () {
    super()

    /** @type {String} Abstand zwischen Elementen */
    this.gap = 'default'
    /** @type {String} Größe der Elemente - Cards */
    this.size = 'm'
  }

  static styles = [tokens, styles]

  render () {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('wm-grid', Grid)

export const tagName = 'wm-grid'
