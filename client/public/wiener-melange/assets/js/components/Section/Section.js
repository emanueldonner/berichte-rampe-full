/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s as e,y as i}from"../../lit-element-a22611a3.js";import{randomHash as n}from"../misc/utils.js";import{n as o}from"../../when-c8427aa9.js";const a=[t`
:host {
  --section-background: var(--_section-background, transparent);
  --section-border-color: var(--_section-border-color, var(--site-color-secondary));
  --section-border-width: var(--_section-border-width, 12px 0);
  --section-padding: var(--_section-padding, 0);
  --section-padding-highlight: var(--_section-padding-highlight, 1rem);
  --section-padding-highlight-large: var(--_section-padding-highlight-large, 2rem);
  --section-background-highlight: var(--_section-background-highlight, transparent);
  --section-nav-shadow: var(--_section-nav-shadow, none);
  --section-nav-link-padding: var(--_section-nav-link-padding, 0.8rem var(--site-wrapper-padding));
  --section-nav-link-highlight: var(--_section-nav-link-highlight, gray);
  --section-nav-link-highlight-large: var(--_section-nav-link-highlight-large, gray);
  --section-nav-background: var(--_section-nav-background, gray);
  --section-nav-background-large: var(--_section-nav-background-large, #fff);
}`],r=[t`
  * {
    box-sizing: border-box;
  }

  :host {
    --background: var(--section-background);
    --padding: var(--section-padding);

    background: var(--background);
    /* solid color image that fills the entire element and extends by 0px above an below and by 50vw to its sides */
    /* https://codepen.io/SelenIT/pen/bGLmGVq?editors=1100 */
    container-type: inline-size;
    display: block;
    padding-block: var(--padding);
    width: 100%;
  }

  /*
   * Sections with background color
   */
 :host([highlight]) {
   --background: var(--section-background-highlight);
   --padding: var(--section-padding-highlight);
   --accent-color: initial;

   border-image: conic-gradient( var(--background) 0 0) fill 1//0 50vw;
   border-width: var(--section-border-width);
   border-color: var(--section-border-color);
   border-style: solid;
   accent-color: var(--accent-color);
  }

  @media(min-width: 64em) {
    :host([highlight]) {
      --padding:  var(--section-padding-highlight-large);
    }
  }

  :host([highlight="morgenrot"]) {
    --background: var(--wm-color-morgenrot-light);
    --accent-color: var(--wm-color-morgenrot);
  }

  :host([highlight="abendstimmung"]) {
    --background: var(--wm-color-abendstimmung-light);
    --accent-color: var(--wm-color-abendstimmung);
  }
  
  :host([highlight="goldgelb"]) {
    --background: var(--wm-color-goldgelb-light);
    --accent-color: var(--wm-color-goldgelb);
  }
  
  :host([highlight="flieder"]) {
    --background: var(--wm-color-flieder-light);
    --accent-color: var(--wm-color-flieder);
  }

  :host([contentsize="text"]) .section-content {
    max-inline-size: var(--content-text-max-width);
  }

  /* 
   * Full-width sections 
   */
  :host([type="full"]) {
    display: grid;
    grid-template-columns: 5rem 1fr 5rem;
    margin-inline: calc(var(--site-wrapper-padding) * -1);
    width: calc(100% + (var(--site-wrapper-padding) * 2));
  }

  ::slotted(*) {
    grid-column: 2;
  }

  ::slotted(:last-child) {
    grid-column: 1 / -1;
  }
  
  :host([nav]) {
    align-items: start;
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  nav {
    --_nav-pos: fixed;
    --_nav-width: 100vw;
    --_nav-inset: calc(var(--header-height) + var(--header-nav-height)) 0 0;
    --_nav-height: calc(100vh - calc(var(--header-height) + var(--header-nav-height)));
    --_nav-background: var(--section-nav-background);
    --_nav-link: var(--section-nav-link-highlight);
    box-shadow: var(--section-nav-shadow);
    max-width: var(--_nav-width);
    width: 100%;
    position: var(--_nav-pos);
    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
    z-index: 1220;

    background: var(--_nav-background);
    height: var(--_nav-height);
    inset: var(--_nav-inset);
  }

  :host([nav="toggle"]) .nav-hidden {
    opacity: 0;
    visibility: hidden;
  }

  :host([nav="scroll"]) {
    container-type: normal;
    --header-nav-sec-height: 3.4rem;
  }

  :host([nav="scroll"]) nav {
    --_nav-inset: calc(var(--header-height) + var(--header-nav-height)) 0 0;
    --_nav-height: var(--header-nav-sec-height);
  }

  :host([nav="scroll"]) ul {
    display: flex;
    margin: 0;
    overflow: auto;
  }

  :host([nav="scroll"]) li {
    flex-shrink: 0;
  }

  @media(min-width: 64em) {
    nav,
    :host([nav]) nav {
      --header-nav-sec-height: auto;
      --_nav-pos: sticky;
      --_nav-height: auto;
      --_nav-width: 20.5rem;
      --_nav-inset: calc(var(--header-height) + var(--header-nav-height) + 2rem) 0 auto auto;
      --_nav-background: var(--section-nav-background-large);
      --_nav-link: var(--section-nav-link-highlight-large);

    }

    :host([nav="toggle"]) .nav-hidden {
      opacity: 1;
      visibility: visible;
    }

    :host([nav="scroll"]) ul {
      display: block;
      margin: 1.4rem 0;
    }
  }

  nav ul {
    list-style: none;
    margin: 1.4rem 0;
    padding: 0;
  }

  nav a {
    color: inherit;
    display: block;
    padding:  var(--section-nav-link-padding);
    text-decoration: none;
    transition: background-color 100ms;
  }

  nav a[aria-current],
  nav a:hover {
    background-color: var(--_nav-link)
  }

  .section-content {
    grid-column: 1 / -1;
  }
`];class s extends e{static properties={highlight:{type:String,reflect:!0},type:{type:String,reflect:!0},nav:{type:String,reflect:!0},contentsize:{type:String,reflect:!0},_links:{type:Array,attribute:!1}};static styles=[a,r];get _headings(){return this.querySelectorAll(':is(h2[id], h3[id], [data-heading]):not([data-heading="false"])')??null}get _nav(){return this.shadowRoot.querySelector("nav")??null}get _toggleButton(){return document.querySelector(".wm-section-toggle button")??null}constructor(){super(),this.highlight=void 0,this.type=void 0,this.nav=void 0,this.contentSize="full",this._links=[],this._options={offset:0}}updated(t){t.has("nav")&&this._addControls()}connectedCallback(){super.connectedCallback(),this._getItems(),this._addGlobalEvents()}_getOffsetFromTopEdge(){this._options.offset=16*(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height"))+parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-nav-height"))+parseFloat(getComputedStyle(this).getPropertyValue("--header-nav-sec-height"))+2)}_addControls(){if("toggle"===this.nav){const t=document.querySelector("wm-header"),e=this.shadowRoot.querySelector("#toggle-button").content.cloneNode(!0).children[0],i=e.querySelector("button");e.addEventListener("click",(t=>{this._nav.classList.toggle("nav-hidden"),document.documentElement.classList.toggle("wm-is-locked");const e="true"===i.getAttribute("aria-expanded");i.setAttribute("aria-expanded",!e),e||setTimeout((()=>{this.shadowRoot.querySelectorAll("a")[0].focus()}),100)})),console.log("here"),t.addAction(e)}}_addGlobalEvents(){let t;this._getOffsetFromTopEdge(),window.addEventListener("scroll",(e=>{if(this._getSectionInView()){this.shadowRoot.querySelectorAll("[aria-current]").forEach((t=>t.removeAttribute("aria-current")));this.shadowRoot.querySelector(`[href="#${this._getSectionInView().getAttribute("id")}"]`).setAttribute("aria-current",!0),window.clearTimeout(t),t=setTimeout((()=>{"scroll"===this.nav&&this._nav.querySelector("ul").scrollTo({top:0,left:this.shadowRoot.querySelector("[aria-current]").offsetLeft,behavior:"smooth"})}),150)}}));window.matchMedia("(min-width: 64em)").addListener((t=>{t.matches&&(this._removeLock(),this._nav&&this._nav.classList.remove("nav-hidden"))})),this.addEventListener("keyup",(t=>{"Escape"===t.code&&(this._closeNav(),this._toggleButton.focus())}))}_getSectionInView(){for(let t=0;t<this._headings.length;t++){const e=this._headings[t].offsetTop,i=this._headings[t+1]?this._headings[t+1].offsetTop:this.getBoundingClientRect().height,n=(document.documentElement.scrollTop||document.body.scrollTop)-(this.getBoundingClientRect().top+window.pageYOffset)+(this._options.offset+1);if(n>e&&n<=i)return this._headings[t]}}_getItems(){this._headings.forEach((t=>{let e=t.getAttribute("id"),i=t.textContent;e||(e=n(),t.setAttribute("id",e)),t.dataset.heading&&(i=t.dataset.heading),this._links.push({label:i,id:e})}))}_removeLock(){document.documentElement.classList.remove("wm-is-locked")}_closeNav(){this._removeLock(),this._nav.classList.add("nav-hidden"),"toggle"===this.nav&&this._toggleButton.setAttribute("aria-expanded",!1)}render(){return i`
      <div class="section-content">
        <slot></slot>
      </div>
      ${o(void 0!==this.nav,(()=>i`<nav class="nav-hidden" part="nav">
        <ul>
          ${this._links.map((t=>i`
              <li>
                <a href="#${t.id}" @click="${this._closeNav}">
                  ${t.label}
                </a>
              </li>
            `))}
        </ul>
      </nav>`),(()=>i``))}
      <template id="toggle-button">
        <wm-button kind="clean" class="wm-section-toggle">
          <button aria-expanded="false">
            Thema wählen
            <wm-icon iconid="chevron-down"></wm-icon>
          </button>
        </wm-button>
      </template>
    `}}customElements.define("wm-section",s);const l="wm-section";export{s as Section,l as tagName};
