/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s as e,y as r}from"../../lit-element-a22611a3.js";const s=[t`
* {
  box-sizing: border-box;
}

:host {
  display: block;
}

:host([clean="true"]) ::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0 !important;
}

:host([type="horizontal"]) ::slotted(ul) {
  display: flex;
  gap: var(--list-gap);
  list-style: none;
  padding: 0 !important;
}

:host([alignment="center"]) ::slotted(ul) {
  justify-content: center;
}
`],l=[t`
:host {
  --list-border: var(--_list-border, 1px solid);
  --list-border-color: var(--_list-border-color, var(--site-color));
  --list-gap: var(--_list-gap, 0.5rem);
}`];class o extends e{static properties={clean:{type:String,reflect:!0},type:{type:String,reflect:!0},separator:{type:String,reflect:!0},alignment:{type:String,reflect:!0}};static styles=[l,s];constructor(){super(),this.clean="true",this.type="default",this.separator="none",this.alignment=""}render(){return r`
      <slot></slot>
    `}}customElements.define("wm-list",o);const i="wm-list";export{o as List,i as tagName};
