/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s as e,y as a}from"../../lit-element-a22611a3.js";import{o as s}from"../../class-map-50dbd9fb.js";import"../../directive-19e462f3.js";const i=[t`
:host {
  --stage-background-color: var(--_stage-background-color, rgb(255 255 255));
  --stage-content-padding: var(--_stage-content-padding, 2rem);
  --stage-heading-small: var(--_stage-heading-small, 2rem);
  --stage-margin: var(--_stage-margin, 1rem);
  --stage-margin-large: var(--_stage-margin-large, 1.25rem);
}`],o=[t`
* {
  box-sizing: border-box;
}

:host {
  --_margin: var(--stage-margin);

  display: grid;
  grid-column: 1 / -1 !important;
  grid-template-columns: var(--site-wrapper-padding) 1fr var(--site-wrapper-padding);
  margin-block-end: var(--_margin);
}

@media (min-width: 48em) {
  :host {
    --_margin: var(--stage-margin-large);
  }
}

.content {
  z-index: 1210;
  grid-column: 2;
}

.content--media {
  align-self: end;
  background-color: var(--stage-background-color);
  grid-row: 1;
  justify-self: start;
  padding: var(--stage-content-padding);
  width: 40ch;
}

.media {
  aspect-ratio: 1200 / 450;
  grid-column: 1 / -1;
  grid-row: 1;
  object-position: top left;
  overflow: hidden;
}

::slotted(video),
::slotted(img) {
  height: 100% !important;
  object-fit: cover !important;
  width: 100% !important;
}

::slotted(h1) {
  margin-block-end: 0 !important;
}

@media(max-width: 768px) {
  ::slotted(h1) {
    font-size: var(--stage-heading-small) !important;
  }
}
`];class r extends e{static properties={_hasMedia:{type:Boolean,attribute:!1}};static styles=[i,o];constructor(){super(),this._hasMedia=!1}firstUpdated(){this.shadowRoot.querySelector('slot[name="media"]').addEventListener("slotchange",(t=>{this._hasMedia=this.shadowRoot?.querySelector('slot[name="media"]').assignedNodes().length,this._hasMedia?document.documentElement.classList.add("wm-has-stage"):document.documentElement.classList.remove("wm-has-stage")}))}render(){const t={"content--media":this._hasMedia};return a`
      <div class="content ${s(t)}">
        <slot name="heading"></slot>
        <slot name="content"></slot>
      </div>
      <div class="media" ?hidden=${!this._hasMedia}>
        <slot name="media"></slot>
      </div>
    `}}customElements.define("wm-stage",r);const n="wm-stage";export{r as Stage,n as tagName};
