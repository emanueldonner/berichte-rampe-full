import { css } from 'lit'

export const styles = [css`
* {
  box-sizing: border-box;
}

:host {
  display: block;
}

:host([clean="true"]) ::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0 !important;
}

:host([type="horizontal"]) ::slotted(ul) {
  display: flex;
  gap: var(--list-gap);
  list-style: none;
  padding: 0 !important;
}

:host([alignment="center"]) ::slotted(ul) {
  justify-content: center;
}
`]
