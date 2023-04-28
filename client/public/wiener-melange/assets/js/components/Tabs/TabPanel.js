/* @copyright Stadt Wien - Wiener Melange v2 */
import{s as t,i as e,y as r}from"../../lit-element-a22611a3.js";import{t as s}from"../../tabs.tokens-1bf80ef0.js";class o extends t{static properties={selected:{type:Boolean,reflect:!0}};static styles=[s,e`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        border-style: solid;
        border-color: var(--tabpanel-border-color);
        border-width: var(--tabpanel-border-width);
        padding: var(--tabpanel-padding);
      }
    `];constructor(){super(),this.selected=!1,this.setAttribute("role","tabpanel"),this.setAttribute("aria-hidden","true")}updated(){this.setAttribute("aria-hidden",this.hasAttribute("selected")?"false":"true")}render(){return r`
      <slot></slot>
    `}}customElements.define("wm-tabpanel",o);export{o as TabPanel};
