import { css } from 'lit'

export const styles = [css`
* {
  box-sizing: border-box;
}

/* TODO: define grid columns as CSS properties globally  */
:host {
  --grid-template-columns-s: 4;
  --grid-template-columns-m: 3;
  --grid-template-columns-l: 2;
  --grid-template-columns-full: 1;
}

:host {
  --gap: var(--grid-spacing);
  --cols: none;

  display: grid;
  flex-grow: unset !important;
  grid-gap: var(--gap);
  grid-template-columns: var(--cols);
}

:host([size="s"]) {
  --cols: repeat(auto-fill,minmax(15rem, 1fr));
}

:host([size="full"]) {
  --cols: repeat(var(--grid-template-columns-full), 1fr);
}

@container (min-width: 48em) {
  :host([size="m"]) {
    --cols: repeat(auto-fill,minmax(19rem, 1fr));  
  }

  :host([size="l"]) {
    --cols: repeat(auto-fill,minmax(25rem, 1fr));
  }
}

@container (min-width: 64em) {
  :host([size="s"]) {
    --cols: repeat(var(--grid-template-columns-s), 1fr);
  }
  :host([size="m"]) {
    --cols: repeat(var(--grid-template-columns-m), 1fr);
  }
  :host([size="l"]) {
    --cols: repeat(var(--grid-template-columns-l), 1fr);
  }
}

:host([gap="xs"]) {
  --gap: var(--grid-spacing-xs);
}

:host([gap="s"]) {
  --gap: var(--grid-spacing-s);
}

:host([gap="m"]) {
  --gap: var(--grid-spacing-m);
}

:host([gap="l"]) {
  --gap: var(--grid-spacing-l);
}

::slotted(*) {
  max-width: 100%;
}
`]
