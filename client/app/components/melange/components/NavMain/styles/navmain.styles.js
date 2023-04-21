import { css } from 'lit'

export const styles = [css`
* {
  box-sizing: border-box;
}

:host {
  display: block;
  overflow: hidden;
}

ul {
  font-variation-settings: var(--wm-font-weight-bold);
  list-style: none;
  margin: 0;
  padding: 0;
}

ul ul {
  padding-left: var(--wm-spacing-s);
}

a {
  display: block;
  padding: 0.7rem 0;
  text-transform: uppercase;
}

a:is(:link, :visited) {
  color: var(--wm-color-fastschwarz);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
/*
nav {
  display: flex;
  justify-content: end;
}
*/

dialog {
  background-color: transparent;
  border: 0;
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
  padding: var(--_main-padding-block) var(--wm-wrapper-padding);
  width: 100vw;
  overflow: hidden;
}

::backdrop {
  background: rgb(0 0 0 / 0.5);
}

.wrapper {
  height: 100%;
  margin-inline: auto;
  max-width: var(--wm-size-wrapper-width);
  overflow: hidden;
}

.transition {
  transition: transform 0.25s ease-out;
}

.content {
  background-color: var(--wm-color-weiss);
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-inline: auto 3.125rem;
  max-width: 25rem;
  width: 100%;
}

.content--hidden {
  transform: translateX(100vw);
}

.header {
  text-align: right;
  padding: var(--wm-spacing-m) var(--wm-spacing-m) 0;
}

.lists {
  flex-grow: 1;
  overflow: auto;
  padding: var(--wm-spacing-m) var(--wm-spacing-xl);
}

wm-button {
  line-height: 1;
}

wm-icon {
  display: block;
}

.wm-h-vh {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  margin: -1px;
}
`]
