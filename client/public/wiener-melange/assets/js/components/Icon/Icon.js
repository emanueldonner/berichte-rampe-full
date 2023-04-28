/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as e,s as t,y as i}from"../../lit-element-a22611a3.js";import{l as s}from"../../if-defined-133e139e.js";import{e as r}from"../../directive-19e462f3.js";import{e as a}from"../../unsafe-html-a853c1af.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class o extends a{}o.directiveName="unsafeSVG",o.resultType=2;const n=r(o),c=[e`
* {
  box-sizing: border-box;
}

:host {
  display: inline-flex;
}

.wm-icon-wrapper {
  block-size: fit-content;
  display: flex;
  gap: var(--wm-spacing-xs);
}
`];class h extends t{static properties={iconid:{type:String},width:{type:Number},height:{type:Number},class:{type:String},_accessibleName:{type:String,attribute:!1}};static styles=[c];constructor(){super(),this.width=26,this.height="auto",this.class="",this.iconid="",this._accessibleName=""}firstUpdated(){this._accessibleName=this.shadowRoot.querySelector("slot")?.assignedNodes()[0]?.textContent}_attrDefined(e,t){return s(void 0!==e?t||e:void 0)}_renderSVG(){return i`
      <div class="wm-icon-wrapper">
      <svg
        class="wm-icon ${this.class}" 
        width="${this.width}" 
        height="${"auto"!==this.height?this.height:this.width}" 
        role="${this._attrDefined(this._accessibleName,"img")}" 
        aria-label="${this._attrDefined(this._accessibleName)}"
        aria-hidden="${s(void 0===this._accessibleName?"true":void 0)}"
      >
        <title><slot></slot></title>
          ${n(`<use href="/wiener-melange/assets/icons/sprite.symbol.svg#${this.iconid}"/>`)}
        </svg>
      </div>
    `}render(){return i`
      ${this._renderSVG()}
    `}}customElements.define("wm-icon",h);const d="wm-icon";export{h as Icon,d as tagName};
