import { LitElement, html } from 'lit'
import { styles } from './styles/infobox.styles'

export class Infobox extends LitElement {
  static styles = [styles]

  render () {
    return html`
      <wm-card size="default">
        <wm-stack slot="content" equal="true" wrap="false" gap="l">
          <slot></slot>
        </wm-stack>
      </wm-card>
    `
  }
}

customElements.define('wm-infobox', Infobox)

export const tagName = 'wm-infobox'
