import { LitElement, html } from 'lit'
import { mtk } from './styles/mtk.styles'
import { styles } from './styles/map.styles'

/**
 * Stadtplan -Beta Karten
 *
 * @slot default - Mapmarker
 *
 */

export class Map extends LitElement {
  get _controls () {
    return this.renderRoot?.querySelector('.controls') ?? null
  }

  static properties = {
    center: { type: String },
    id: { type: String },
    geocoder: { type: String },
    _mapLoaded: { type: Boolean, attribute: false },
    zoom: { type: Number },
    _markers: { type: Array, attribute: false }
  }

  static styles = [mtk, styles]

  constructor () {
    super()

    /**
     * @type {string} - Mittelpunkt der Karte
     * @summary Koordinaten
     * */
    this.center = '16.35649860253831, 48.2110270434633'

    /** @type {string} - Einzigartige ID */
    this.id = ''

    /** @type {String} - Geocoder einfügen */
    this.geocoder = 'false'

    /**
     * @type {Boolean} - Ist die Map geladen
     * @private
     */
    this._mapLoaded = false

    /**
     * @type {Number} - Standardwert: <code>15</code>
     * @summary Zoomlevel der Karte
     *  */
    this.zoom = 16

    /** @type {Object} - Abgrezungen */
    this.bounds = []

    /**
     * @type {Array} - Abgrezungen
     * @private
     */
    this._markers = {}

    // this.dragging = true
    // this.tap = true
    // this.controls = false
    // this.controlsVisible = true
  }

  /**
   * Geslottete Marker auslesen
   * @summary Get Markers
   * @private
   */
  _getMarkers () {
    for (let i = 0; i < this.querySelectorAll('wm-mapmarker').length; i++) {
      const marker = this.querySelectorAll('wm-mapmarker')[i]

      this.addMarker(`marker_${i}`, marker.getAttribute('lng'), marker.getAttribute('lat'), marker.getAttribute('label'), false, marker.innerHTML)
    }

    this.resetBounds()
  }

  /**
   * Geslottete Marker auslesen
   */
  resetBounds () {
    if (Object.keys(this.bounds).length) {
      this.map.fitBounds(this.bounds, { padding: 50 })
    }
  }

  /**
   * Transform coords string to array
   * @private
   */
  _coordsToArray (str) {
    return str.replaceAll(' ', '').split(',')
  }

  /**
   * Add geocoder to map
   * @private
   */
  _addGeoCoder () {
    if (this.geocoder === 'true') {
      const geoCoder = new window.MaplibreGeocoder({
        forwardGeocode: async (cfg) => {
          const response = await fetch(`https://geocoder.maptoolkit.net/search?q=${cfg.query}&language=${cfg.language[0]}&countrycodes=${cfg.countries}&api_key=wien`)
          const result = await response.json()
          return {
            features: result.map((e) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [e.lon, e.lat]
              },
              place_type: ['place'],
              place_name: e.display_name,
              text: e.type,
              properties: e,
              center: [e.lon, e.lat]
            }))
          }
        }
      }, {
        showResultsWhileTyping: true,
        showResultMarkers: false,
        maplibregl, // eslint-disable-line
        countries: 'at',
        language: 'de',
        marker: false
      })

      geoCoder.addTo(this.map)
      geoCoder.on('result', r => {
        this.addMarker(r.result.properties.place_id, r.result.center[0], r.result.center[1], r.result.place_name, true)
      })
    }
  }

  /**
   * Initialize map toolkit
   * @private
   */
  _initMTK () {
    window.MTK.init({ apiKey: 'wien' }).createMap(this.shadowRoot.querySelector(`#map_${this.id}`), {
      map: {
        location: {
          center: this._coordsToArray(this.center),
          zoom: this.zoom,
          fitBoundsOptions: { padding: 50 }
        },
        mapType: 'wien-ther_stadtplan_wien'
      }
    }, (map) => {
      console.log('inittt')
      this.map = map.gl
      this.map.scrollZoom.disable()
      this.bounds = new window.maplibregl.LngLatBounds()
      this._getMarkers(map)
      this._addEvents()
      this._addGeoCoder()

      this._mapLoaded = true

      /** @type {CustomEvent} mapReady - Map ist bereit */
      this.dispatchEvent(new CustomEvent('mapReady', {
        bubbles: true,
        composed: true,
        detail: {
          map: this.map
        }
      }))
    })
  }

  /**
   * Add events
   * @private
   */
  _addEvents () {
    this.map.on('moveend', e => {
      /** @type {CustomEvent} moveend - Map wurde bewegt */
      this.dispatchEvent(new CustomEvent('moveend', {
        bubbles: true,
        composed: true,
        detail: {
          map: this.map
        }
      }))
    })
  }

  /**
   * It shows the html content passed to the marker. If it's dynamically added and draggable, it doesn't show the content but lng and lat.
   * @private Fill Pop with content
   */
  _setPopupContent (id, lng, lat, text, marker, draggable, html) {
    const popupWrapper = document.createElement('div')
    popupWrapper.innerHTML = `<h3>${text}</h3>
    ${html || ''}
    ${draggable ? `<p>lng: ${lng}<br>lat: ${lat}</p>` : ''}
    `
    if (draggable) {
      const button = document.createElement('button')
      button.textContent = 'Löschen'
      button.addEventListener('click', e => {
        console.log(marker)
        marker.remove()
        delete this._markers[id]

        /** @type {CustomEvent} markerRemoved - Marker wurde entfernt */
        this.dispatchEvent(new CustomEvent('markerRemoved', {
          bubbles: true,
          composed: true,
          detail: {
            markers: this._markers
          }
        }))
      })
      popupWrapper.appendChild(button)
    }

    return popupWrapper
  }

  /**
   * Alle Marker löschen
   */
  deleteAll () {
    this.bounds = new window.maplibregl.LngLatBounds()
    for (const key in this._markers) {
      this._markers[key].marker.remove()
    }
  }

  /**
   * Marker hinzufügen
   * @param {String} id - Einzigartige id
   * @param {String} lng - Longitude
   * @param {String} lat - Latitude
   * @param {String} text - Kurzes Label für den Marker
   * @param {Boolean} draggable - Kann der Pin bewegt werden?
   * @param {String} html - HTML-Content
   * @param {Event} e - Event
   *
   */
  addMarker (id, lng, lat, text, draggable = false, html, e) {
    const marker = new window.maplibregl.Marker({
      draggable
    })

    const popupContent = this._setPopupContent(id, lng, lat, text, marker, draggable, html)

    const popup = new window.maplibregl.Popup({ offset: 25 })
      .setDOMContent(popupContent)

    marker.setLngLat([lng, lat])
      .setPopup(popup) // sets a popup on this marker
      .addTo(this.map)

    const onDragEnd = () => {
      const coordinates = marker.getLngLat()
      const popupContent = this._setPopupContent(id, coordinates.lng, coordinates.lat, 'Aktualisierter Pin', marker, draggable)
      popup.setDOMContent(popupContent)
    }

    marker.on('dragend', onDragEnd)

    this._markers[id] = {
      lng,
      lat,
      label: text,
      marker
    }

    this.bounds.extend(new window.maplibregl.LngLat(lng, lat))

    /** @type {CustomEvent} markerAdded - Marker wurde hinzugefügt */
    this.dispatchEvent(new CustomEvent('markerAdded', {
      bubbles: true,
      composed: true,
      detail: {
        marker,
        markers: this._markers
      }
    }))
  }

  /**
   * Embed external scripts
   * @private
   * @param {String} file - Path to the external script
   * @param {Boolean} init - Call onload script
   */
  _embedScript (file, init = false) {
    const script = document.createElement('script')
    if (init) {
      script.onload = this._onLoad.bind(this)
    }
    script.src = file
    return script
  }

  /**
   * Load MTK
   * @private
   * @param {Event} e - onLoad event
   */
  _onLoad (e) {
    this._initMTK()
    e.target.onload = null
  }

  /**
   * Mapinhalte und Abgrenzungen neu berechnen
   * @summary Rerender Map
   */
  reRender () {
    this.map.resize()
    this.resetBounds()
  }

  render () {
    return html`
      ${this.geocoder === 'true'
? html`<div class="controls">
        <link rel="stylesheet" href="https://unpkg.com/@maplibre/maplibre-gl-geocoder@1.2.0/dist/maplibre-gl-geocoder.css">
      </div>`
: ''}
      <div id="map_${this.id}"></div>
      ${this._embedScript('https://static.maptoolkit.net/mtk/v10.1.3/mtk.js', true)}
      ${this._embedScript('https://unpkg.com/@maplibre/maplibre-gl-geocoder@1.2.0/dist/maplibre-gl-geocoder.min.js')}
    `
  }
}

customElements.define('wm-map', Map)

export const tagName = 'wm-map'
