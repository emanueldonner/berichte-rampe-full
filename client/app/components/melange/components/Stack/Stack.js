import { LitElement, html } from 'lit'
import { styles } from './styles/stack.styles'
import { tokens } from './styles/stack.tokens.js'

/**
 * Komponeten zur vertikalen oder horizontalen Ausrichtung von Elementen
 *
 * @slot default - HTML oder Text-Content
 */

/**
* @cssprop --stack-spacing - Abstand Standard
* @cssprop --stack-spacing-xs - Abstand XS
* @cssprop --stack-spacing-s - Abstand S
* @cssprop --stack-spacing-m - Abstand M
* @cssprop --stack-spacing-l - Abstand L
*/

export class Stack extends LitElement {
  static properties = {
    gap: { type: String, reflect: true },
    gapx: { type: String, reflect: true },
    gapy: { type: String, reflect: true },
    grow: { type: String, reflect: true },
    equal: { type: String, reflect: true },
    wrap: { type: String, reflect: true },
    vertical: { type: String, reflect: true },
    horizontal: { type: String, reflect: true },
    alignment: { type: String, reflect: true },
    justify: { type: String, reflect: true }
  }

  static styles = [tokens, styles]

  constructor () {
    super()

    /**
     * @type {String} Abstand zwischen Elementen
     * @summary <code>default</code>, <code>xs</code>, <code>s</code>, <code>m</code>, <code>l</code>
     */
    this.gap = 'default'

    /**
     * @type {String} Horizontaler Abstand zwischen Elementen
     * @summary <code>default</code>, <code>xs</code>, <code>s</code>, <code>m</code>, <code>l</code>
     */
    this.gapx = undefined

    /**
     * @type {String} Vertikaler Abstand zwischen Elementen
     * @summary <code>default</code>, <code>xs</code>, <code>s</code>, <code>m</code>, <code>l</code>
     */
    this.gapy = undefined

    /** @type {String} Elternelement füllen */
    this.grow = true

    /** @type {String} Gleich breit oder nur breit wie der Inhalt. */
    this.equal = true

    /** @type {String} In einer oder mehreren Zeilen darstellen. */
    this.wrap = false

    /** @type {String} Vertikal darstellen */
    this.vertical = false

    /** @type {String} Immer horizontal darstellen */
    this.horizontal = undefined

    /** @type {String} Ausrichtung auf der Hauptachse */
    this.justify = undefined

    /** @type {String} Ausrichtung auf der Gegenachse */
    this.alignment = undefined
  }

  render () {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('wm-stack', Stack)

export const tagName = 'wm-stack'
