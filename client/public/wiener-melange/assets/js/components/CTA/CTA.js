/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s as o,y as r}from"../../lit-element-a22611a3.js";const a=[t`
  * {
    box-sizing: border-box;
  }

  :host {
    display: inline-flex;
  }

  ::slotted(a:link) {
    --link-color: var(--cta-color-link) !important;
    --link-color-visited: var(--cta-color-visited) !important;
  }

  ::slotted(:is(a, button)) {
    background: var(--cta-icon) no-repeat center right 0.5rem !important;
    display: inline-block !important;
    font-weight: var(--cta-font-weight)!important;
    font-variation-settings: var(--cta-font-variation-settings) !important;
    padding: var(--cta-padding) !important;
    text-decoration: none !important;
    transition: background 0.3s !important;
    width: 100% !important;
   }

  ::slotted(:is(a, button):is(:hover, :focus-visible)) {
    background-position: 100% !important;
  }

  ::slotted(button) {
    border: none !important; 
    color: currentColor !important;
    text-transform: none !important;
    cursor: pointer;
    text-align: left !important;
  }

  /* Full width links */
  :host([full="true"]) {
    width: 100%;
  }

  /* Display arrow left instead of right */
  :host([start="true"]) ::slotted(:is(a, button)) {
    background-image: var(--cta-icon-start) !important; 
    background-position: center left !important;
    padding: var(--cta-padding-start) !important;
    text-align: right !important;
  }

  :host([start="true"]) ::slotted(:is(a, button):is(:hover, :focus-visible)) {
    background-position: center left -0.5rem !important;
  }
`],i=[t`
:host {
  --cta-icon: var(--_cta-icon, none);
  --cta-icon-start: var(--_cta-icon-start, none);
  --cta-color-link: var(--_cta-color-link, var(--site-color));
  --cta-color-visited: var(--_cta-color-visited, var(--site-color));
  --cta-font-variation-settings: var(--_cta-font-variation-settings, none);
  --cta-font-weight: var(--_cta-font-weight, bold);
  --cta-padding: var(--_cta-padding, .5rem .5rem .5rem 0);
  --cta-padding-start: var(--_cta-padding-start, .5rem 0 .5rem .5rem .5rem);
}`];class n extends o{static properties={full:{type:String,reflect:!0},start:{type:String,reflect:!0}};static styles=[i,a];constructor(){super(),this.full="false",this.start="false"}render(){return r`
      <slot></slot>
    `}}customElements.define("wm-cta",n);const e="wm-cta";export{n as CTA,e as tagName};
