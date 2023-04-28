/* @copyright Stadt Wien - Wiener Melange v2 */
import{s as t,i as e,y as o}from"../../lit-element-a22611a3.js";import{t as r}from"../../tabs.tokens-1bf80ef0.js";class s extends t{static properties={selected:{type:Boolean,reflect:!0}};static styles=[r,e`
      * {
        box-sizing: border-box;
      }

      :host {
        --border-color: var(--tab-border-color);
        --background-color: var(--tab-background-color);

        background-color: var(--background-color);
        display: block;
        cursor: pointer;
        line-height: 1.4;
        border-style: solid;
        border-width: var(--tab-border-width);
        border-color: var(--border-color);
        font-variation-settings: var(--tab-font-variation-settings);
        font-weight: var(--tab-font-weight);
        padding: var(--tab-padding);
      }

      :host([selected]) {
        --border-color: var(--tab-border-color-selected);
        --background-color: var(--tab-background-color-selected);
      }

      :host(:hover) {
        --background-color: var(--tab-background-color-selected);
      }

      :host(:focus-visible) {
        outline-offset: calc(var(--site-focus-outline-width) * -1) !important;
      }
    `];constructor(){super(),this.selected=!1,this.setAttribute("role","tab")}updated(){this.setAttribute("aria-selected",this.hasAttribute("selected")),this.setAttribute("tabindex",this.hasAttribute("selected")?0:-1)}render(){return o`
      <slot></slot>
    `}}customElements.define("wm-tab",s);export{s as Tab};
