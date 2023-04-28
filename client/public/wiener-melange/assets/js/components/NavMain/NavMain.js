/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as e,s as t,y as i}from"../../lit-element-a22611a3.js";import{n as s}from"../../when-c8427aa9.js";const n=[e`
:host {
  --navmain-wrapperwidth: var(--_navmain-wrapperwidth, 70rem);
  --navmain-gap: var(--_navmain-gap, 1rem);
}`],a=[e`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    /* Nav should fill the header */
    height: 100%;
  }

  nav {
    /* inherit height from header */
    height: inherit;
  }
  
  dialog {
    background-color: transparent;
    border: 0;
    /* height minus the height of the header */
    height: calc(100dvh - var(--header-height-dynamic));
    inset-block-start: var(--header-height-dynamic);
    margin-inline: auto 0;
    max-height: calc(100dvh - var(--header-height-dynamic));
    max-width: 100vw;
    overflow: hidden;
    padding: 0;
    scrollbar-gutter: stable;
    width: 100vw;
  }

  ::backdrop {
    /* Backdrop doesn't inherit anything, that's why we have to apply this ugly hack */
    --_inset-block-start: 3.75rem;
    background: rgb(0 0 0 / 0.5);
    inset-block-start: var(--_inset-block-start);
  }

  @media (min-width: 64rem) {
    ::backdrop {
      --_inset-block-start: 6.25rem
    }
  }

  /* Content within the dialog is wrapped */
  .wrapper {
    height: 100%;
    margin-inline: auto;
    max-width: var(--navmain-wrapperwidth);
    overflow: hidden;
  }

  .wrapper--hidden {
    transform: translateX(100vw);
  }

  /* The transition is applied conditionally to avoid quirky behavior */
  .transition {
    transition: transform 0.25s ease-out;
  }

  /* Content within the dialog */
  .content {
    --_spacing-inline-end: 0;
    background-color: var(--header-nav-wrapper-background);
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-inline: auto var(--_spacing-inline-end);
    max-width: 25rem;
    width: 100%;
  }

  @media (min-width: 34.375rem) {
    .content {
      /* --site-wrapper-width-s + --site-wrapper-padding *2 */
      --_spacing-inline-end: calc(((100vw - var(--site-wrapper-width-s)) / 2) - var(--site-wrapper-padding));
    }
  }

  @media (min-width: 48rem) {
    .content {
      --_spacing-inline-end: calc(var(--site-wrapper-padding) / 2);
    }
  }

  /* Header within the dialog (contains close button and optionally user name) */
  .header {
    --_padding-inline: var(--site-wrapper-padding);
    align-items: center;
    display: flex;
    min-height: var(--header-nav-height);
    padding-inline: var(--_padding-inline);
    text-align: right;
    justify-content: flex-end;
  }

  @media (min-width: 48rem) {
    .header {
      --_padding-inline: calc(var(--site-wrapper-padding) / 2);
    }
  }

  /* Wrapper for links */
  .lists {
    flex-grow: 1;
    height: inherit;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    position: relative;
    height: inherit;
  }

  /* Toggle buttons */
  .lists button {
    all: initial;
    font: inherit;
  }

  /* General styling for links and buttons */
  .lists :is(a, button) {
    align-items: center;
    box-sizing: border-box;
    padding: 0;
    display: flex;
    justify-content: space-between;
    height: inherit;
    width: 100%;
  }

  .lists :is(a, button):is(:link, :visited) {
    color: inherit;
    text-decoration: none;
  }

  .lists :is(a, button):focus-visible {
    outline: 3px solid currentColor;
  }

  /* Show list when button expanded */
  [aria-expanded="true"] + ul {
    display: block;
  }

  /**
   * Variation when links are not hidden “behind a burger”
   */

  /* Nav takes up the whole space */ 
  :host([listsVisible]) {
    width: 100%;
  }

  /* inherit height from header */
  :host([listsVisible]) ul {
    height: inherit;
  }

  :host([listsVisible]) ul ul,
  li li {
    height: auto;
  }


  :host([listsVisible]) [aria-expanded="true"] + ul {
    position: absolute;
    background: var(--header-nav-active-link-background);
    top: 100%;
    left: 0;
    width: max-content;
  }

  :host([listsVisible]) .lists li li :is(a, button) {
    padding-block: 0.5125rem 0.3875rem;
  }

  :host([listsVisible]) .lists li li :is(a, button):hover {
    text-decoration: underline;
  }

  :host([listsVisible]) .lists li li :is(a, button) {
    color: var(--header-nav-active-link-color);
  }


  :host([listsVisible]) .lists li ul {
    padding-block: 0.5rem;
    max-height: calc(100vh - 100%);
  }

  :host([listsVisible]) .lists li ul::before {
    content: "";
    width: 200vw;
    height: 100%;
    background: var(--header-nav-active-link-background);
    display: block;
    position: absolute;
    left: -100vw;
    top: 0;
  } 

  :host(:not([listsVisible])) .lists {
    overflow: auto;
  }

  :host([listsVisible]) wm-icon {
    display: none;
  }

  :host([listsVisible]) ul:not([hidden]) {
    display: flex;
    gap: clamp(1rem, 5%, var(--navmain-gap));
  }

  /**
   * Variation when links are hidden “behind a burger”
   */

  .burger {
    height: 100%;
    display: flex;
    align-items: center;
  }

  :host(:not([listsVisible])) [aria-expanded="true"] {
    background-color: var(--header-nav-active-link-background) !important;
    border-image: conic-gradient( var(--header-nav-active-link-background) 0 0) fill 1//0 50vw !important;
    color: var(--header-nav-active-link-color);
  }

  /* Underline links */
  :is(a, button):is(:hover, :focus-visible) span,
  :host([listsVisible]) [aria-expanded="true"] span {
    box-shadow: 0 4px 0 0 var(--header-nav-active-link-background);
  }

  /* Adapt link and button styling */
  :host(:not([listsVisible])) .lists :is(a, button) {
    text-transform: uppercase;
    padding: 0.8125rem 1.5625rem 0.6875rem;
  }

  :host(:not([listsVisible])) .lists :is(a, button):focus-visible {
    outline-offset: -3px;
  }
`];class o extends t{get _dialog(){return this.renderRoot?.querySelector("dialog")??null}get _content(){return this.renderRoot?.querySelector(".wrapper")??null}get _lists(){return this.renderRoot?.querySelector(".lists")??null}static properties={labelOpen:{type:String},showLabelOpen:{type:String},labelClose:{type:String},type:{type:String,reflect:!0},listsVisible:{type:Boolean,reflect:!0},isopen:{type:Boolean,reflect:!0},_items:{type:Array,attribute:!1},_openItem:{type:Number,attribute:!1},_lastFocusedElement:{type:Node,attribute:!1}};static styles=[n,a];constructor(){super(),this.labelOpen="Menü",this.labelClose="Schließen",this.showLabelOpen="true",this._items=[],this.isopen=!1,this.type="visible",this.listsVisible=!1,this._openItem=void 0,this._lastFocusedElement=void 0,this._nativeCloseEvent=this._nativeClose.bind(this),this._closeOnTransitionEndEvent=this._closeOnTransitionEnd.bind(this),this.addEventListener("mouseleave",(e=>{this.listsVisible&&this._closeSub(this._openItem)}))}connectedCallback(){super.connectedCallback(),this._getLayout(),this._addGlovalEvents()}updated(e){e.has("isopen")&&(this.isopen?this.open():this.close())}_addGlovalEvents(){this.addEventListener("keydown",(e=>{"Escape"===e.code&&(e.preventDefault(),this._openItem&&this._closeSub(this._openItem),this.isopen=!1,this._moveFocus())}))}_moveFocus(){this._lastFocusedElement&&(this._lastFocusedElement.focus(),this._lastFocusedElement=void 0)}_handleClickOutside(e){e.target.classList.contains("wrapper")&&(this.isopen=!1)}_addEvents(){setTimeout((()=>{this._dialog&&(this._dialog.addEventListener("close",this._nativeCloseEvent),this._content.addEventListener("transitionend",this._closeOnTransitionEndEvent))}),0)}_closeOnTransitionEnd(e){e.target.classList.contains("wrapper--hidden")&&(this._dialog.close(),this._content.classList.remove("wrapper--hidden"))}_nativeClose(e){e.target.classList.contains("wrapper--hidden")||this._content.classList.remove("transition")}_getLayout(){"visible"===this.type&&(this.listsVisible=!0);const e=window.matchMedia("(min-width: 64em)"),t=e=>{"hiddenmobile"===this.type&&(this.listsVisible=e.matches),this.listsVisible||(this._addEvents(),"hiddenmobile"===this.type&&(this.isopen=!1))};e.addEventListener("change",t),t(e)}open(){this._content&&(this._content.classList.remove("wrapper--hidden"),this._dialog.showModal(),this._content.classList.add("wrapper--hidden"),setTimeout((()=>{this._content.classList.add("transition"),this._content.classList.remove("wrapper--hidden")}),0))}close(){this._content&&this._content.classList.add("wrapper--hidden")}_getContents(){this._items=[];const e=this.shadowRoot.querySelector("slot").assignedElements(),t=(e,i)=>{const s=i.querySelectorAll(":scope > li");for(let i=0;i<s.length;i++){const n=s[i],a=n.querySelector("a"),o={text:a.textContent,href:a.getAttribute("href"),children:[],collapsed:!0},l=n.querySelector("ul");if(l){const e=[];t(e,l),o.children=e}e.push(o)}};for(let i=0;i<e.length;i++){const s=e[i];t(this._items,s)}}_rerender(){this._getContents()}_openCloseSub(e,t){this._lastFocusedElement=t.target,this._openItem&&this._openItem!==e&&this._closeSub(this._openItem),this._items[e]&&(this._openItem=e,this._items[e].collapsed=!this._items[e].collapsed,this.requestUpdate(),"visible"===this.type&&(this.isopen=!this._items[e].collapsed))}_openSub(e,t){this._openItem&&this._closeSub(this._openItem),this._openItem=e,this._items[e].collapsed=!1,this.requestUpdate()}_closeSub(e,t){this._openItem&&(this._items[e].collapsed=!0,this.requestUpdate(),this._openItem=void 0)}_openCloseNav(){this.isopen=!this.isopen}_burgerTemplate(){return i`
      <wm-button kind="clean" @click="${this._openCloseNav}" class="burger">
        <button>
          ${"false"===this.showLabelOpen?i`<span class="wm-h-vh">${this.labelOpen}</span>`:`${this.labelOpen}`}
          <wm-icon iconid="burger"></wm-icon>
        </button>
      </wm-button>
    `}_handleKeyDown(e){if("Tab"===e.key){const t=e.target.parentNode.parentNode;(!e.shiftKey&&e.target===t.lastElementChild.querySelector("a")||e.shiftKey&&e.target===t.firstElementChild.querySelector("a"))&&this._closeSub(this._openItem)}}_handleButtonMouseOver(e,t){this.listsVisible&&this._openSub(e,t)}_handleLinkMouseOver(e){this.listsVisible&&this._closeSub(this._openItem,e)}_listsTemplate(){return i`
      <div class="lists">
        <ul>
          ${this._items.map(((e,t)=>i`
            <li>
              ${s(!e.children.length,(()=>i`
                <a href="${e.href}" @mouseover="${this._handleLinkMouseOver.bind(this)}">
                  <span>
                  ${e.text}
                  </span>
                </a>
              `),(()=>i`
                <button aria-expanded="${!e.collapsed}" @click="${this._openCloseSub.bind(this,t)}" @mouseover="${this._handleButtonMouseOver.bind(this,t)}">
                  <span>${e.text}</span>
                  <wm-icon iconid="chevron-down"></wm-icon>
                </button>
            
                <ul hidden>
                  ${e.children.map(((e,t)=>i`
                      <li>
                        <a href="${e.href}" @keydown="${this._handleKeyDown}">
                          <span>
                            ${e.text}
                          </span>
                        </a>
                      </li>`))}
                </ul>
              `))} 
            </li>
          `))}
        </ul>
        <slot hidden @slotchange="${this._rerender}"></slot>
      </div>
    `}render(){return i`
      <nav>
        ${this.listsVisible?"":this._burgerTemplate()}

        ${this.listsVisible?i`${this._listsTemplate()}`:i`
          <dialog @click="${this._handleClickOutside}">
            <div class="wrapper">
              <div class="content">
                <div class="header">
                  <wm-button kind="clean" @click="${this._openCloseNav}">
                    <button>
                      <span class="wm-h-vh">${this.labelClose}</span>
                      <wm-icon iconid="close"></wm-icon>
                    </button>
                  </wm-button>
                </div>
                ${this._listsTemplate()}
              </div>
            </div>
          </dialog>
        `}
      </nav>
    `}}customElements.define("wm-nav-main",o);export{o as NavMain};
