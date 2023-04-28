/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as e,s as t,y as r}from"../../lit-element-a22611a3.js";const a=[e`
:host {
  --spacing: var(--card-spacing);

  align-content: start;
  background-color: var(--card-background);
  border: var(--card-border);
  box-shadow: var(--card-shadow);
  display: grid;
  grid-template-columns: var(--spacing) 1fr var(--spacing);
  grid-template-rows: repeat(3, min-content) 1fr;
  /*height: 100%;*/
  padding-block: var(--spacing);
  position: relative;
  width: 100%;
}

@media(min-width: 1024px) {
  :host {
    --spacing: var(--card-spacing-large);
  }
}

:host([size="s"]) {
  max-width: 16.25rem;
}

:host([size="m"]) {
  max-width: 21.875rem;
}

:host([size="l"]) {
  max-width: 33.125rem;
}

::slotted(:is(img, picture)) {
  display: block;
  height: 100% !important;
  object-fit: cover;
  width: 100%;
}

::slotted(*) {
  grid-column: 2;
  min-width: 0;
}

::slotted(:is(img, picture)),
::slotted(div[slot]) {
  margin: 0 !important;
}

.media {
  aspect-ratio: 16 / 9;
  grid-column: 1 / -1;
  margin-block-end: var(--spacing);
  margin-block-start: calc(var(--spacing) * -1);
  order: -2;
  position: relative;
}

.content ::slotted(*:not(:last-of-type)) {
  margin-block-end: var(--spacing) !important;
}

.content {
  grid-column: 2;
  z-index: 1;
}

.postcontent {
  grid-column: 2;
  grid-row: -1;
  z-index: 1;
}

.eyecatcher {
  background: var(--card-media-background);
  color: var(--card-media-color);
  font-size: var(--card-eyecatcher-fontsize);
  font-weight: normal;
  padding: 0 var(--card-eyecatcher-padding);
  position: absolute;
}

:host([color="goldgelb"]) {
  --card-media-background: var(--wm-color-goldgelb) !important;
}

:host([color="wasserblau"]) {
  --card-media-background: var(--wm-color-wasserblau) !important;
}

:host([color="morgenrot"]) {
  --card-media-background: var(--wm-color-morgenrot) !important;
}

:host([color="flieder"]) {
  --card-media-background: var(--wm-color-flieder) !important;
}

:host([color="nebelgrau"]) {
  --card-media-background: var(--wm-color-nebelgrau) !important;
}

:host([color="abendstimmung"]) {
  --card-media-background: var(--wm-color-abendstimmung) !important;
  --card-media-color: var(--wm-color-weiss) !important;
}

:host([position*="bottom"]) .eyecatcher {
  inset-block-end: var(--card-eyecatcher-spacing);
} 

:host([position*="top"]) .eyecatcher {
  inset-block-start: var(--card-eyecatcher-spacing);
} 

:host([position*="left"]) .eyecatcher {
  inset-inline-start: 0;
} 

:host([position*="right"]) .eyecatcher {
  inset-inline-end: 0;
} 

:host([position*="left"][type="eyecatcher-round"]) .eyecatcher {
  inset-inline-start: var(--card-eyecatcher-spacing);
} 

:host([position*="right"][type="eyecatcher-round"]) .eyecatcher {
  inset-inline-end: var(--card-eyecatcher-spacing);
} 

:host([type="eyecatcher-round"]) .eyecatcher {
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 3.5em;
  justify-content: center;
  padding: 0;
  transform: rotate(-20deg);
  width: 3.5em;
}
`],o=[e`
:host {
  --card-background: var(--_card-background, #FFFFFF);
  --card-border: var(--_card-border, 1px solid var(--site-color));
  --card-eyecatcher-spacing: var(--_card-eyecatcher-spacing, 1rem);
  --card-eyecatcher-padding: var(--_card-eyecatcher-padding, 0.5rem);
  --card-eyecatcher-fontsize: var(--_card-eyecatcher-fontsize, 1.5rem);
  --card-media-background: var(--_card-media-background, hsl(0 0% 0%));
  --card-media-color: var(--_card-media-color, hsl(0 0% 100%));
  --card-spacing: var(--_card-spacing, 1rem);
  --card-spacing-large: var(--_card-spacing-large, 1.5rem);
  --card-shadow: var(--_card-shadow, none);
}`];class i extends t{static properties={size:{type:String,reflect:!0},_hasMedia:{type:String,attribute:!1},blocklink:{type:String,reflect:!0},color:{type:String},position:{type:String,reflect:!0},type:{type:String}};static styles=[o,a];constructor(){super(),this.size="m",this.type="",this.position="bottom right",this.color="frischgruen",this.blocklink="false",this._hasMedia=null}firstUpdated(){this.shadowRoot.querySelector('slot[name="media"]').addEventListener("slotchange",(e=>{this._hasMedia=this.shadowRoot.querySelector('slot[name="media"]').assignedNodes().length,this._hasMedia&&this._linkCard()}))}_linkCard(){this.querySelectorAll("a").length<2&&1===this.querySelectorAll("h2 a, h3 a, h4 a").length&&"false"===this.blocklink&&(this.blocklink="true")}render(){return r`
      <slot name="heading"></slot>

      <div class="media" ?hidden=${!this._hasMedia}>
        <slot name="media"></slot>
        <div class="eyecatcher">
          <strong><slot name="eyecatcher"></slot></strong>
        </div>
      </div>
      
      <div class="content wm-h-vs">
        <slot name="content"></slot>
      </div>
      
      <div class="postcontent">
        <slot name="postcontent"></slot>
      </div>
    `}}customElements.define("wm-card",i);const c="wm-card";export{i as Card,c as tagName};
