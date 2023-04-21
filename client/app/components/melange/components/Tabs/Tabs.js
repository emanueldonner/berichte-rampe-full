import { LitElement, html } from 'lit'
import { getNodeIndex } from '../misc/utils.js'
import { tokens } from './styles/tabs.tokens'
import { styles } from './styles/tabs.styles'

/**
 * Reiter-Container
 *
 * @slot tab - Bezeichnung im Reiter
 * @slot default - Inhalte
 *
 */

/**
* @cssprop --tabs-alignment - Ausrichtung der Tabs in der tablist
* @cssprop --tabs-border - Rahmen der gesamten Komponente
* @cssprop --tabs-gap - Abstand zwischen den Tabs
* @cssprop --tabs-padding - Innenabstand für die gesamten Komponente
* @cssprop --tabs-spacing - Abstand zwischen Tablist und Panel
* @cssprop --tab-background-color - Hintergrundfarbe eines einzelnen Tabs
* @cssprop --tab-background-color-selected - Hintergrundfarbe eines einzelnen ausgewählten Tabs
* @cssprop --tab-border-width - Rahmestärke um einen einzelnen Tab
* @cssprop --tab-border-color - Rahmenfarbe um einen einzelnen Tab
* @cssprop --tab-border-color-selected - Rahmenfarbe um einen einzelnen Tab
* @cssprop --tab-padding - Innenabstand in einem einzelnen Tab
* @cssprop --tabpanel-padding - Innenabstand im Tabpanel
* @cssprop --tabpanel-border-width - Rahmestärke um den Tabpanel
* @cssprop --tabpanel-border-color - Rahmenfarbe um den Tabpanel
*/

export class Tabs extends LitElement {
  /** @private */
  get _tabcontainers () {
    return document.querySelectorAll('wm-tabs') ?? null
  }

  /** @private */
  get _tabs () {
    return this.querySelectorAll(':scope > wm-tab') ?? null
  }

  /** @private */
  get _tabpanels () {
    return this.querySelectorAll(':scope > wm-tabpanel') ?? null
  }

  static properties = {
    selectedIndex: { type: Number, attribute: false },
    lastIndex: { type: Number, attribute: false },
    id: { type: String, attribute: false }
  }

  static styles = [tokens, styles]

  constructor () {
    super()

    /** @type {String} - einzigartige id jeder Komponente */
    this.id = ''

    /** @type {Number} - Zuletzt aktiver Index */
    this.lastIndex = 0

    /** @type {Number} - Index des ausgewählten Tabs */
    this.selectedIndex = 0

    this._setParams()
  }

  /**
   * @summary Set default params
   * @private
   */
  _setParams () {
    const pathParams = document.location.pathname.split('/')
    this.searchParams = new URLSearchParams(location.search)
    this.id = `t_${getNodeIndex(this._tabcontainers, this)}_${pathParams[pathParams.length - 2]}`

    const searchParams = (new URL(document.location)).searchParams
    const storedIndex = searchParams.get('view') ?? this.searchParams.get(this.id) ?? sessionStorage.getItem(`active_tab_${this.id}`)
    this.lastIndex = storedIndex ?? 0

    this.selectedIndex = storedIndex ?? 0

    const activeTab = Array.from(this._tabs).filter(tab => tab.hasAttribute('selected'))
    const tab = activeTab.length ? activeTab[0] : this._tabs[this.lastIndex]
    this._selectTab(tab)
    this._selectPanel()
  }

  /**
   * @summary Select the new active panel
   * @private
   */
  _selectPanel () {
    if (this.querySelector(':scope > wm-tabpanel[selected]')) {
      this.querySelector(':scope > wm-tabpanel[selected]').removeAttribute('selected')
    }
    this._tabpanels[this.selectedIndex].setAttribute('selected', true)
  }

  /**
   * @summary Select the new active tab
   * @private
   * @param {{Node, Number}} element - element or index
   */
  _selectTab (element) {
    if (this.querySelector(':scope > wm-tab[selected]')) {
      this.querySelector(':scope > wm-tab[selected]').removeAttribute('selected')
    }

    if (Number.isInteger(element)) {
      if (this._tabs[element]) {
        element = this._tabs[element]
      } else {
        element = this._tabs[this._tabs.length - 1]
      }
    }

    element.setAttribute('selected', true)
    element.focus()
    this.selectedIndex = getNodeIndex(this._tabs, element)

    /** @type {CustomEvent} Tab wurde gewechselt */
    this.dispatchEvent(
      new CustomEvent('tabChanged', {
        detail: this.selectedIndex,
        bubbles: true
      })
    )

    this.searchParams = new URLSearchParams(location.search)
    if (this.selectedIndex > 0) {
      this.searchParams.set(this.id, this.selectedIndex)
    } else {
      this.searchParams.delete(this.id)
    }
    window.history.replaceState({}, '', location.pathname + '?' + this.searchParams + location.hash)
  }

  /**
   * @summary Switch tab
   * @private
   * @param {Event} e - event
   */
  _switchTab (e) {
    const element = e && e.type ? e.target : e
    if (element.closest('wm-tab')) {
      this._selectTab(element)
      this._selectPanel()
    }
  }

  /**
   * @summary Get the next element when using arrow keys
   * @private
   * @param {Number} index - next index
   */
  _getNextElement (index) {
    if (index < 0) {
      index = this._tabs.length - 1
    }

    if (index >= this._tabs.length) {
      index = 0
    }

    return this._tabs[index]
  }

  /**
   * @summary Handle key events
   * @private
   * @param {Event} e - event
   */
  _handleKeydown (e) {
    let index

    if (e.code !== 'ArrowLeft' && e.code !== 'ArrowRight') return

    if (e.code === 'ArrowLeft') {
      index = this.selectedIndex - 1
    }

    if (e.code === 'ArrowRight') {
      index = this.selectedIndex + 1
    }

    this._switchTab(this._getNextElement(index))
  }

  /**
   * @summary Handle click event on wm-tab
   * @private
   * @param {Event} e - event
   */
  _handleClick (e) {
    const element = e && e.type ? e.target : e
    if (element.closest('wm-tab')) {
      this._selectTab(element)
      this._selectPanel()
      this.reRenderChildren()
      sessionStorage.setItem(`active_tab_${this.id}`, this.selectedIndex)
    }
  }

  /**
   * @summary Initializes elements like maps when selecting tabs
   */
  async reRenderChildren () {
    await this._tabpanels[this.selectedIndex].updateComplete
    if (this.querySelector('[update]')) {
      this.querySelector('[update]').reRender()
    }
  }

  render () {
    return html`
      <div>
        <div role="tablist" @click="${this._handleClick}" @keydown="${this._handleKeydown}">
          <slot name="tab"></slot>
        </div>
        <slot></slot>
      </div>
    `
  }
}

customElements.define('wm-tabs', Tabs)

export const tagName = 'wm-tabs'
