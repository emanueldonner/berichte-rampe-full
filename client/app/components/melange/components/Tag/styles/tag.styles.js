import { css } from 'lit'

export const styles = [css`
* {
  box-sizing: border-box;
}

:host {
  --link-color: var(--tag-link-color);

  display: inline-block;
  position: relative;
}

:host > a, wm-button {
  --_padding: var(--tag-padding-block) var(--tag-padding-inline);
  align-items: center;
  background-color: var(--tag-background) !important;
  border: 1px solid var(--tag-border);
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  font-size: var(--tag-font-size) !important;
  gap: var(--tag-gap);
  min-height: var(--tag-min-height);
  padding: var(--_padding) !important;
  text-decoration: none;
}

wm-button {
  white-space: nowrap;
}

:host([open="true"]) {
  z-index: 1;
}

:host([open="true"]) wm-button {
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

a:is(:link, :visited) {
  color: var(--link-color);
}

:is(a, wm-button):where(:hover, :focus) {
  --tag-background: var(--tag-background-hover);
}

ul {
  background-color: var(--tag-background);
  border: solid var(--tag-border);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-width: 0 1px 1px;
  display: none;
  left: 0;
  list-style: none;
  margin: 0 !important;
  max-height: 12rem;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 0;
  position: absolute;
  scrollbar-gutter: stable;
  top: 100%;
}

:host([open="true"]) ul {
  display: block;
}

ul a {
  display: block;
  padding: 0.3rem var(--tag-padding-inline);
  white-space: nowrap;
}

ul a:is(:hover, :focus) {
  background-color: var(--tag-background-hover)
}

ul a:is(:link, :visited) {
  text-decoration: none;
}

@media (min-width: 64em) {
  :host {
    --tag-min-height: var(--tag-min-height-large) !important;
    --_padding: var(--tag-padding-block-large) var(--tag-padding-inline-large) !important;
  }
}
`]
