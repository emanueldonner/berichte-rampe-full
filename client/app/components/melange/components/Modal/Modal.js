import { LitElement, html } from 'lit'
import { styles } from './styles/modal.styles'

/*

[x] open
[x] close
[x] Breite an Content anpassen
[x] Modal auf Link
[x] Modal auf Button
[x] ein Bild
[x] Mehrere Bilder
[x] Bilder blättern
[x] Bilder lazy loaden
[x] Multimedia Content (Videos)
[ ] Bilder zoomen
[x] Bilder und Videos mischen
[x] open event
[x] close event
[x] close esc
[ ] close click outside
[ ] inert/modal
[x] html content
[x] video content
[x] Styling
[x] scroll lock
[x] figcaption
*/

export class Modal extends LitElement {
  get _dialog () {
    return this.querySelector('dialog') ?? null
  }

  get _content () {
    return this.querySelector('.content') ?? null
  }

  static properties = {
    isopen: { type: Boolean, reflect: true },
    _type: { type: String },
    _trigger: { type: Node }
  }

  static styles = [styles]

  constructor () {
    super()

    /** @type {Boolean} - Is Modal geöffnet oder nicht */
    this.isopen = false

    /**
   * @type {Boolean} - Type of content to attach
   * @private
   * @summary image or html
   */
    this._type = 'image'
  }

  /**
 * Add events
 * @private
 */
  _addEvents () {
    this._dialog.addEventListener('close', this._closeEvent.bind(this))
  }

  /**
 * Add gloval events
 * @private
 */
  _addGlovalEvents () {
    document.body.addEventListener('click', e => {
      this._trigger = e.target.closest('[data-modal]')

      if (this._trigger && this._trigger.dataset.modal) {
        e.preventDefault()

        this._type = this._trigger.dataset.modal
        console.log(this._type)

        if (this._type === 'image') {
          this._getImage()
        } else {
          this._getHTML()
        }
        this.open()
      }
    })
  }

  /**
 * Fired when the modal gets closed
 * @private
 */
  _closeEvent () {
    /** @type {CustomEvent} Wenn das Modal geschlossen wurde. */
    this.dispatchEvent(
      new CustomEvent('closed', {
        bubbles: true
      })
    )

    this.close()
  }

  /**
 * Get image from href an append it to the modal
 * @private
 */
  _getImage () {
    console.log('bla')
    const image = new Image()
    image.src = this._trigger.getAttribute('href')

    this.alt = ''

    if (this._trigger.querySelector('[alt]')) {
      this.alt = this._trigger.querySelector('[alt]').getAttribute('alt')
    } else {
      this.alt = this._trigger.textContent
    }

    image.alt = this.alt

    this._content.appendChild(image)
  }

  /**
 * Append html from template
 * @private
 */
  _getHTML () {
    this._content.innerHTML = document.querySelector(`#${this._type}`).innerHTML
  }

  /**
 * Dispatch event helper
 * @private
 */
  _dispatchEvent (type) {

  }

  /**
 * Modal öffnen
 */
  open () {
    this.isopen = true

    setTimeout(() => {
      this._dialog.showModal()
      this._dialog.focus()
    }, 0)

    /** @type {CustomEvent} Wenn das Modal geöffnet wurde. */
    this.dispatchEvent(
      new CustomEvent('opened', {
        bubbles: true
      })
    )
  }

  /**
 * Modal schließen
 */
  close () {
    this.isopen = false
    this._dialog.close()
    this._content.innerHTML = ''
  }

  firstUpdated () {
    this._addEvents()
  }

  createRenderRoot () {
    return this
  }

  connectedCallback () {
    super.connectedCallback()

    this._addGlovalEvents()
  }

  render () {
    return html`
      <slot></slot>
      <dialog tabindex="0" aria-modal="true">
        <div class="content html">
        </div>
        <div class="controls">
          <wm-button kind="clean" class="close" @click="${this.close}">
            <button type="button">
              <wm-icon iconid="close" size="32">Close</wm-icon>
            </button>
          </wm-button>
        </div>
      </dialog>
    `
  }
}

customElements.define('wm-modal', Modal)

export const tagName = 'wm-modal'
