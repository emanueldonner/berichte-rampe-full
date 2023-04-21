import { css } from 'lit'

export const styles = [css`
* {
  box-sizing: border-box;
}

:host {
  display: block;
}

::slotted(ul) {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wm-spacing-xs);
  list-style: none;
  margin: 0;
  padding: 0 !important;
}

:host([scrollable]) ::slotted(ul) {
  flex-wrap: nowrap;
  overflow: auto;
}
`]
