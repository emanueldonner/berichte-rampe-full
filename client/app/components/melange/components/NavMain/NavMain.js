import { LitElement, html } from "lit"
import { styles } from "./styles/navmain.styles"

/**
 * Hauptmenü
 *
 * @slot default - Liste
 *
 */

export class NavMain extends LitElement {
  get _dialog() {
    return this.renderRoot?.querySelector("dialog") ?? null
  }

  get _content() {
    return this.renderRoot?.querySelector(".wrapper") ?? null
  }

  get _lists() {
    return this.renderRoot?.querySelector(".lists") ?? null
  }

  static properties = {
    labelOpen: { type: String },
    showLabelOpen: { type: String },
    labelClose: { type: String },
  }

  static styles = [styles]

  constructor() {
    super()

    /** @type {String} - Label Menü geschlossen */
    this.labelOpen = "Menü"

    /** @type {String} - Label Menü offen */
    this.labelClose = "Schließen"

    /** @type {String} - Soll das Label angezeigt werden */
    this.showLabelOpen = "true"
  }

  connectedCallback() {
    super.connectedCallback()
  }

  firstUpdated() {
    this._lists.append(...this.childNodes)

    this._addEvents()
  }

  /**
   * @summary Events hinzufügen
   * @private
   */
  _addEvents() {
    this._dialog.addEventListener("close", (e) => {
      if (!e.target.classList.contains("content--hidden")) {
        this._content.classList.remove("transition")
      }
    })

    this._content.addEventListener("transitionend", (e) => {
      if (e.target.classList.contains("content--hidden")) {
        this._dialog.close()
        this._content.classList.remove("content--hidden")
      }
    })
  }

  /**
   * @summary Menü offnen
   */
  open() {
    this._dialog.showModal()
    this._content.classList.add("content--hidden")

    setTimeout(() => {
      this._content.classList.add("transition")
      this._content.classList.remove("content--hidden")
    }, 0)
  }

  /**
   * @summary Menü schließen
   */
  close() {
    this._content.classList.add("content--hidden")
  }

  render() {
    return html`
      <nav>
        <wm-button kind="clean" @click="${this.open}">
          <button>
            ${this.showLabelOpen === "false"
              ? html`<span class="wm-h-vh">${this.labelOpen}</span>`
              : `${this.labelOpen}`}

            <wm-icon iconid="burger"></wm-icon>
          </button>
        </wm-button>

        <dialog>
          <div class="wrapper">
            <div class="content">
              <div class="header">
                <wm-button kind="clean" @click="${this.close}">
                  <button>
                    <span class="wm-h-vh">${this.labelClose}</span>
                    <wm-icon iconid="close"></wm-icon>
                  </button>
                </wm-button>
              </div>

              <div class="lists">
                <slot></slot>
              </div>
            </div>
          </div>
        </dialog>
      </nav>
    `
  }
}

customElements.get("wm-nav-main") ||
  customElements.define("wm-nav-main", NavMain)
