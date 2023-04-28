/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as s,s as r,y as e}from"../../lit-element-a22611a3.js";const i=[s`
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
`],t=[s`
:host {
  --grid-spacing: var(--_grid-spacing, 1rem);
  --grid-spacing-xs: var(--_grid-spacing-xs, 0.625rem);
  --grid-spacing-s: var(--_grid-spacing-s, 0.9375rem);
  --grid-spacing-m: var(--_grid-spacing-m, 1.25rem);
  --grid-spacing-l: var(--_grid-spacing-l, 1.875rem);
}`];class a extends r{static properties={gap:{type:String,reflect:!0},size:{type:String,reflect:!0}};constructor(){super(),this.gap="default",this.size="m"}static styles=[t,i];render(){return e`
      <slot></slot>
    `}}customElements.define("wm-grid",a);const l="wm-grid";export{a as Grid,l as tagName};
