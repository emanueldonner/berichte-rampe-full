import { css } from 'lit'

export const styles = [css`

:host {
  display: inline-block;
  position: relative;
}

:is(a, figure):nth-child(n+2) {
  display: none;
}

a {
  display: block;
  position: relative;
}

dialog {
  background-color: transparent;
  border: 0;
  max-height: 80vh;
  max-height: 80dvh;
  max-width: 100%;
  opacity: 0;
  overflow: visible;
  padding: 0;
  transition: opacity 0.3s;
}

dialog::backdrop {
  background-color: rgb(0 0 0 / 0.85);
}

[open] {
  opacity: 1;
}

.html {
  background-color: var(--wm-color-weiss);
  padding: 1.5rem;
}

.html-carousel {
  padding: 0;
}

.controls {
  display: flex;
  justify-content: end;
  height: 3.25rem;
  inset-inline-start: 0;
  padding-block-end: 0.5rem;
  width: 100%;
  top: 0;
  position: fixed;
  padding: 0.5rem;
}

@media (min-width: 1024px) {
  .controls {
    padding: 0;
    inset-inline-end: 3.25rem;
    inset-block-start: 3.25rem;
    position: fixed;
    inset-inline-start: auto;


  /* Direkt über bild anzeigen:
    position: absolute;
    top: -3.25rem;
  */
  }
}

.close {
  background-color: var(--wm-color-weiss);
  border: 0;
  height: 2.75rem;
  padding: 0;
  width: 2.75rem;
}

.close:hover {
  background-color: var(--wm-color-fastschwarz);
  color: var(--wm-color-weiss);
}

.content {
  max-height: inherit;
}

.item {
  max-height: inherit;
}

.item-inner {
  max-height: inherit;
}

img {
  display: block;
  height: auto;
  max-height: inherit;
  width: min(100%, 66.875rem);
}

iframe {
  aspect-ratio: 648 / 425;
  border: 0;
  max-width: 100%;
}

.label {
  align-items: center;
  background-color: var(--wm-color-nebelgrau-light);
  color: var(--wm-color-fastschwarz);
  display: flex;
  gap: var(--wm-spacing-xs);
  inset-block-end: 0.1rem;
  inset-inline-end: 0.1rem;
  padding: var(--wm-spacing-xxs) var(--wm-spacing-xs);
  position: absolute;
}

[id="zoom"] {
  display: block;
}

figure {
  margin: 0;
}

figcaption,
.caption {
  background-color: var(--wm-color-nebelgrau-light);
  bottom: 0;
  left: 0;
  margin: 0;
  padding: var(--wm-spacing-xxs) var(--wm-spacing-xs);
  width: 100%;
}

.caption {
  position: absolute;
  transform: translateY(100%);
}
`]
