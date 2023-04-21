import { LitElement, html } from 'lit'
import { tokens } from './styles/section.tokens'
import { styles } from './styles/section.styles'
import { randomHash } from '../misc/utils.js'
import { when } from 'lit/directives/when.js'

/**
 * Große Hauptbereiche einer Seite
 *
 * @slot default - HTML oder Text-Content
 *
 */

/**
* @cssprop --section-background - Hintergrundfarbe
* @cssprop --section-border-color - Rahmenfarbe
* @cssprop --section-border-width - Rahmenstärke
* @cssprop --section-padding - Innenabstand
* @cssprop --section-padding-highlight - Innenabstand hervorgehoben
* @cssprop --section-padding-highlight-large - Innenabstand hervorgehoben groß
* @cssprop --section-background-highlight - Hintergrundfarbe hervorgehoben
* @cssprop --section-nav-shadow - Schatten der Navigation
* @cssprop --section-nav-link-padding - Schatten der Navigation
* @cssprop --section-nav-link-highlight - Link Hintergrundfarbe in der Navigation mobil
* @cssprop --section-nav-link-highlight-large - Link Hintergrundfarbe in der Navigation
* @cssprop --section-nav-background - Hintergrundfarbe der Navigation mobil
* @cssprop --section-nav-background-large - Hintergrundfarbe der Navigation
*/

export class Section extends LitElement {
  static properties = {
    highlight: { type: String, reflect: true },
    type: { type: String, reflect: true },
    nav: { type: String, reflect: true },
    contentsize: { type: String, reflect: true },
    _links: { type: Array, attribute: false }
  }

  static styles = [tokens, styles]

  /**
   * @type {Object} Slotted headings
   * @private
   */
  get _headings () {
    return this.querySelectorAll(':is(h2[id], h3[id], [data-heading]):not([data-heading="false"])') ?? null
  }

  /**
   * @type {Node} In page navigation
   * @private
   */
  get _nav () {
    return this.shadowRoot.querySelector('nav') ?? null
  }

  /**
   * @type {Node} Toggle button for in page navigation
   * @private
   */
  get _toggleButton () {
    return document.querySelector('.wm-section-toggle button') ?? null
  }

  constructor () {
    super()

    /** @type {Boolean} Section mit oder ohne Hintergrund. */
    this.highlight = undefined

    /**
     * @type {String} Art der Section
     * @summary <code>full</code>
     */
    this.type = undefined

    /**
     * @type {String} Art der Navigation
     * @summary <code>scroll</code>, <code>toggle</code>
     */
    this.nav = undefined

    /**
     * @type {String} Art der Navigation
     * @summary <code>full</code>, <code>text</code>
     */
    this.contentSize = 'full'

    /**
     * @type {Object} Array of links for the in page nav
     * @private
     */
    this._links = []

    /**
     * @type {Object} Settings for the navigation
     * @private
     */
    this._options = {
      offset: 0
    }
  }

  firstUpdated () {
    this._addControls()
  }

  updated (changedProperties) {
    if (changedProperties.has('nav')) {
      this._addControls()
    }
  }

  connectedCallback () {
    super.connectedCallback()

    // Fetch headings
    this._getItems()
    // Watch scroll and resize event
    this._addGlobalEvents()
  }

  /**
   * Reads CSS custom properties that contain the header's height
   * add some extra spacing and converts the value to pixels
   * @privat
   */
  _getOffsetFromTopEdge () {
    this._options.offset = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-nav-height')) + 1.6) * 16
  }

  /**
   * Add a toggle button to the wm-header's actions
   * @privat
   */
  _addControls () {
    if (this.nav === 'toggle') {
      const header = document.querySelector('wm-header')
      const wmButton = this.shadowRoot.querySelector('#toggle-button').content.cloneNode(true).children[0]
      const button = wmButton.querySelector('button')

      wmButton.addEventListener('click', e => {
        this._nav.classList.toggle('nav-hidden')
        document.documentElement.classList.toggle('wm-is-locked')

        const isOpen = button.getAttribute('aria-expanded') === 'true'

        button.setAttribute('aria-expanded', !isOpen)

        if (!isOpen) {
          setTimeout(() => {
            this.shadowRoot.querySelectorAll('a')[0].focus()
          }, 100)
        }
      })

      header.addAction(wmButton)
    }
  }

  /**
   * Watch global events
   * @privat
   */
  _addGlobalEvents () {
    this._getOffsetFromTopEdge()
    let isScrolling

    // Scrollspy that watches headings on scroll
    window.addEventListener('scroll', e => {
      if (this._getSectionInView()) {
        this.shadowRoot.querySelectorAll('[aria-current]').forEach(active => active.removeAttribute('aria-current'))
        const currentItem = this.shadowRoot.querySelector(`[href="#${this._getSectionInView().getAttribute('id')}"]`)
        currentItem.setAttribute('aria-current', true)

        window.clearTimeout(isScrolling)

        isScrolling = setTimeout(() => {
          if (this.nav === 'scroll') {
            this._nav.querySelector('ul').scrollTo({
              top: 0,
              left: this.shadowRoot.querySelector('[aria-current]').offsetLeft,
              behavior: 'smooth'
            })
          }
        }, 150)
      }
    })

    // Unlock the page and show nav on resize
    const mediaQueryList = window.matchMedia('(min-width: 64em)')
    mediaQueryList.addListener(e => {
      if (e.matches) {
        this._removeLock()
        this._nav.classList.remove('nav-hidden')
      }
    })

    // Close on escape
    this.addEventListener('keyup', e => {
      if (e.code === 'Escape') {
        this._closeNav()
        this._toggleButton.focus()
      }
    })
  }

  /**
   * Returns the currently visible heading in the viewport
   * @privat
   */
  _getSectionInView () {
    for (let i = 0; i < this._headings.length; i++) {
      const startAt = this._headings[i].offsetTop
      const endAt = this._headings[i + 1] ? this._headings[i + 1].offsetTop : this.getBoundingClientRect().height
      const currentPosition = (document.documentElement.scrollTop || document.body.scrollTop) - (this.getBoundingClientRect().top + window.pageYOffset) + (this._options.offset + 1)

      const isInView = currentPosition > startAt && currentPosition <= endAt
      if (isInView) return this._headings[i]
    }
  }

  /**
   * Turn nodes into and array of object containing the label and id
   * @privat
   */
  _getItems () {
    this._headings.forEach(heading => {
      let id = heading.getAttribute('id')
      let label = heading.textContent

      if (!id) {
        id = randomHash()
        heading.setAttribute('id', id)
      }

      if (heading.dataset.heading) {
        label = heading.dataset.heading
      }

      this._links.push({
        label,
        id
      })
    })
  }

  /**
   * Unlock scrolling
   * @privat
   */
  _removeLock () {
    document.documentElement.classList.remove('wm-is-locked')
  }

  /**
   * Close nav and unlock scrolling
   * @privat
   */
  _closeNav () {
    this._removeLock()
    this._nav.classList.add('nav-hidden')

    if (this.nav === 'toggle') {
      this._toggleButton.setAttribute('aria-expanded', false)
    }
  }

  render () {
    return html`
      <div class="section-content">
        <slot></slot>
      </div>
      ${when(this.nav !== undefined, () => html`<nav class="nav-hidden">
        <ul>
          ${this._links.map(item => {
            return html`
              <li>
                <a href="#${item.id}" @click="${this._closeNav}">
                  ${item.label}
                </a>
              </li>
            `
          })}
        </ul>
      </nav>`, () => html``)}
      <template id="toggle-button">
        <wm-button kind="clean" class="wm-section-toggle">
          <button aria-expanded="false">
            Thema wählen
            <wm-icon iconid="chevron-down"></wm-icon>
          </button>
        </wm-button>
      </template>
    `
  }
}

customElements.define('wm-section', Section)

export const tagName = 'wm-section'
