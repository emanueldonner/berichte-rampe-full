import { css } from 'lit'

export const styles = [css`
* {
  box-sizing: border-box;
}

:host {
  display: block;
  height: 31.25rem;
  position: relative;
}

.maplibregl-map {
  height: 100%;
}

.maplibregl-popup-content {
  border-radius: 6px;
  box-shadow: rgb(0 0 0 / 40%) 0px 3px 14px;
  padding: 2rem 1rem 1rem 1rem;
  font-family: var(--wm-font-stack-default);
  font-size: 1rem;
}

.maplibregl-popup-close-button {
  align-items: center;
  background-color: var(--wm-color-weiss);
  border-radius: 50%;
  color: var(--wm-color-fastschwarz);
  display: flex;
  font-size: 1.2rem;
  height: 1.6rem;
  justify-content: center;
  line-height: 0.7;
  padding: 0;
  right: 0.3rem;
  top: 0.3rem;
  width: 1.6rem;
}

.maplibregl-popup-content p {
  line-height: 1.6;
}

.maplibregl-popup-content p:last-of-type {
  margin-bottom: 0;
}

h3 {
  font-variation-settings: var(--wm-font-weight-bold);
  font-size: 1.2rem;
  line-height: 1.5;
  margin: 0;
}

.controls {
  background: #fff;
  position: absolute;
  inset-block-end: 0;
  inset-inline-start: 0;
  z-index: 1230;
}
`]
