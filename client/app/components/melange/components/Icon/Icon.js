import { LitElement, html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import { styles } from './styles/icon.styles'

/**
 * Icon aus dem vordefinierten Spritesheet
 *
 * @slot default - Beschreibung des Icons. Nur befüllen, wenn der Inhalt auch wirklich im Accessbility Tree sein soll.
 *
 */

export class Icon extends LitElement {
  static properties = {
    iconid: { type: String },
    width: { type: Number },
    height: { type: Number },
    class: { type: String },
    _accessibleName: { type: String, attribute: false }
  }

  static styles = [styles]

  constructor () {
    super()

    /** @type {string} - Standardbreite */
    this.width = 26

    /**
     * @type {string} - Höhe
     * @summary Entspricht Breite wenn nicht definiert
     */
    this.height = 'auto'

    /** @type {string} - Additional classes */
    this.class = ''

    /**
     * @type {string} - ID
     * @summary <code>amtswege</code>, <code>burger</code>, <code>check</code>, <code>chevron-down</code>, <code>chevron-left</code>, <code>chevron-right</code>, <code>chevron-up</code>, <code>clock</code>, <code>close</code>, <code>contact</code>, <code>contact_alternative</code>, <code>contact_loggedin</code>, <code>contact_notification</code>, <code>download</code>, <code>email</code>, <code>embed</code>, <code>euro</code>, <code>external</code>, <code>facebook</code>, <code>fullscreen</code>, <code>handson</code>, <code>home</code>, <code>info</code>, <code>instagram</code>, <code>language</code>, <code>linkedin</code>, <code>pause</code>, <code>pin</code>, <code>play</code>, <code>play-button</code>, <code>search</code>, <code>settings</code>, <code>share</code>, <code>sound</code>, <code>twitter</code>, <code>whatsapp</code>, <code>wien-bot</code>, <code>wifi</code>, <code>youtube</code>, <code>xing</code>, <code>zoom</code>
     */
    this.iconid = ''

    /** @private */
    this._accessibleName = ''
  }

  firstUpdated () {
    // Check whether there's slotted text content. If yes, it serves as the accessible name
    this._accessibleName = this.shadowRoot.querySelector('slot')?.assignedNodes()[0]?.textContent
  }

  /**
   * Checks whether a value is defined and returns either the value or a custom value (second param)
   * @summary Check attribute value
   * @private
   * @param {(string)} value - a string
   * @param {(string)} returnvalue - if defined, the value the function should return for the attribute
   */
  _attrDefined (value, returnvalue) {
    const attributeValue = returnvalue || value
    return ifDefined(value !== undefined ? attributeValue : undefined)
  }

  /**
   * The svg only has an accessible name and role=img if this._accessibleName is defined
   * If this._accessibleName is not defined, aria-hidden is set to true
   * @summary Render SVG
   * @private
   */
  _renderSVG () {
    return html`
      <div class="wm-icon-wrapper">
      <svg
        class="wm-icon ${this.class}" 
        width="${this.width}" 
        height="${this.height !== 'auto' ? this.height : this.width}" 
        role="${this._attrDefined(this._accessibleName, 'img')}" 
        aria-label="${this._attrDefined(this._accessibleName)}"
        aria-hidden="${ifDefined(this._accessibleName === undefined ? 'true' : undefined)}"
      >
        <title><slot></slot></title>
          ${unsafeSVG(`<use href="/public/wiener-melange/icons/sprite.symbol.svg#${this.iconid}"/>`)}
        </svg>
      </div>
    `
  }

  render () {
    return html`
      ${this._renderSVG()}
    `
  }
}

customElements.define('wm-icon', Icon)

export const tagName = 'wm-icon'
