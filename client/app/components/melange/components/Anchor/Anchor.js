import { LitElement, html } from 'lit'
import { styles } from './styles/anchor.styles'
import { tokens } from './styles/anchor.tokens.js'
import { slug, getNodeIndex } from '../misc/utils.js'

/**
 * Ein Anker ist ein Link zu einer Überschrift oder einem Text weiter unten auf derselben oder einer anderen Seite.
 *
 * @slot default - h2, h3, h4, h5, oder h6
 *
 */

/**
* @cssprop --anchor-gap - Abstand zwischen Text und Link
*/

export class Anchor extends LitElement {
  // Heading passed through light DOM
  get _heading () {
    return this.querySelectorAll('h2, h3, h4, h5, h6')[0] ?? null
  }

  // All anchors on the page
  get _anchors () {
    return document.querySelectorAll('wm-anchor') ?? null
  }

  static properties = {
    _id: { type: String, attribute: false },
    copyText: { type: String },
    id: { type: String },
    icon: { type: String }
  }

  static styles = [tokens, styles]

  constructor () {
    super()

    /**
     * @type {String} - Text für das „Link kopieren“ Icon
     */
    this.copyText = 'Link kopieren'

    /**
     * @type {String} - Icon für den „Link kopieren“-Link
     * @summary id des Icons
     */
    this.icon = 'share'

    /**
     * @type {String} - Die id kann entweder auf dem Element selber oder der Überschrift vergeben werden.
     * @summary Ankerlink
     */
    this.id = ''
  }

  connectedCallback () {
    super.connectedCallback()

    /** @type {String} - Generierte ID */
    this._id = this._generateID()

    // Set generated id
    this._heading.setAttribute('id', this._id)
  }

  /**
   * Get the exisiting id of the heading or generate a unique id
   * @private
   * @returns {String} id for the heading
   */
  _generateID () {
    // Get heading id
    let id = this._heading.getAttribute('id')

    // If the heading has no id
    if (!id) {
      // Generate a slug from the heading's textcontent
      id = slug(this._heading.textContent)

      // If the id already exists, append a number
      if (document.querySelector(`#${id}`)) {
        id += `${getNodeIndex(this._anchors, this)}`
      }
    }

    return id
  }

  /**
   * Lifecycle method
   * @private
   * @param {*} changedProperties
   */
  updated (changedProperties) {
    // If the user provides a custom id on the host itself, use it.
    if (changedProperties.has('id')) {
      if (this.id) {
        this._id = this.id
      }
    }
  }

  render () {
    return html`
      <slot></slot>

      <a href="#${this._id}">
        <wm-icon iconid="${this.icon}">${this.copyText}</wm-icon>
      </a>
    `
  }
}

customElements.define('wm-anchor', Anchor)

export const tagName = 'wm-anchor'
