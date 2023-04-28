/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s as i,y as e}from"../../lit-element-a22611a3.js";import{slug as o,getNodeIndex as r}from"../misc/utils.js";const s=[t`
  * {
    box-sizing: border-box;
  }

  :host {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--anchor-gap);
    margin-block-end: 1em;
  }

  ::slotted(*) {
    margin-bottom: 0 !important;
  }

  wm-icon {
    display: block;
  }

  a {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  a:is(:link, :visited) {
    color: var(--site-color)
  }

  :host(:is(:hover, :focus-within)) a {
    opacity: 1;
  }

  :focus-visible {
    outline: var(--site-focus-outline);
  }
`],n=[t`
:host {
  --anchor-gap: var(--_anchor-gap, 1rem);
}`];class a extends i{get _heading(){return this.querySelectorAll("h2, h3, h4, h5, h6")[0]??null}get _anchors(){return document.querySelectorAll("wm-anchor")??null}static properties={_id:{type:String,attribute:!1},copyText:{type:String},id:{type:String},icon:{type:String}};static styles=[n,s];constructor(){super(),this.copyText="Link kopieren",this.icon="share",this.id=""}connectedCallback(){super.connectedCallback(),this._id=this._generateID(),this._heading.setAttribute("id",this._id)}_generateID(){let t=this._heading.getAttribute("id");return t||(t=o(this._heading.textContent),document.querySelector(`#${t}`)&&(t+=`${r(this._anchors,this)}`)),t}updated(t){t.has("id")&&this.id&&(this._id=this.id)}render(){return e`
      <slot></slot>

      <a href="#${this._id}">
        <wm-icon iconid="${this.icon}">${this.copyText}</wm-icon>
      </a>
    `}}customElements.define("wm-anchor",a);const c="wm-anchor";export{a as Anchor,c as tagName};
