/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s as r,y as e}from"../../lit-element-a22611a3.js";const o=[t`
:host {
  --tag-background: var(--_tag-background, #FFF);
  --tag-background-hover: var(--_tag-background-hover, var(--site-color-secondary));
  --tag-border: var(--_tag-border, var(--site-color-secondary));
  --tag-padding-inline: var(--_tag-padding-inline, 0.8125rem);
  --tag-padding-block: var(--_tag-padding-block, 0.15625rem);
  --tag-padding-inline-large: var(--_tag-padding-inline-large, 0.9375rem);
  --tag-padding-block-large: var(--_tag-padding-block-large, 0.28125rem);
  --tag-gap: var(--_tag-gap, 1rem);
  --tag-min-height: var(--_tag-min-height, 2.1375rem);
  --tag-min-height-large: var(--_tag-min-height-large, 2.5rem);
  --tag-link-color: var(--_tag-link-color, #000);
  --tag-font-size: var(--_tag-font-size, 0.8rem);
}`],a=[t`
* {
  box-sizing: border-box;
}

:host {
  --tag-background-frischgruen: var(--wm-color-frischgruen);
  --tag-border-frischgruen: var(--wm-color-frischgruen);
  --tag-background-interaktiv: var(--wm-color-ui-interactive);
  --tag-border-interaktiv: var(--wm-color-ui-interactive);
  --tag-color-interaktiv: var(--wm-color-weiss);
  --tag-color-interaktiv-hover: var(--wm-color-ui-interactive);
}

:host {
  --link-color: var(--tag-link-color);

  display: inline-block;
  position: relative;
}

:host([color=gruen]) {
  --tag-background: var(--tag-background-frischgruen);
  --tag-border: var(--tag-border-frischgruen);
}

:host([color=interaktiv]){
  --tag-background: var(--tag-background-interaktiv);
  --tag-border: var(--tag-border-interaktiv);
  --link-color: var(--tag-color-interaktiv)
}

:host([color=interaktiv]) :is(a, wm-button):where(:hover, :focus){
  --tag-border:var(--tag-background-interaktiv);
  color: var(--tag-color-interaktiv-hover);
}

:host > a, wm-button {
  --_padding: var(--tag-padding-block) var(--tag-padding-inline);
  align-items: center;
  background-color: var(--tag-background) !important;
  border: 1px solid var(--tag-border);
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  font-size: var(--tag-font-size) !important;
  gap: var(--tag-gap);
  min-height: var(--tag-min-height);
  padding: var(--_padding) !important;
  text-decoration: none;
}

wm-button {
  white-space: nowrap;
}

:host([open="true"]) {
  z-index: 1;
}

:host([open="true"]) wm-button {
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

a:is(:link, :visited) {
  color: var(--link-color);
}

:is(a, wm-button):where(:hover, :focus) {
  --tag-background: var(--tag-background-hover);
}

ul {
  background-color: var(--tag-background);
  border: solid var(--tag-border);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-width: 0 1px 1px;
  display: none;
  left: 0;
  list-style: none;
  margin: 0 !important;
  max-height: 12rem;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 0;
  position: absolute;
  scrollbar-gutter: stable;
  top: 100%;
}

:host([open="true"]) ul {
  display: block;
}

ul a {
  display: block;
  padding: 0.3rem var(--tag-padding-inline);
  white-space: nowrap;
}

ul a:is(:hover, :focus) {
  background-color: var(--tag-background-hover)
}

ul a:is(:link, :visited) {
  text-decoration: none;
}

@media (min-width: 64em) {
  :host {
    --tag-min-height: var(--tag-min-height-large) !important;
    --_padding: var(--tag-padding-block-large) var(--tag-padding-inline-large) !important;
  }
}
`];class i extends r{get _button(){return this.shadowRoot?.querySelector("wm-button")??null}get _list(){return this.shadowRoot?.querySelector("ul")??null}static properties={color:{type:String,reflect:!0}};static styles=[o,a];constructor(){super(),this.color=""}connectedCallback(){super.connectedCallback(),this.shadowRoot.append(...this.childNodes),this._list&&(this._button.addEventListener("click",this.toggle),this.addEventListener("keyup",this._closeOnEscape),document.addEventListener("click",this._clickOutSide),this._largestItem=this._dropdownTagGetLargestItem(),this.style.width=`${this.offsetWidth}px`)}_closeOnEscape(t){"Escape"===t.code&&this.close()}_clickOutSide=t=>{t.target.closest("wm-tag")||this.close()};_dropdownTagGetLargestItem(){this._list.style.display="block";const t=this._list.offsetWidth;return this._list.removeAttribute("style"),t}toggle=t=>{t&&t.preventDefault();"true"!==this.getAttribute("open")?this.open():this.close()};open(){this.setAttribute("open",!0),this._largestItem<this._button.offsetWidth?this._list.style.width=`${this._button.offsetWidth}px`:this._button.style.width=`${this._largestItem}px`}close(){this.setAttribute("open",!1),this._button.removeAttribute("style")}render(){return e`
      <slot></slot>
    `}}customElements.define("wm-tag",i);const n="wm-tag";export{i as Tag,n as tagName};
