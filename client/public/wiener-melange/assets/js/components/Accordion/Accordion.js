/* @copyright Stadt Wien - Wiener Melange v2 */
import{y as e,i as t,s as o}from"../../lit-element-a22611a3.js";import{getNodeIndex as n}from"../misc/utils.js";import{o as i}from"../../unsafe-html-a853c1af.js";import"../../directive-19e462f3.js";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=Symbol.for(""),a=e=>{if((null==e?void 0:e.r)===s)return null==e?void 0:e._$litStatic$},r=e=>({_$litStatic$:e,r:s}),l=new Map,c=(d=e,(e,...t)=>{const o=t.length;let n,i;const s=[],r=[];let c,p=0,h=!1;for(;p<o;){for(c=e[p];p<o&&void 0!==(i=t[p],n=a(i));)c+=n+e[++p],h=!0;r.push(i),s.push(c),p++}if(p===o&&s.push(e[o]),h){const o=s.join("$$lit$$");void 0===(e=l.get(o))&&(s.raw=s,l.set(o,e=s)),t=r}return d(e,...t)});var d;const p=[t`
* {
  box-sizing: border-box;
}

:host {
  display: block;
}

.heading {
  margin: 0;
}

button {
  all: unset;
  background-color: var(--accordion-background);
  box-sizing: border-box;
  cursor: pointer;
  font-size: 1.1rem;
  font-variation-settings: "wght" 600;
  font-weight: 400;
  padding-block: var(--accordion-padding-block);
  padding-inline: var(--accordion-padding-inline);
  position: relative;
  width: 100%;
}

button::after {
  content: "";
  background: var(--accordion-icon) no-repeat center right;
  background-size: cover;
  display: inline-block;
  height: var(--accordion-icon-size);
  inset-inline-end: var(--accordion-padding-inline);
  inset-block: 0;
  margin: auto;
  position: absolute;
  transition: 0.2s all ease-in-out;
  width: var(--accordion-icon-size);
}

button:where(:hover, :focus-visible)::after {
  transform: rotate(-90deg);
}

[aria-expanded="true"]::after {
  transform: rotate(-180deg);
}

.panel {
  background-color: var(--accordion-background);
  display: none;
  overflow: hidden;
  padding: var(--accordion-padding-inline) ;
}

.open {
  display: block;
}

figcaption {
  --media-figcaption-background: var(--accordion-contrast);
}
`],h=[t`
:host {
  --accordion-background: var(--_accordion-background, transparent);
  --accordion-contrast: var(--_accordion-contrast, #FFF);
  --accordion-padding-inline: var(--_accordion-padding-inline, 0);
  --accordion-padding-block: var(--_accordion-padding-block, 0);
  --accordion-icon: var(--_accordion-icon, none);
  --accordion-icon-size: var(--_accordion-icon-size, 0);
}`],u=[t`
  img,
  picture,
  svg,
  video {
    display: block;
    height: auto;
    max-width: 100%;
  }

  iframe {
    border: 0;
    display: block;
    max-width: 100%;
  }

  iframe[src*="youtube"] {
    aspect-ratio: 560 / 315;
  }

  iframe:not([height]) {
    aspect-ratio: 16 / 9;
  }

  figure {
    display: inline-flex;
    flex-direction: column;
    margin: 0;
    max-inline-size: 100%;
  }

  figcaption {
    background-color: var(--media-figcaption-background);
    padding: var(--media-figcaption-padding);
  }
`];class g extends o{get _panels(){return this.shadowRoot?.querySelectorAll(".panel")??null}get _buttons(){return this.shadowRoot?.querySelectorAll("button")??null}static properties={open:{type:String,reflect:!0},multiple:{type:String,reflect:!0},_previousIndex:{type:Number,attribute:!1},_showMultiple:{type:Boolean,attribute:!1},_items:{type:Array,attribute:!1}};static styles=[u,h,p];constructor(){super(),this.open=!1,this.multiple="false",this._previousIndex=NaN,this._showMultiple=!1,this._items=[],this._tagName="h3"}firstUpdated(){this._registerEvents()}updated(e){e.has("multiple")&&(this._showMultiple="false"!==this.multiple),e.has("open")&&this._openOrCloseItems(),e.has("_items")&&this._openOrCloseItems()}_openOrCloseItems(){const e=this._openByDefaultIndex();if(-1===e||isNaN(e)){const t=isNaN(e)?"close":"open";for(let e=0;e<this._buttons.length;e++)this._openOrClose(e,t)}else this._openOrClose(this._openByDefaultIndex())}_openOrClose(e,t="toggle",o=!1){if(isNaN(e)){if(this.renderRoot?.querySelectorAll(".open").length)for(let e=0;e<this.renderRoot?.querySelectorAll(".open").length;e++){this.collapse(e,!1)}}else if(e<this._panels.length){const n=this._buttons[e],i=this._panels[e],s="false"!==n.getAttribute("aria-expanded");s?"open"!==t&&(n.setAttribute("aria-expanded","false"),i.classList.remove("open")):"close"!==t&&(n.setAttribute("aria-expanded","true"),i.classList.add("open")),this._showMultiple||isNaN(this._previousIndex)||this._previousIndex===e||this.collapse(this._previousIndex,!1),s||(this._previousIndex=e);const a={bubbles:!0,composed:!0,detail:{id:n.getAttribute("aria-controls"),index:e}};o&&(s?this.dispatchEvent(new CustomEvent("collapsed",a)):this.dispatchEvent(new CustomEvent("expanded",a)))}else console.log("Dieser Panel existiert nicht")}_registerEvents(e){this.shadowRoot.addEventListener("click",(e=>{const t=e.target.closest("button");if(t){const e=t.getAttribute("aria-controls"),o=parseInt(e.split("_")[1]);this._openOrClose(o,"toggle",!0)}}))}_openByDefaultIndex(){let e;return e=""===this.open||"true"===this.open?0:isNaN(parseInt(this.open))?NaN:parseInt(this.open),e-1}_getContents(){this._items=[];const e=this.querySelectorAll('[slot="heading"]'),t=this.querySelectorAll('[slot="content"]');for(let o=0;o<e.length;o++){const n=e[o],i=t[o];this._items.push({text:n.textContent,content:i.innerHTML}),0===o&&(this._tagName=n.nodeName)}}_getPanel(e){const t=typeof e;let o;return"number"===t?o=e:"string"===t?o=n(this._panels,this.renderRoot?.querySelector(e)):"object"===t?o=n(this._panels,e):isNaN(e)&&(o=NaN),o}expand(e,t=!0){const o=this._getPanel(e);this._openOrClose(o,"open",t)}collapse(e,t=!0){const o=this._getPanel(e);this._openOrClose(o,"close",t)}_rerender(){this._getContents();this.dispatchEvent(new CustomEvent("contentchanged",{bubbles:!0,composed:!0,detail:{}}))}connectedCallback(){super.connectedCallback()}render(){return c`
    ${this._items.map(((e,t)=>c`<${r(this._tagName)} class="heading">
      <wm-button clean>
        <button aria-expanded="false" aria-controls="panel_${t}">
          ${e.text}
        </button>
      </wm-button>
      </${r(this._tagName)}>

      <div id="panel_${t}" class="panel">
        ${i(e.content)}
      </div>
      `))}
      <slot name="heading" @slotchange="${this._rerender}" hidden></slot>
      <slot name="content" hidden></slot>
    `}}customElements.define("wm-accordion",g);const b="wm-accordion";export{g as Accordion,b as tagName};
