import { css } from 'lit'

export const styles = [css`
* {
  box-sizing: border-box;
}

:host {
  display: block;
}

.heading {
  margin: 0;
}

button {
  all: unset;
  background-color: var(--accordion-background);
  box-sizing: border-box;
  cursor: pointer;
  font-size: 1.1rem;
  font-variation-settings: "wght" 600;
  font-weight: 400;
  padding-block: var(--accordion-padding-block);
  padding-inline: var(--accordion-padding-inline);
  position: relative;
  width: 100%;
}

button::after {
  content: "";
  background: var(--accordion-icon) no-repeat center right;
  background-size: cover;
  display: inline-block;
  height: var(--accordion-icon-size);
  inset-inline-end: var(--accordion-padding-inline);
  inset-block: 0;
  margin: auto;
  position: absolute;
  transition: 0.2s all ease-in-out;
  width: var(--accordion-icon-size);
}

button:where(:hover, :focus-visible)::after {
  transform: rotate(-90deg);
}

[aria-expanded="true"]::after {
  transform: rotate(-180deg);
}

.panel {
  background-color: var(--accordion-background);
  display: none;
  overflow: hidden;
  padding: 0 var(--accordion-padding-inline);
}

.open {
  display: block;
}
`]
