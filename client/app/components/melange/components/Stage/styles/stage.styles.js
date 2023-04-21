import { css } from 'lit'

export const styles = [css`
* {
  box-sizing: border-box;
}

:host {
  --_margin: var(--stage-margin);

  display: grid;
  grid-column: 1 / -1 !important;
  grid-template-columns: var(--site-wrapper-padding) 1fr var(--site-wrapper-padding);
  margin-block-end: var(--_margin);
}

@media (min-width: 48em) {
  :host {
    --_margin: var(--stage-margin-large);
  }
}

.content {
  z-index: 1210;
  grid-column: 2;
}

.content--media {
  align-self: end;
  background-color: var(--stage-background-color);
  grid-row: 1;
  justify-self: start;
  padding: var(--stage-content-padding);
  width: 40ch;
}

.media {
  aspect-ratio: 1200 / 450;
  grid-column: 1 / -1;
  grid-row: 1;
  object-position: top left;
  overflow: hidden;
}

::slotted(video),
::slotted(img) {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

::slotted(h1) {
  margin-block-end: 0 !important;
}

@media(max-width: 768px) {
  ::slotted(h1) {
    font-size: var(--stage-heading-small) !important;
  }
}
`]
