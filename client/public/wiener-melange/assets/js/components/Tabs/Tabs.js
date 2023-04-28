/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as e,s as t,y as s}from"../../lit-element-a22611a3.js";import{getNodeIndex as a}from"../misc/utils.js";import{t as i}from"../../tabs.tokens-1bf80ef0.js";const r=[e`
:host {
  display: block;

  border: var(--tabs-border);
  padding: var(--tabs-padding);
}

[role="tablist"] {
  display: flex;
  gap: var(--tabs-gap);
  justify-content: var(--tabs-alignment);
  margin-bottom: var(--tabs-spacing);
}

::slotted([aria-hidden="true"]) {
  display: none;
}

::slotted([aria-hidden="false"]) {
  display: block;
}
`];class l extends t{get _tabcontainers(){return document.querySelectorAll("wm-tabs")??null}get _tabs(){return this.querySelectorAll(":scope > wm-tab")??null}get _tabpanels(){return this.querySelectorAll(":scope > wm-tabpanel")??null}static properties={selectedIndex:{type:Number,attribute:!1},lastIndex:{type:Number,attribute:!1},id:{type:String,attribute:!1}};static styles=[i,r];constructor(){super(),this.id="",this.lastIndex=0,this.selectedIndex=0,this._setParams()}_setParams(){const e=document.location.pathname.split("/");this.searchParams=new URLSearchParams(location.search),this.id=`t_${a(this._tabcontainers,this)}_${e[e.length-2]}`;const t=new URL(document.location).searchParams.get("view")??this.searchParams.get(this.id)??sessionStorage.getItem(`active_tab_${this.id}`);this.lastIndex=t??0,this.selectedIndex=t??0;const s=Array.from(this._tabs).filter((e=>e.hasAttribute("selected"))),i=s.length?s[0]:this._tabs[this.lastIndex];this._selectTab(i),this._selectPanel()}_selectPanel(){this.querySelector(":scope > wm-tabpanel[selected]")&&this.querySelector(":scope > wm-tabpanel[selected]").removeAttribute("selected"),this._tabpanels[this.selectedIndex].setAttribute("selected",!0)}_selectTab(e){this.querySelector(":scope > wm-tab[selected]")&&this.querySelector(":scope > wm-tab[selected]").removeAttribute("selected"),Number.isInteger(e)&&(e=this._tabs[e]?this._tabs[e]:this._tabs[this._tabs.length-1]),e.setAttribute("selected",!0),e.focus(),this.selectedIndex=a(this._tabs,e),this.dispatchEvent(new CustomEvent("tabChanged",{detail:this.selectedIndex,bubbles:!0})),this.searchParams=new URLSearchParams(location.search),this.selectedIndex>0?this.searchParams.set(this.id,this.selectedIndex):this.searchParams.delete(this.id),window.history.replaceState({},"",location.pathname+"?"+this.searchParams+location.hash)}_switchTab(e){const t=e&&e.type?e.target:e;t.closest("wm-tab")&&(this._selectTab(t),this._selectPanel())}_getNextElement(e){return e<0&&(e=this._tabs.length-1),e>=this._tabs.length&&(e=0),this._tabs[e]}_handleKeydown(e){let t;"ArrowLeft"!==e.code&&"ArrowRight"!==e.code||("ArrowLeft"===e.code&&(t=this.selectedIndex-1),"ArrowRight"===e.code&&(t=this.selectedIndex+1),this._switchTab(this._getNextElement(t)))}_handleClick(e){const t=e&&e.type?e.target:e;t.closest("wm-tab")&&(this._selectTab(t),this._selectPanel(),this.reRenderChildren(),sessionStorage.setItem(`active_tab_${this.id}`,this.selectedIndex))}async reRenderChildren(){await this._tabpanels[this.selectedIndex].updateComplete,this.querySelector("[update]")&&this.querySelector("[update]").reRender()}render(){return s`
      <div>
        <div role="tablist" @click="${this._handleClick}" @keydown="${this._handleKeydown}">
          <slot name="tab"></slot>
        </div>
        <slot></slot>
      </div>
    `}}customElements.define("wm-tabs",l);const n="wm-tabs";export{l as Tabs,n as tagName};
