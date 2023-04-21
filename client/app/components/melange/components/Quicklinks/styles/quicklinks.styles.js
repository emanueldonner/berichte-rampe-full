import { css } from 'lit'

export const styles = [css`
:host {
  --_column-count: 1;
  --_max-width: var(--content-text-max-width);

  display: block;
}

@container(min-width: 64rem) {
  :host([cols="2"])  {
    --_column-count: 2;
  }
}

:host(:not([cols])) {
  max-width: var(--_max-width);
}

::slotted(:is(ul, ol)) {
  column-count: var(--_column-count);
  column-gap: var(--quicklinks-gap);
  list-style: none;
  margin: 0;
  padding: 0 !important;
}
`]
