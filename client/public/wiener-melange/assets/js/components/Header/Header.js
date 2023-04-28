/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as e,s as a,y as r}from"../../lit-element-a22611a3.js";import{l as t}from"../../if-defined-133e139e.js";const o=[e`
  * {
    box-sizing: border-box;
  }
  
  :host {
    --_width: calc(var(--site-wrapper-width-s) + var(--site-wrapper-padding) * 2);
    --header-nav-active-link-color: var(--_header-nav-active-link-color, var(--wm-color-fastschwarz));
    --header-nav-active-link-background: var(--wm-color-nebelgrau);
    --header-nav-active-list-background: var(--wm-color-nebelgrau);
    transition: transform 0.3s;
    z-index: 1230;
  }

  @media(min-width: 48em) {
    :host {
      --_width: var(--site-wrapper-width);
    }
  }

  :host([color="flieder"]) {
    --header-nav-wrapper-background: var(--wm-color-flieder-light) !important;
    --header-nav-active-link-background: var(--wm-color-flieder);
    --header-nav-active-list-background: var(--wm-color-flieder);
  }

  :host([color="goldgelb"]) {
    --header-nav-wrapper-background: var(--wm-color-goldgelb-light) !important;
    --header-nav-active-link-background: var(--wm-color-goldgelb);
    --header-nav-active-list-background: var(--wm-color-goldgelb);
  }

  :host([color="abendstimmung"]) {
    --header-nav-wrapper-background: var(--wm-color-abendstimmung-light) !important;
    --header-nav-active-link-background: var(--wm-color-abendstimmung);
    --_header-nav-active-link-color: var(--wm-color-weiss);
    --header-nav-active-list-background: var(--wm-color-abendstimmung);
  }

  :host([color="morgenrot"]) {
    --header-nav-wrapper-background: var(--wm-color-morgenrot-light) !important;
    --header-nav-active-link-background: var(--wm-color-morgenrot);
    --header-nav-active-list-background: var(--wm-color-morgenrot);
  }

  :host([color="frischgruen"]) {
    --header-nav-wrapper-background: var(--wm-color-frischgruen-light) !important;
    --header-nav-active-link-background: var(--wm-color-frischgruen);
    --header-nav-active-list-background: var(--wm-color-frischgruen);
  }
  
  :host([color="wasserblau"]) {
    --header-nav-wrapper-background: var(--wm-color-wasserblau-light) !important;
    --header-nav-active-link-background: var(--wm-color-wasserblau);
    --header-nav-active-list-background: var(--wm-color-wasserblau);
  }

  .nav-actions {
    --_layout: row-reverse;
    align-items: center;
    background: red;
    border-image: conic-gradient( var(--header-nav-wrapper-background) 0 0) fill 1//0 50vw;
    display: flex;
    flex-direction: var(--_layout);
    justify-content: space-between;
    min-height: var(--header-nav-height);
    padding-inline: var(--site-wrapper-padding);
    margin-inline: var(--site-wrapper-margin-inline);
  }

  @media (min-width: 64em) {
    .nav-actions {
      --_layout: row;
    }
  }
  
  :host > * {
    width: 100%;
    max-width: var(--_width);
    margin-inline: auto;
  }

  [hidden] {
    display: none !important;
  }
`];class n extends a{static properties={microsite:{type:String},_hasNavOrAction:{type:Boolean},_scrolledOffset:{type:Number}};static styles=[o];constructor(){super(),this.microsite=!0,this._hasNavOrAction=!1,this._scrolledOffset=30}connectedCallback(){super.connectedCallback(),this._addGlobalEvents(),this.setAttribute("role","banner"),this._setHeaderHeight(),this._scrollHeader()}_addGlobalEvents(){this._lastKnownScrollPosition=window.pageYOffset,window.addEventListener("scroll",this._scrollHeader.bind(this))}_scrollHeader(){this._lastKnownScrollPosition=window.pageYOffset,this._lastKnownScrollPosition>this._scrolledOffset?document.documentElement.classList.add("wm-window-was-scrolled"):document.documentElement.classList.remove("wm-window-was-scrolled")}firstUpdated(){"false"===this.microsite&&document.documentElement.classList.add("wien")}addAction(e){console.log("add action"),this.querySelector('[slot="actions"]')&&(this.querySelector('[slot="actions"]').appendChild(e),this._hasNavOrAction=!0,this._setHeaderHeight())}_onSlotChange(e){e.target.assignedElements({flatten:!0})[0].querySelectorAll("*").length&&(this._hasNavOrAction=!0,this._setHeaderHeight())}_setHeaderHeight(){const e=document.documentElement;this._hasNavOrAction?e.classList.remove("wien"):e.classList.add("wien")}render(){return r`
    <div>
      <slot name="header"></slot>
    </div>
    <div class="nav-actions" hidden=${t(this._hasNavOrAction?void 0:"hidden")}">
      <slot name="nav" @slotchange="${this._onSlotChange}"></slot>
      <slot name="actions" @slotchange="${this._onSlotChange}"></slot>
    </div>
    `}}customElements.define("wm-header",n);const i="wm-header";export{n as Header,i as tagName};
