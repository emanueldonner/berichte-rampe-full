import { LitElement, html } from 'lit'
import { _stringToObject } from '../misc/utils.js'
/**
 * Daten von einer API holen.
 *
 * @slot results - Ausgabe der Daten
 *
 */

/**
* @cssprop --fetch-gap - Abstand zwischen Komponenten
*/

export class Fetch extends LitElement {
  static properties = {
    url: { type: String },
    dataset: { type: String },
    pagination: { type: String },
    itemsPerPage: { type: Number },
    _itemsPerSet: { type: Number },
    _results: { type: Array }
  }

  /**
   * @private
   */
  get _resultsContainer () {
    return this.querySelector('[slot="results"]') ?? null
  }

  /**
   * @private
   */
  get _content () {
    return this._resultsContainer?.querySelector('[data-fetch-content]') ?? null
  }

  /**
   * @private
   */
  get _template () {
    return this.querySelector('template') ?? null
  }

  constructor () {
    super()

    /** @type {String} - Url zur API */
    this.url = ''

    /** @type {String} - Feld im Datensatz in dem sich die Ergebnisse befinden */
    this.dataset = ''

    /**
     * @type {String} - All results
     * @private
     */
    this._results = ''

    /** @type {String} - Wieviele Ergebnisse sollen pro Seite angezeigt werden */
    this.itemsPerPage = 5

    /**
     * @type {String} - Items per set, equals either itemPerPage or less
     * @private
     */
    this._itemsPerSet = this.itemsPerPage

    /** @type {String} - Art der Paginierung */
    this.pagination = 'none'

    // this._addEvents()
    // this._results = []
    // this.skeleton = "false"
    // this.fetchSource = ''
    // this.fetchTarget = ''
  }

  createRenderRoot () {
    return this
  }

  /**
   * @summary Fetch data from the API
   * @private
   */
  _fetchData () {
    console.log(this.querySelectorAll('[slot="]'))
    fetch(this.url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        this._results = this.dataset ? data[this.dataset] : data
        this._displayData(true)
        // this._updateMap();
      })
  }

  /**
   * Takes markup from the slotted template and replaces fields and attributes with data
   * @summary Display results
   * @private
   */
  _displayData (initial = false) {
    if (this._content) {
      this._content.innerHTML = ''

      for (let i = 0; i < this._itemsPerSet; i++) {
        const result = this._results[i]
        if (result) {
          const template = this._template.content.cloneNode(true).children[0]

          console.log(template)

          // Finds and parse fields
          const fields = template.querySelectorAll('[data-fetch-field]')
          for (let i = 0; i < fields.length; i++) {
            const field = fields[i]
            field.textContent = _stringToObject(field.dataset.fetchField, result)
          }

          // Finds and parse attributes
          const attributes = template.querySelectorAll('[data-fetch-attribute]')
          for (let i = 0; i < attributes.length; i++) {
            const element = attributes[i]
            const attrAndValue = element.dataset.fetchAttribute.split(':')
            element.setAttribute(attrAndValue[0], _stringToObject(attrAndValue[1], result))
          }

          //  if (this.skeleton === "true" && initial) {
          //    template.style.transition = 'opacity 0.3s'
          //    template.style.opacity = '0'
          //  }

          this._content.appendChild(template)

          //  setTimeout(() => {
          //    template.style.opacity = '1'
          //  }, 0);
        }
      }
    }
  }

  /**
   * @summary Load and display the next set of entries
   * @private
   */
  _loadMore () {
    this._itemsPerSet = this._itemsPerSet + this.itemsPerPage
    this._displayData()
  }

  connectedCallback () {
    super.connectedCallback()

    this._fetchData()
  }

  render () {
    return html`
      <slot name="results"></slot>
      <slot name="template"></slot>
      ${this.pagination === 'button' && (this._itemsPerSet < this._results.length) ? html`<wm-button @click="${this._loadMore}"><button>Load more</button></wm-button>` : ''}
    `
  }
}

customElements.define('wm-fetch', Fetch)

export const tagName = 'wm-fetch'
