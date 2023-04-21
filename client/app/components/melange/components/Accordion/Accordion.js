import { LitElement } from 'lit'
import { html, unsafeStatic } from 'lit/static-html.js'
import { getNodeIndex } from '../misc/utils.js'
import { styles } from './styles/accordion.styles'
import { tokens } from './styles/accordion.tokens.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

/**
 * Gruppe von mehreren aufklappbaren Elementen.
 *
 * @slot heading - Überschrift / Button
 * @slot content - Inhalt
 *
 */

/**
* @cssprop --accordion-background - Hintergrundfarbe des Buttons
* @cssprop --accordion-padding-inline - Innenabstand links und rechts
* @cssprop --accordion-padding-block - Innenabstand oben und unten
* @cssprop --accordion-icon - Symbol
* @cssprop --accordion-icon-size - Größe des Symbols
*/

export class Accordion extends LitElement {
  /** @private */
  get _panels () {
    return this.shadowRoot?.querySelectorAll('.panel') ?? null
  }

  /** @private */
  get _buttons () {
    return this.shadowRoot?.querySelectorAll('button') ?? null
  }

  static properties = {
    open: { type: String, reflect: true },
    multiple: { type: String, reflect: true },
    _previousIndex: { type: Number, attribute: false },
    _showMultiple: { type: Boolean, attribute: false },
    _items: { type: Array, attribute: false }
  }

  static styles = [tokens, styles]

  constructor () {
    super()

    /**
     * @type {string} - Attribut angeben, um alle geöffnet oder geschlossen darzustellen.<br>Dem Attribute einen Zahlenwert zuweisen, um ein bestimmtes Element zu öffnen.
     * @summary <code>true</code> oder <code>false</code> , Index, z.B. <code>0</code>, <code>1</code>, <code>2</code>
     */
    this.open = false
    /**
     * @type {string} - Attribut angeben, um mehrere Panels gleichzeitig geöffnet darstellen zu können.
     * @summary Boolsches Attribut (kein Wert)
     */
    this.multiple = 'false'

    /**
     * @type {Number} - Tracks which elements was previously open
     * @private
     */
    this._previousIndex = NaN

    /**
     * @type {Number} - Show multiple elements?
     * @private
     */
    this._showMultiple = false

    /**
     * Contains items to display in the accordion
     * @private
     */
    this._items = []

    /**
     * Each item is a heading, sets the default heading
     * @private
     */
    this._tagName = 'h3'
  }

  firstUpdated () {
    this._registerEvents()
  }

  updated (changedProperties) {
    if (changedProperties.has('multiple')) {
      this._showMultiple = this.multiple !== 'false'
    }
    if (changedProperties.has('open')) {
      this._openOrCloseItems()
    }

    if (changedProperties.has('_items')) {
      this._openOrCloseItems()
    }
  }

  /**
   * After having figured out what to do, open or close items
   * @private
   */
  _openOrCloseItems () {
    const index = this._openByDefaultIndex()

    if (index === -1 || isNaN(index)) {
      const type = isNaN(index) ? 'close' : 'open'
      for (let i = 0; i < this._buttons.length; i++) {
        this._openOrClose(i, type)
      }
    } else {
      this._openOrClose(this._openByDefaultIndex())
    }
  }

  /**
   * @summary Figure out whether an element should be opened or closed
   * @param {(Number)} panelIndex - index of the pannel
   * @param {(String)} type - open, close or toggle
   *
   * @private
   */
  _openOrClose (panelIndex, type = 'toggle', fireEvent = false) {
    if (!isNaN(panelIndex)) {
      if (panelIndex < this._panels.length) {
        const button = this._buttons[panelIndex]
        const panel = this._panels[panelIndex]
        const isOpen = button.getAttribute('aria-expanded') !== 'false'

        if (isOpen) {
          if (type !== 'open') {
            button.setAttribute('aria-expanded', 'false')
            panel.classList.remove('open')
          }
        } else {
          if (type !== 'close') {
            button.setAttribute('aria-expanded', 'true')
            panel.classList.add('open')
          }
        }

        if (
          !this._showMultiple &&
          !isNaN(this._previousIndex) &&
          this._previousIndex !== panelIndex
        ) {
          // console.log('dont show multiple')
          this.collapse(this._previousIndex, false)
        }

        if (!isOpen) {
          this._previousIndex = panelIndex
        }

        const options = {
          bubbles: true,
          composed: true,
          detail: {
            id: button.getAttribute('aria-controls'),
            index: panelIndex
          }
        }
        if (fireEvent) {
          if (isOpen) {
          /**
           * @type {CustomEvent} Wenn ein Panel geschlossen wurde
           * @summary id, index
           */
            this.dispatchEvent(new CustomEvent('collapsed', options))
          } else {
          /**
           * @type {CustomEvent} Wenn ein Panel geöffnet wurde
           * @summary id, index
           */
            this.dispatchEvent(new CustomEvent('expanded', options))
          }
        }
      } else {
        console.log('Dieser Panel existiert nicht')
      }
    } else {
      if (this.renderRoot?.querySelectorAll('.open').length) {
        for (
          let i = 0;
          i < this.renderRoot?.querySelectorAll('.open').length;
          i++
        ) {
          const that = this;
          (function () {
            that.collapse(i, false)
          })(i)
        }
      }
    }
  }

  /**
   * @summary Register click event
   * @private
   */
  _registerEvents (root) {
    this.shadowRoot.addEventListener('click', (e) => {
      const button = e.target.closest('button')
      if (button) {
        const id = button.getAttribute('aria-controls')
        const panelIndex = parseInt(id.split('_')[1])
        this._openOrClose(panelIndex, 'toggle', true)
      }
    })
  }

  /**
   * @summary Get index of opened item(s)
   * @private
   */
  _openByDefaultIndex () {
    let index

    // if the open attribute is present without a value
    if (this.open === '') {
      // this.open = "true"
      index = 0
      // If the value is "true"
    } else if (this.open === 'true') {
      index = 0
      // If the value is a number
    } else if (!isNaN(parseInt(this.open))) {
      index = parseInt(this.open)
    } else {
      index = NaN
    }

    return index - 1
  }

  /**
   * @summary Take the slotted content and wrap it in the new markup
   * @private
   */
  _getContents () {
    this._items = []
    const headings = this.querySelectorAll('[slot="heading"]')
    const panels = this.querySelectorAll('[slot="content"]')

    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i]
      const content = panels[i]

      this._items.push({
        text: heading.textContent,
        content: content.innerHTML
      })

      if (i === 0) {
        this._tagName = heading.nodeName
      }
    }
  }

  /**
   * @summary Gets the corresponding index of a panel
   * @private
   * @param {(number|string|node)} element - index, id oder panel element
   * @returns index
   */
  _getPanel (element) {
    const type = typeof element
    let index

    // Select element based on index
    if (type === 'number') {
      index = element
      // Get index using selector
    } else if (type === 'string') {
      index = getNodeIndex(
        this._panels,
        this.renderRoot?.querySelector(element)
      )
      // Get index using node
    } else if (type === 'object') {
      index = getNodeIndex(this._panels, element)
    } else if (isNaN(element)) {
      index = NaN
    }

    return index
  }

  /**
   * @summary Panel öffnen
   * @param {(number|string|node)} element - index, id oder panel element
   */
  expand (element, fireEvent = true) {
    const panel = this._getPanel(element)
    this._openOrClose(panel, 'open', fireEvent)
  }

  /**
   * @summary Panel schließen
   * @param {(number|string|node)} element - index, id oder panel element
   */
  collapse (element, fireEvent = true) {
    const panel = this._getPanel(element)
    this._openOrClose(panel, 'close', fireEvent)
  }

  /**
   * Get data from slotted content
   * @private
   */
  _rerender () {
    this._getContents()

    const options = {
      bubbles: true,
      composed: true,
      detail: {}
    }
    /**
     * @type {CustomEvent} Wenn ein Element hinzugefügt oder gelöscht worden ist.
     */
    this.dispatchEvent(new CustomEvent('contentchanged', options))
  }

  connectedCallback () {
    super.connectedCallback()
  }

  render () {
    return html`
    ${this._items.map((item, i) => {
      return html`<${unsafeStatic(this._tagName)} class="heading">
      <wm-button clean>
        <button aria-expanded="false" aria-controls="panel_${i}">
          ${item.text}
        </button>
      </wm-button>
      </${unsafeStatic(this._tagName)}>

      <div id="panel_${i}" class="panel">
        ${unsafeHTML(item.content)}
      </div>
      `
    })}
      <slot name="heading" @slotchange="${this._rerender}" hidden></slot>
      <slot name="content" hidden></slot>
    `
  }
}

customElements.define('wm-accordion', Accordion)

export const tagName = 'wm-accordion'
