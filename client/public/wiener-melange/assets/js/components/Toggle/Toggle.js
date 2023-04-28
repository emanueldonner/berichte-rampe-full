/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s as e,y as i}from"../../lit-element-a22611a3.js";import{o as n}from"../../class-map-50dbd9fb.js";import{throttle as o}from"../misc/utils.js";import"../../directive-19e462f3.js";const s=[t`
  :host {
    display: inline-block;
    border: var(--toggle-border);
    padding: var(--toggle-padding);
  }

  :host([full]) {
    display: block;
  }

  wm-button {
    display: inline-flex;
  }

  button {
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    font: inherit;
    font-family: var(--site-font-family);
    justify-content: space-between;
    padding: 0;
    position: relative;
  }

  button:focus-visible {
    outline: var(--site-focus-outline)
  }

  button::after {
    background: var(--toggle-icon) no-repeat center right !important;
    background-size: contain !important;
    content: "";
    display: block;
    height: 1.4em;
    transition: transform 0.3s;
    width: 1.2em;
  }

  [aria-expanded="true"]::after{
    transform: rotate(180deg)
  }

  :host([full]) button {
    justify-content: space-between;
    width: 100%;
  }

  :host([full]) wm-button {
    display: flex;
  }

  .button--hidden {
    display: none !important;
  }
  
  .content {
    transition: all 0.3s;
    overflow: hidden;
  }
  
  .content--hidden {
    height: 0;
    visibility: hidden;
  }

  :host([open]) .content {
    visibility: visible;
  }
`],r=[t`
:host {
  --toggle-border: var(--_toggle-border, none);
  --toggle-icon: var(--_toggle-icon, none);
  --toggle-padding: var(--_toggle-padding, 0);
}`];class l extends e{static properties={full:{type:Boolean,reflect:!0},open:{type:Boolean,reflect:!0},min:{type:String,reflect:!0},_active:{type:Boolean},_height:{type:String}};static styles=[r,s];get _content(){return this.renderRoot.querySelector(".content")??null}get _wrap(){return this.renderRoot.querySelector(".wrap")??null}constructor(){super(),this.full=!1,this.open=!1,this.min=void 0,this._height="",this._active=!0}connectedCallback(){super.connectedCallback(),this.min&&this._isActive(),window.addEventListener("resize",o(this._updateHeight.bind(this),200))}firstUpdated(){this._updateHeight()}updated(t){t.has("_active")&&(this._active||this._content.style.removeProperty("height")),t.has("open")&&(this.open?this._setHeight():this._content.style.removeProperty("height"))}_updateHeight(){this._active&&(this._getHeight(),this.open&&this._setHeight())}_getHeight(){this._content&&(this._height=`${this._wrap.scrollHeight}px`)}_setHeight(){this._content&&(this._content.style.height=this._height)}_toggle(){this.open=!this.open}_isActive(){const t=window.matchMedia(`(min-width: ${this.min})`),e=t=>{this._active=t.matches};t.addEventListener("change",e),e(t)}render(){const t={"button--hidden":!this._active},e={"content--hidden":this._active&&!this.open};return i`
      <wm-button @click="${this._toggle}" full="${this.full}" class="${n(t)}">
        <button aria-expanded="${this.open}">
          <slot name="label"></slot>
        </button>
      </wm-button>
      
      <div class="content ${n(e)}">
        <div class="wrap">
          <slot name="content"></slot>
        </div>
      </div>
    `}}customElements.define("wm-toggle",l);const a="wm-toggle";export{l as Toggle,a as tagName};
