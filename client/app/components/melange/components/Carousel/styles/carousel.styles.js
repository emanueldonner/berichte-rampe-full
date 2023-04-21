import { css } from 'lit'

export const styles = [css`
* {
  box-sizing: border-box;
}

:host {
  display: block;
  margin-inline: calc(var(--carousel-shadow-offset) * -1);
  max-height: inherit;
  left: calc(var(--carousel-shadow-offset) * -1);
  position: relative;
  width: calc(100% + (var(--carousel-shadow-offset) * 2));
}

.inner {
  max-height: inherit;
  min-height: 100px;
  overflow: hidden;
  padding: 0 var(--carousel-shadow-offset) var(--carousel-shadow-offset);
  position: relative;
}

.strip {
  display: flex;
  gap: var(--carousel-gap);
  max-height: inherit;
  min-width: 100%;
  transition: 0.2s ease-in-out;
  width: min-content;
}

:host([single]) .strip {
  align-items: center;
}

.strip > ::slotted(*) {
  flex-shrink: 0;
}

.control {
  position: absolute;
  background: var(--carousel-control-bg) no-repeat center;
  border: 0;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0,0,0,.16);
  height: 3.75rem;
  inset-block-start: 50%;
  opacity: 1;
  padding: 0;
  transform-origin: center center;
  transition: scale 0.3s, opacity 0.3s;
  width: 3.75rem;
  z-index: 1;
}

.control--prev {
  background-image: var(--carousel-control-bg-start);
  inset-inline-start: 0;
  translate: -50% -50%;
}

.control--next {
  background-image: var(--carousel-control-bg-end);
  inset-inline-end: 0;
  translate: 50% -50%;
}

.control--inactive {
  opacity: 0;
  visibility: hidden;
}

.control:is(:hover, :focus) {
  scale: 1.1;
}

img {
  max-height: inherit;
}

wm-modal img[src],
.loaded {
  min-height: 0;
  max-height: 100%;
}
`]
