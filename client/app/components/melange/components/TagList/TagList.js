import { LitElement, html } from 'lit'
import { styles } from './styles/taglist.styles'

/**
 * Horizontale Liste vom Tags
 *
 * @slot default - Liste
 */

export class TagList extends LitElement {
  static properties = {
    scrollable: { type: Boolean }
  }

  static styles = [styles]

  constructor () {
    super()

    /** @type {string} - Sollen Tags gescrolled werden oder umbrechen?  */
    this.scrollable = false
  }

  render () {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('wm-tag-list', TagList)

export const tagName = 'wm-tag-list'
