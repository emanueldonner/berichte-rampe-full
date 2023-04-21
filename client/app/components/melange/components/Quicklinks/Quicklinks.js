import { LitElement, html } from 'lit'
import { tokens } from './styles/quicklinks.tokens'
import { styles } from './styles/quicklinks.styles'

/**
 * Darstellung von Linklisten als CTA in 1-3 Spalten
 *
 * @slot default - Liste
 */

/**
* @cssprop --quicklinks-gap - Abstand zwischen Spalten
*/

export class Quicklinks extends LitElement {
  static properties = {
    cols: { type: String }
  }

  static styles = [tokens, styles]

  constructor () {
    super()

    /**
     * @type {string} - Anzahl der Spalten
     * @summary 1, 2 oder 3
     */
    this.cols = '1'
  }

  render () {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('wm-quicklinks', Quicklinks)

export const tagName = 'wm-quicklinks'
