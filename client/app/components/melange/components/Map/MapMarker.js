import { LitElement } from 'lit'

/**
 * Stadtplan - Beta Kartenmarker
 *
 * @slot default - HTML-Inhalt
 *
 */

export class MapMarker extends LitElement {
  static properties = {
    label: { type: String },
    lat: { type: String },
    lng: { type: String }
  }

  constructor () {
    super()

    /** @type {string} - Bezeichnung des Markers */
    this.label = ''
    /** @type {string} - Latitude */
    this.lat = ''
    /** @type {string} - Longitude */
    this.lng = ''
  }
}

customElements.define('wm-mapmarker', MapMarker)
