import { LitElement, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { tokens } from './styles/stage.tokens.js'
import { styles } from './styles/stage.styles'

/**
 * Titel der Seite, alternativ inklusive Links, Bild, Video und/oder Galerie.
 *
 * @slot heading - Überschrift der Seite
 * @slot content - Textinhalt
 * @slot media - Bild oder Video
 */

/**
* @cssprop --stage-background-color - Hintergrundfarbe
* @cssprop --stage-content-padding - Padding für den Inhalt
* @cssprop --stage-heading-small - Schriftgröße Klein
* @cssprop --stage-margin - Außebastand nach unten mobil
* @cssprop --stage-margin-large - Außebastand nach unten
*/

export class Stage extends LitElement {
  static properties = {
    _hasMedia: { type: Boolean, attribute: false }
  }

  static styles = [tokens, styles]

  constructor () {
    super()

    /**
     * @type {string} - Does the stage contain media like images or video
     * @private
     */
    this._hasMedia = false
  }

  firstUpdated () {
    /**
     * Check whether the stage has media slotted or not
     */
    this.shadowRoot.querySelector('slot[name="media"]').addEventListener('slotchange', e => {
      this._hasMedia = this.shadowRoot?.querySelector('slot[name="media"]').assignedNodes().length

      if (this._hasMedia) {
        document.documentElement.classList.add('wm-has-stage')
      } else {
        document.documentElement.classList.remove('wm-has-stage')
      }
    })
  }

  render () {
    const contentClasses = { 'content--media': this._hasMedia }
    return html`
      <div class="content ${classMap(contentClasses)}">
        <slot name="heading"></slot>
        <slot name="content"></slot>
      </div>
      <div class="media" ?hidden=${!this._hasMedia}>
        <slot name="media"></slot>
      </div>
    `
  }
}

customElements.define('wm-stage', Stage)

export const tagName = 'wm-stage'
