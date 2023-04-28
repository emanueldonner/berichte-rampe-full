/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as e,s as t,y as i}from"../../lit-element-a22611a3.js";import{meta as s,properties as l}from"./filter-dropdown.meta.js";const o=[e`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
    }

    .wm-h-vh {
      position: absolute;
      white-space: nowrap;
      width: 1px;
      height: 1px;
      overflow: hidden;
      border: 0;
      padding: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      margin: -1px;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .label {
      font-variation-settings: var(--wm-font-weight-bold);
      margin-bottom: 0.125rem;
    }

    .filter-dropdown {
      position: relative;
      max-width: 25rem;
      z-index: 1220;
    }

    :host([isOpen]) .wm-filter__dropdown {
      padding: 0;
      left: 0;
      top: 0;
      z-index: 1210;
      width: 100%;
    }

    .fake-select {
      appearance: none;
      background: var(--wm-color-nebelgrau-light) url('/wienermelange/assets/icons/chevron-down.svg') no-repeat right 0.625rem center;
      border: 1px solid var(--wm-color-nebelgrau);
      border-radius: 0;
      font-family: inherit;
      font-size: inherit;
      margin: 0;
      min-height: 2.75rem;
      min-width: 8.75rem;
      padding: .4rem 2.5rem .4rem 0.9375rem;
      width: 100%;
      text-align: left;
      position: relative;
      color: #6f6e6d;
      background-position: right 1.5rem center;
    }

    :host([isOpen]) .fake-select {
      z-index: 1210;
    }


    .filter-dropdown::before {
      transition: opacity 0.3s, visibility 0.3s;
      content: "";
      display: block;
      background: rgba(0,0,0, 0.5);
      position: fixed;
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      z-index: 1000;
      visibility: hidden;
      opacity: 0;
    }

    :host([sticky]) .filter-dropdown::before {
      background: rgba(0,0,0, 0.7);
      z-index: 1002;
    }

    :host([isOpen]) .filter-dropdown::before {
      opacity: 1;
      visibility: visible;
    }

    .list {
      transition: opacity 0.3s;
      background: var(--wm-color-weiss);
      position: absolute;
      z-index: 1220;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 0.3125rem 0 0;
      opacity: 0;
      visibility: hidden;
      scrollbar-gutter: stable;
    }


    :host([sticky]) .list {
      position: fixed;
      max-width: 25rem;
      top: 50vh;
      transform: translateY(-50%);
    }

    .list ul {
      grid-column: 2 / -2;
      max-height: 18.75rem;
      overflow-y: auto;
      padding: 0 0.9375rem;
    }

    .list li:not(:last-child) {
      border-bottom: 1px solid #f3f1ef;
      margin-bottom: 0.3125rem;
    }

    .list li {
      display: grid;
      justify-content: stretch;
      grid-template-columns: 1.8125rem 1fr;
    }

    .list li > * {
      grid-column: 1;
      grid-row: 1;
    }

    .close {
      all: unset;
      background-color: var(--wm-color-nebelgrau);
      font-variation-settings: var(--wm-font-weight-bold);
      grid-column: 1 / -1;
      margin-top: 0.3125rem;
      min-height: 2.6rem;
      text-align: center;
      text-transform: uppercase;
      width: 100%;
    }

    :host([isOpen]) .list {
      opacity: 1;
      visibility: visible;
    }

    li:not(:only-child) [expanded="false"] + .sublist {
      display: none;
    }

    li .sublist {
      grid-row: 2;
      grid-column: 1 / -1;
    }

    .sublist > * {
      margin-top: 0.5rem;
    }

    .sublist {
      margin-inline-start: var(--wm-spacing-l);
      padding-block-end: var(--wm-spacing-xs);
    }

    .sublist label {
      font-variation-settings: var(--wm-font-weight-normal);
    }

    label {
      display: flex;
      align-items: center;
    }

    label::before {
      border: 1px solid var(--wm-color-ui-interactive);
      content: "";
      display: inline-block;
      flex-shrink: 0;
      height: 1rem;
      margin-right: 0.625rem;
      position: relative;
      top: 0.0625rem;
      width: 1rem;
    }

    [type="checkbox"]:checked + label::before {
      background-color: var(--wm-color-ui-interactive);
    }

    [type="checkbox"]:indeterminate + label::before {
      background-color: #d6d1ca;
    }

    [type="checkbox"]:checked + label::before {
      background-image: url("/wienermelange/assets/icons/check-light.svg");
      background-position: right 0 center;
      background-size: cover;
    }

    [type="checkbox"]:indeterminate + label::before {
      background-image: url("/wienermelange/assets/icons/check.svg");
    }

    [type="checkbox"]:focus-visible + label::before{
      box-shadow: 0 0 0 2px #fff, 0 0 0 3px var(--wm-color-ui-interactive);
    }

    .buttonDropdownCombo {
      display: flex;
      gap: 0.3125rem;
    }

    .sublisttoggle {
      flex-grow: 1;
      grid-row: 1 !important;
      grid-column: 2 !important;
    }

    button[expanded] {
      all: unset;
      display: block;
      padding: 0 2.5rem 0 0;
      position: relative;
    }

    li:not(:only-child) button[expanded]::after {
      display: block;
      content: "";
      background: rgba(0, 0, 0, 0) url("/wienermelange/assets/icons/chevron-down.svg") no-repeat;
      position: absolute;
      right: 0;
      top: 50%;
      width: 1.5625rem;
      height: 1.5625rem;
      transform: translateY(-50%);
      transition: transform 0.3s;
    }

    button[expanded="true"]::after {
      transform: translateY(-50%) rotate(180deg);
    }

    strong {
      margin-right: 0.5rem;
      font-variation-settings: var(--wm-font-weight-boldmin);
    }

    [hidden] {display: none;}
`];class n extends t{get _fieldsets(){return this.querySelectorAll("fieldset")??null}get _inputs(){return this.querySelectorAll("input")??null}get _expanded(){return this.renderRoot?.querySelectorAll('[expanded="true"]')??null}get _sublistToggles(){return this.renderRoot?.querySelectorAll(".sublisttoggle")??null}static properties=l;static styles=[o];constructor(){super(),this.allOptions={},this.isOpen=!1,this.total=this._inputs.length,this.url="",this.label="Erweiterte Filter",this.searchlabel="Suchen",this.dismisslabel="Schließen",this._getCheckOnInit(),this.totalChecked=this._getChecked(!0,!0),this.totalSelected=this._getChecked(!0,!0),this.__(),this._updateSelection(),this._closeOnEscape()}_openOrCloseSubList(e,t=!0){this._sublistToggles[e].setAttribute("expanded",t)}checkAll(e){const t=e.target.closest("li"),i=t.querySelector(".sublist").querySelectorAll("input"),s=e.target.checked;for(let e=0;e<i.length;e++){const t=i[e];t.checked=s,t.dispatchEvent(new Event("change"))}s||this._openOrCloseSubList(t.dataset.index,!1)}toggleList(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.dispatchEvent(new CustomEvent("filter-open",{detail:this._getChecked(!1,!0,void 0,!1),bubbles:!0,composed:!0}))}close(e=!0){this.isOpen=!1,this._closeDropDownToggles(),e&&this._revertSelection(),this.dispatchEvent(new CustomEvent("filter-close",{detail:this._getChecked(!1,!0,void 0,!1),bubbles:!0,composed:!0}))}toggleSubList(e){const t=e.target.closest("button"),i="false"!==t.getAttribute("expanded");t.setAttribute("expanded",!i)}_closeOrSubmit(e){this.totalChecked>0?this._loadAsync():this.close()}_loadAsync(){this._saveLastState(),this._updateSelection(),console.log(this._getChecked(!1,!0,void 0)),console.log(this.totalSelected);const e={};this._getChecked(!1,!0,void 0).forEach((t=>{e.hasOwnProperty(t.name.replace("[]",""))||(e[t.name.replace("[]","")]=[]),e[t.name.replace("[]","")].push(t.value)})),this.dispatchEvent(new CustomEvent("filter-submit",{detail:{filter:e,url:this.url},bubbles:!0,composed:!0})),this.close(!1)}_saveLastState(){this.lastAllOptions=JSON.parse(JSON.stringify(this.allOptions)),this.totalSelected=this._getChecked(!0,!0)}remove(e,t){if("all"===e)this._removeAll();else{const i=this.querySelector(`[value="${t}"]`).name;this._addOrRemoveOption(e,t,i,!1)}this._loadAsync()}_removeAll(){for(const e in this.allOptions){this.allOptions[e].map((e=>(this._uncheckCheckbox(e.value),e.checked=!1,e)))}this.totalChecked=this._getChecked(!0,!0)}_revertSelection(){for(const e in this.allOptions)this._lastAllOptions[e].forEach((t=>{const i=this.querySelector(`[value="${t.value}"]`).name;this._addOrRemoveOption(e,t.value,i,t.checked)}))}_closeDropDownToggles(){const e=this._expanded;for(let t=0;t<e.length;t++){e[t].setAttribute("expanded",!1)}}_closeOnEscape(){document.addEventListener("keydown",(e=>{this.isOpen&&"Escape"===e.code&&(console.log("close on escape"),this.close())}))}_updateSelection(){this.dispatchEvent(new CustomEvent("filter-selection-changed",{detail:this._getChecked(!1,!0,void 0,!1),bubbles:!0,composed:!0}))}__(){this._lastAllOptions=JSON.parse(JSON.stringify(this.allOptions)),this.totalSelected=this._getChecked(!0,!0)}_getCheckOnInit(){const e=[],t=new URL(document.location).searchParams;this._fieldsets.forEach(((i,s)=>{const l=i.querySelectorAll('[type="checkbox"]'),o=t.getAll(l[0].name);e.push(l[0].name.slice(0,-2)),this.allOptions[s]=[],l.forEach((e=>{const t=-1!==o.indexOf(e.value),l=this.querySelector(`[for="${e.id}"]`).textContent;this.allOptions[s].push({value:e.value,checked:t,label:l,id:s,name:e.name,category:i.querySelector("legend").textContent})}))}))}_clickOutSide(e){e.target.closest(".fake-select")||e.target.closest(".list")||this.close()}_renderDropDownButton(){return i`
      <button type="button" @click=${this.toggleList} class="fake-select wm-form__select">
        ${this.placeholder??this.label} 
        ${this.totalChecked>0?`(${this.totalChecked} von ${this.total})`:""}
      </button>
    `}_renderCloseButton(){return i`
      <button class="close" color="${this.totalChecked>0?"":"nebelgrau"}" block @click=${this._closeOrSubmit}>
        ${this.totalChecked>0?this.searchlabel:this.dismisslabel}
      </button>
    `}_uncheckCheckbox(e,t=!1){document.querySelector(`[value="${e}"]`).checked=t,this.shadowRoot.querySelector(`[value="${e}"]`).checked=t}_getChecked(e,t=!1,i,s=!0){const l=s?this.allOptions:this._lastAllOptions;let o=void 0!==i?l[i]:l;return t&&(o=Object.values(o).flat()),o=o.filter((e=>e.checked)),e?o.length:o}_isChecked(e,t){const i=this.allOptions[e].filter((e=>t.value===e.value&&e.checked)).length;return this._allChecked(t.name,e),i}_check(e,t){const i=e.target.value,s=e.target.checked;this._addOrRemoveOption(t,i,e.target.name,s)}_addOrRemoveOption(e,t,i,s){this._uncheckCheckbox(t,s),this.allOptions[e].map((e=>(e.value===t&&(e.checked=s),e))),this.totalChecked=this._getChecked(!0,!0),this._allChecked(i,e)}_allChecked(e,t,i=!1){const s=i?'[type="checkbox"]':`[name="${e}"]`,l=this.shadowRoot.querySelectorAll(s);if(l.length){const e=Array.from(l).filter((e=>e.checked)),i=this.shadowRoot.querySelector(`#check_${t}`);i.indeterminate=!1,i.checked=!0,0===e.length?i.checked=!1:l.length!==e.length&&(i.indeterminate=!0)}}_renderSublist(e,t){return i`
    <div class="sublist">
      ${e.map((e=>{const s=e.nextElementSibling;return i`
        <div>
          <input @change="${e=>this._check(e,t)}" class="${e.classList}" type="${e.type}" name="${e.name}" id="${e.id}" value="${e.value}" ?checked=${this._isChecked(t,e)}>
          <label class="${s.classList}" for="${e.id}"">${s.textContent}</label>
        </div>
        `}))}
    </div>
    `}_renderSublists(){return i`${Array.from(this._fieldsets).map(((e,t)=>{const s=e.querySelector("legend"),l=[...e.querySelectorAll('[type="checkbox"]')];return i`<li data-index="${t}">
        <input type="checkbox" class="wm-h-vh" id="check_${t}" @change="${e=>this.checkAll(e,s.textContent)}" ?checked=${this.allOptions[t].length} indeterminate="true">
        <label for="check_${t}">
          <span class="wm-h-vh">
            Check all
          </span>
        </label>
        <button @click="${this.toggleSubList}" expanded="false" clean class="sublisttoggle">
          <strong>${s.textContent}</strong>

          ${this._getChecked(!0,!1,t)>0?`(${this._getChecked(!0,!1,t)} von ${l.length})`:""}
        </button>
        ${this._renderSublist(l,t)}
      </li>`}))}`}render(){return i`
    <div class="filter-dropdown" @click=${this._clickOutSide}>
      <span class="label" aria-hidden="true">${this.label}</span>
      ${this._renderDropDownButton()}
      <div class="list list--hidden">
        <ul>
          ${this._renderSublists()}
        </ul>
        ${this._renderCloseButton()}
      </div>
    </div>
    `}}customElements.define(s.tag,n);export{n as FilterDropdown};
