import { LitElement, html } from 'lit'
import { tokens } from './styles/tag.tokens'
import { styles } from './styles/tag.styles'

/**
 * Link oder Button mit Link(s) zu verwandten Seiten
 *
 * @slot default - Link oder Liste mit Links
 */

/**
* @cssprop --tag-background - Hintergrundfarbe
* @cssprop --tag-background-hover - Hintergrundfarbe aktiv
* @cssprop --tag-border - Rahmenfarbe
* @cssprop --tag-padding-inline - Padding vertikal
* @cssprop --tag-padding-block - Padding horizontal
* @cssprop --tag-padding-inline-large - Padding vertikal (groß)
* @cssprop --tag-padding-block-large - Padding horizontal (groß)
* @cssprop --tag-gap - Gap im Button oder Link
* @cssprop --tag-min-height - Mindesthöhe
* @cssprop --tag-min-height-large - Mindesthöhe (groß)
* @cssprop --tag-link-color - Linkfarbe
* @cssprop --tag-font-size - Schriftgröße
*/

export class Tag extends LitElement {
  /**
   * @summary Button for dropdown tags
   * @private
   */
  get _button () {
    return this.shadowRoot?.querySelector('wm-button') ?? null
  }

  /**
   * @summary The slotted list of links
   * @private
   */
  get _list () {
    return this.shadowRoot?.querySelector('ul') ?? null
  }

  static properties = { }
  static styles = [tokens, styles]

  connectedCallback () {
    super.connectedCallback()
    // Move the links from light to shadow DOM
    this.shadowRoot.append(...this.childNodes)

    if (this._list) {
      // events
      this._button.addEventListener('click', this.toggle)
      this.addEventListener('keyup', this._closeOnEscape)
      document.addEventListener('click', this._clickOutSide)

      // get the largest item within the list so that the list can expand properly
      this._largestItem = this._dropdownTagGetLargestItem()

      // set with of the visible tag explicitly
      this.style.width = `${this.offsetWidth}px`
    }
  }

  /**
   * @summary Close on escape
   * @private
   * @param {(event)} event - Event
   */
  _closeOnEscape (e) {
    if (e.code === 'Escape') {
      this.close()
    }
  }

  /**
   * Listens for clicks outside of wm-tag
   * @summary Close on click outside
   * @private
   * @param {(event)} event - Event
   */
  _clickOutSide = (e) => {
    if (!e.target.closest('wm-tag')) {
      this.close()
    }
  }

  /**
   * The list is potentially larger then the selected tag. To style it properly we need to get the largest item in the list.
   * @summary Get largest item in list
   * @private
   */
  _dropdownTagGetLargestItem () {
    // Show list
    this._list.style.display = 'block'

    // Get the width
    const largest = this._list.offsetWidth

    // Hide it again
    this._list.removeAttribute('style')

    return largest
  }

  /**
   * @summary Close or opem the list
   */
  toggle = (e) => {
    if (e) e.preventDefault()
    const isOpen = this.getAttribute('open') !== 'true'

    if (isOpen) {
      this.open()
    } else {
      this.close()
    }
  }

  /**
   * @summary Open the list
   */
  open () {
    this.setAttribute('open', true)

    if (this._largestItem < this._button.offsetWidth) {
      this._list.style.width = `${this._button.offsetWidth}px`
    } else {
      this._button.style.width = `${this._largestItem}px`
    }
  }

  /**
   * @summary Close the list
   */
  close () {
    this.setAttribute('open', false)
    this._button.removeAttribute('style')
  }

  render () {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('wm-tag', Tag)

export const tagName = 'wm-tag'
