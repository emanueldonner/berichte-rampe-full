import { LitElement, html } from 'lit'
import { styles } from './styles/baederampel.styles'

export const tagName = 'wm-baederampel'

export class Baederampel extends LitElement {
  static properties = {
    bid: { type: String },
    label: { type: String },
    _status: { type: String, attribute: false },
    _statusText: { type: String, attribute: false }
  }

  static styles = [styles]

  constructor () {
    super()

    /**
     * @type {String} id des jeweiligen Bades wie sie im OGD-Datensatz definiert ist.
     * @summary <code>altedonau</code>, <code>amalienbad</code>, <code>angelibad</code>, <code>apostelbad</code>, <code>brigittenau</code>, <code>doebling</code>, <code>donaustadt</code>, <code>einsiedlerbad</code>, <code>floridsdorf</code>, <code>gaensehaeufel</code>, <code>grossfeldsiedlung</code>, <code>hadersdorf</code>, <code>hermannbad</code>, <code>hietzing</code>, <code>hoepflerbad</code>, <code>huetteldorf</code>, <code>joergerbad</code>, <code>kongress</code>, <code>krapfenwaldlbad</code>, <code>laaerbergbad</code>, <code>liesingerbad</code>, <code>ottakring</code>, <code>penzingerbad</code>, <code>schafbergbad</code>, <code>simmering</code>, <code>theresienbad</code>
     */
    this.bid = ''

    /**
     * @type {String} Liste ohne Aufzählungszeichen, Innen- und Außenabstand (true, false)
     * @private
     * @summary Ohne Formatierung
     */
    this._statusText = 'Lade Auslastung…'

    /**
     * @type {String} Der Text vor der Statusanzeige
     * @summary Beschriftung
     */
    this.label = 'Auslastung:'
  }

  /**
   * Lifecycle method
   * @private
   * @param {*} changedProperties
   */
  updated (changedProperties) {
    // Fetch data when the id changes
    if (changedProperties.has('bid')) {
      this._fetchData()
    }
  }

  /**
   * Fetch data from OGD API
   * @private
   */
  _fetchData () {
    fetch(this._api(), { method: 'GET' })
      .then(response => {
        return response.json()
      })
      .then(data => {
        const properties = data.features[0].properties
        this._status = properties.AUSLASTUNG_AMPEL_KATEGORIE_0

        if (properties.AUSLASTUNG_AMPEL_KAT_TXT_0) {
          this._statusText = properties.AUSLASTUNG_AMPEL_KAT_TXT_0
        }
      })
  }

  /**
   * Get data for “Bad” with specific this.id
   * @private
   */
  _api () {
    return `https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SCHWIMMBADOGD&srsName=EPSG:4326&outputFormat=json&cql_filter=strIndexOf(WEBLINK1%2C%27${this.bid}%27)%3E-1`
  }

  render () {
    return html`
      <strong>${this.label}</strong>
      <span>
        <span class="status status-${this._status}"></span> ${this._statusText}
      </span>
    `
  }
}

customElements.define('wm-baederampel', Baederampel)
