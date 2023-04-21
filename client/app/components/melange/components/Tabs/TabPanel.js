import { LitElement, css, html } from 'lit'
import { tokens } from './styles/tabs.tokens.js'

/**
 * Reiter Inhalt
 *
 * @slot default - Text- oder HTML-Content
 *
 */

export class TabPanel extends LitElement {
  static properties = {
    selected: { type: Boolean, reflect: true }
  }

  static styles = [
    tokens,
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        border-style: solid;
        border-color: var(--tabpanel-border-color);
        border-width: var(--tabpanel-border-width);
        padding: var(--tabpanel-padding);
      }
    `
  ]

  constructor () {
    super()

    this.selected = false
    this.setAttribute('role', 'tabpanel')
    this.setAttribute('aria-hidden', 'true')
  }

  updated () {
    this.setAttribute('aria-hidden', this.hasAttribute('selected') ? 'false' : 'true')
  }

  render () {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('wm-tabpanel', TabPanel)
