/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s,y as l}from"../../lit-element-a22611a3.js";const e=[t`
* {
  box-sizing: border-box;
}

:host {
  display: block;
}

::slotted(ul) {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wm-spacing-xs);
  list-style: none;
  margin: 0;
  padding: 0 !important;
}

:host([scrollable]) ::slotted(ul) {
  flex-wrap: nowrap;
  overflow: auto;
}
`];class o extends s{static properties={scrollable:{type:Boolean}};static styles=[e];constructor(){super(),this.scrollable=!1}render(){return l`
      <slot></slot>
    `}}customElements.define("wm-tag-list",o);const r="wm-tag-list";export{o as TagList,r as tagName};
