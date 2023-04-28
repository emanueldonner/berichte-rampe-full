/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as o,s as r,y as t}from"../../lit-element-a22611a3.js";const h=[o`
:host {
  --highlight-background: var(--_highlight-background, gray);
  --highlight-color: var(--_highlight-color, #000000);
  --highlight-padding: var(--_highlight-padding, 1rem);
  --highlight-padding-large: var(--_highlight-padding-large, 1rem 3rem);
}`],i=[o`
* {
  box-sizing: border-box;
}

:host {
  background-color: var(--highlight-background);
  color: var(--highlight-color);
  display: block;
  padding: var(--highlight-padding);
}

:host([type="large"]) {
  background-color: transparent;
  border-block: 5px solid var(--highlight-background);
}

@media(min-width: 1024px) {
  :host([type="large"]) {
    padding: var(--highlight-padding-large);
  }
}

:host([color="weiss"]) { 
  --highlight-background: var(--wm-color-weiss) !important;
  border: 1px solid var(--wm-color-nebelgrau);
}

:host([color="nebelgrau"]) { 
  --highlight-background: var(--wm-color-nebelgrau) !important;
}

:host([color="frischgruen"]) {
  --highlight-background: var(--wm-color-frischgruen) !important;
}

:host([color="frischgruen-light"]) {
  --highlight-background: var(--wm-color-frischgruen-light) !important;
}

:host([color="wasserblau"]) {
  --highlight-background: var(--wm-color-wasserblau) !important;
}

:host([color="wasserblau-light"]) {
  --highlight-background: var(--wm-color-wasserblau-light) !important;
}

:host([color="fastschwarz"]) {
  --highlight-background: var(--wm-color-fastschwarz) !important; 
  --highlight-color: var(--wm-color-weiss) !important;
}

:host([color="fastschwarz"][type="large"]) {
  --highlight-color: var(--wm-color-fastschwarz) !important;
}

:host([color="abendstimmung"]) {
  --highlight-background: var(--wm-color-abendstimmung) !important;
  --highlight-color: var(--wm-color-weiss) !important;
}

:host([color="abendstimmung"][type="large"]) {
  --highlight-color: var(--wm-color-fastschwarz) !important;
}

:host([color="abendstimmung-light"]) {
  --highlight-background: var(--wm-color-abendstimmung-light) !important;
}

:host([color="goldgelb"]) {
  --highlight-background: var(--wm-color-goldgelb) !important;
}

:host([color="goldgelb-light"]) {
  --highlight-background: var(--wm-color-goldgelb-light) !important;
}

:host([color="flieder"]) {
  --highlight-background: var(--wm-color-flieder) !important;
}

:host([color="flieder-light"]) {
  --highlight-background: var(--wm-color-flieder-light) !important;
}

:host([color="morgenrot"]) {
  --highlight-background: var(--wm-color-morgenrot) !important;
}

:host([color="morgenrot-light"]) {
  --highlight-background: var(--wm-color-morgenrot-light) !important;
}

.content {
  max-width: var(--content-text-max-width);
}
`];class g extends r{static properties={color:{type:String,reflect:!0},type:{type:String,reflect:!0}};static styles=[h,i];constructor(){super(),this.color="nebelgrau-light",this.type=""}render(){return t`
      <div class="content">
        <slot></slot>
      </div>
    `}}customElements.define("wm-highlight",g);const l="wm-highlight";export{g as Highlight,l as tagName};
