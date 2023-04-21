import { css } from 'lit'

export const styles = [css`
:host {
  display: block;

  border: var(--tabs-border);
  padding: var(--tabs-padding);
}

[role="tablist"] {
  display: flex;
  gap: var(--tabs-gap);
  justify-content: var(--tabs-alignment);
  margin-bottom: var(--tabs-spacing);
}

::slotted([aria-hidden="true"]) {
  display: none;
}

::slotted([aria-hidden="false"]) {
  display: block;
}
`]
