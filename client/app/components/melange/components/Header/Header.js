import { LitElement, html } from 'lit'
import { styles } from './styles/header.styles'
import { throttle } from '../misc/utils'

/**
 * Header der Website. Alternative zu <header>.
 * Wird automatisch kleiner auf großen Viewports, wenn die Seite gescrolled wurde.
 *
 * @slot default - Ein oder zwei divs
 *
 */
export class Header extends LitElement {
  static properties = {
    microsite: { type: String }
  }

  static styles = [
    styles
  ]

  constructor () {
    super()

    /** @type {Boolean} Header mit oder ohne Microsite Menü */
    this.microsite = true
  }

  connectedCallback () {
    super.connectedCallback()

    this._addGlobalEvents()

    /**
   * Turn generic element into banner landmark
   */
    this.setAttribute('role', 'banner')
  }

  _addGlobalEvents () {
    // Add/remove `.wm-window-was-scrolled` on the root if the page has been scrolled
    const scrolledOffset = 30
    let lastKnownScrollPosition = window.pageYOffset

    window.addEventListener('scroll', throttle(e => {
      lastKnownScrollPosition = window.pageYOffset

      if (lastKnownScrollPosition > scrolledOffset) {
        document.documentElement.classList.add('wm-window-was-scrolled')
      } else {
        document.documentElement.classList.remove('wm-window-was-scrolled')
      }
    }))
  }

  firstUpdated () {
    /**
    * Add class to <html> to differentiate between Microsites and normal site
    */
    if (this.microsite === 'false') {
      document.documentElement.classList.add('wien')
    }
  }

  addAction (node) {
    this.querySelector('[slot="actions"]').appendChild(node)
  }

  render () {
    return html`
    <div>
      <slot name="header"></slot>
    </div>
    <div class="nav-actions">
      <slot name="actions"></slot>
      <slot name="nav"></slot>
    </div>
    `
  }
}

customElements.define('wm-header', Header)

export const tagName = 'wm-header'
