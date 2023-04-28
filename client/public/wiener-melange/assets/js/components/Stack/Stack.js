/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s as a,y as s}from"../../lit-element-a22611a3.js";const e=[t`
:host {
  display: flex;
  flex-direction: column;
}

@media(min-width: 48em) {
  :host {
    flex-direction: row;
  }
}

:host([vertical="true"]) {
  flex-direction: column;
}

:host([horizontal="true"]) {
  flex-direction: row;
}

:host([grow="false"][vertical="true"]) {
  align-items: start;
}

/* Noch testen, ob das was macht:
:host([wrap="false"]) ::slotted(*) {
  flex-shrink: 0;
}
*/

:host {
  --_justify: start;
  --_align: normal;
  --_gap: 0;

  justify-content: var(--_justify);
  align-items: var(--_align);
  gap: var(--_gap);
}

:host([wrap="true"]) {
  flex-wrap: wrap;
}

:host([wrap="false"]:not([vertical="true"])) {
  overflow: auto;
}

:host([grow="true"]) ::slotted(*) {
  flex-grow: 1;
}

:host([equal="true"][grow="true"]) ::slotted(*) {
  flex-shrink: 0;
  min-width: 0;
}

:host([equal="true"][grow="true"]:not([wrap="true"])) ::slotted(*) {
  flex-basis: 0px;
}

:host([gap="xs"]) {
  --_gap: var(--stack-spacing-xs);
}

:host([gap="s"]) {
  --_gap: var(--stack-spacing-s);
}

:host([gap="m"]) {
  --_gap: var(--stack-spacing-m);
}

:host([gap="l"]) {
  --_gap: var(--stack-spacing-l);
}

:host([gapx="xs"]) {
  --_gap: 0 var(--stack-spacing-xs);
}

:host([gapx="s"]) {
  --_gap: 0 var(--stack-spacing-s);
}

:host([gapx="m"]) {
  --_gap: 0 var(--stack-spacing-m);
}

:host([gapx="l"]) {
  --_gap: 0 var(--stack-spacing-l);
}

:host([gapy="xs"]) {
  --_gap: var(--stack-spacing-xs) 0;
}

:host([gapy="s"]) {
  --_gap: var(--stack-spacing-s) 0;
}

:host([gapy="m"]) {
  --_gap: var(--stack-spacing-m) 0;
}

:host([gapy="l"]) {
  --_gap: var(--stack-spacing-l) 0;
}

:host([justify="center"]) {
  --_justify: center;
}

:host([justify="space-between"]) {
  --_justify: space-between;
}

@media(min-width: 48em) {
  :host([alignment="center"]) {
    --_align: center;
  }

  :host([alignment="end"]) {
    --_align: end;
  }
}

::slotted(img) {
  align-self: start;
}

::slotted(*) {
  margin: 0 !important;
}
`],r=[t`
:host {
  --stack-spacing-xs: var(--_stack-spacing-xs, 0.625rem);
  --stack-spacing-s: var(--_stack-spacing-s, 0.9375rem);
  --stack-spacing-m: var(--_stack-spacing-m, 1.25rem);
  --stack-spacing-l: var(--_stack-spacing-l, 01.875rem);
}`];class i extends a{static properties={gap:{type:String,reflect:!0},gapx:{type:String,reflect:!0},gapy:{type:String,reflect:!0},grow:{type:String,reflect:!0},equal:{type:String,reflect:!0},wrap:{type:String,reflect:!0},vertical:{type:String,reflect:!0},horizontal:{type:String,reflect:!0},alignment:{type:String,reflect:!0},justify:{type:String,reflect:!0}};static styles=[r,e];constructor(){super(),this.gap="default",this.gapx=void 0,this.gapy=void 0,this.grow=!0,this.equal=!0,this.wrap=!1,this.vertical=!1,this.horizontal=void 0,this.justify=void 0,this.alignment=void 0}render(){return s`
      <slot></slot>
    `}}customElements.define("wm-stack",i);const n="wm-stack";export{i as Stack,n as tagName};
