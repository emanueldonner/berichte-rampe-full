/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s,y as e}from"../../lit-element-a22611a3.js";const a=[t`
* {
  box-sizing: border-box;
}

:host {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--wm-spacing-xs);
}

span {
  align-items: center;
  display: inline-flex;
  gap: 0.6rem;
}

.status {
  --_color: #d6d1ca;
  background: var(--_color);
  block-size: 1.6rem;
  border-radius: 50%;
  display: inline-block;
  inline-size: 1.6rem;
}

.status-0 {
  --_color: #292929;
}

.status-1 {
  --_color: #82d282;
}

.status-2 {
  --_color: #e6c828;
}

.status-3 {
  --_color: #e6b728;
}
.status-4 {
  --_color: #e68a28;
}

.status-5 {
  --_color: #cc0000;
}

strong {
  font-weight: var(--content-font-weight);
  font-variation-settings: var(--content-font-variation-settings);
}
`],n="wm-statusanzeige";class i extends s{static properties={label:{type:String,reflect:!0},loading:{type:String,reflect:!0},status:{type:String,reflect:!0},statusText:{type:String,reflect:!0}};static styles=[a];constructor(){super(),this.label="Auslastung:",this.loading="Lade Auslastung…",this.status=6,this.statusText=""}render(){return e`
      <strong>${this.label}</strong>
      <span>
        <span class="status status-${this.status}"></span>${this.statusText?e`${this.statusText}`:e`${this.loading}`}
      </span>
      <slot></slot>
    `}}customElements.define("wm-statusanzeige",i);export{i as Statusanzeige,n as tagName};
