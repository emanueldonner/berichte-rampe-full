import { css } from 'lit'

export const styles = [css`
  * {
    box-sizing: border-box;
  }

  :host {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--anchor-gap);
    margin-block-end: 1em;
  }

  ::slotted(*) {
    margin-bottom: 0 !important;
  }

  wm-icon {
    display: block;
  }

  a {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  a:is(:link, :visited) {
    color: var(--site-color)
  }

  :host(:is(:hover, :focus-within)) a {
    opacity: 1;
  }

  :focus-visible {
    outline: var(--site-focus-outline);
  }
`]
