/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s as e,y as s}from"../../lit-element-a22611a3.js";import{o as i}from"../../class-map-50dbd9fb.js";import{WmImageZoom as o,preventPinchZoom as r}from"../misc/image-zoom.js";import{isDoubleTap as n}from"../misc/utils.js";import"../../directive-19e462f3.js";const a=[t`
:host {
  --carousel-ratio: var(--_carousel-ratio, 16 / 9);
  --carousel-item-inner-padding: var(--_carousel-item-inner-padding, 0);
  --carousel-shadow-offset: var(--_carousel-shadow-offset, 0);
  --carousel-gap: var(--_carousel-gap, 1rem);
  --carousel-control-bg: var(--_carousel-control-bg, #fff);
  --carousel-control-bg-start: var(--_carousel-control-bg-start, none);
  --carousel-control-bg-end: var(--_carousel-control-bg-end, none);
}`],l=[t`
* {
  box-sizing: border-box;
}

:host(:not(.focusmode)) {
  max-inline-size: calc(100% + (var(--carousel-shadow-offset) * 2));
  margin-inline: calc(var(--carousel-shadow-offset) * -1);
  max-height: inherit;
  position: relative;
}

:host {
  display: block;
  pointer-events: all; /* Needed for carousels within modals */
}

:host(:not(.focusmode)) .inner {
  max-height: inherit;
  min-height: 100px;
  overflow: hidden;
  padding: 0 var(--carousel-shadow-offset) var(--carousel-shadow-offset);
  position: relative;
}

:host(:not(.focusmode)) .strip {
  display: flex;
  gap: var(--carousel-gap);
  max-height: inherit;
  min-width: 100%;
}

:host(:not(.notransition)) .strip {
  transition: 0.2s ease-in-out;

}

:host(.focusmode) .strip {
  transform: none !important;
}

:host([single]) .strip {
  align-items: center;
}

.strip > ::slotted(*) {
  flex-shrink: 0;
}

.control {
  --_size: 2.75rem;
  --_display: none; 

  position: absolute;
  background: var(--carousel-control-bg) no-repeat center;
  border: 0;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0,0,0,.16);
  display: var(--_display);
  height: var(--_size);
  inset-block-start: 50%;
  opacity: 1;
  padding: 0;
  transform-origin: center center;
  transition: scale 0.3s, opacity 0.3s;
  width: var(--_size);
  z-index: 1;
}

@media (min-width: 48em) {
  .control {
    --_size: 3.75rem;
    --_display: inline-flex; 
  }
}

.control--prev {
  background-image: var(--carousel-control-bg-start);
  inset-inline-start: 0;
  translate: -50% -50%;
}

.control--next {
  background-image: var(--carousel-control-bg-end);
  inset-inline-end: 0;
  translate: 50% -50%;
}

:host(.focusmode) .control,
.control--inactive {
  opacity: 0;
  visibility: hidden;
}

.control:is(:hover, :focus) {
  scale: 1.1;
}

img {
  max-height: inherit;
}

wm-modal img[src],
.loaded {
  min-height: 0;
  max-height: 100%;
}

::slotted(img) {
  width: initial;
}
`];class c extends e{get _items(){return this.renderRoot?.querySelector(".inner").querySelector("slot").assignedElements()}get _wrapper(){return this.renderRoot?.querySelector(".strip")??null}get _visible(){return this.querySelectorAll(".active")??null}get _current(){return this.querySelector(".current")??null}get _lastSlide(){return this.querySelector(".last")??null}get _firstSlide(){return this.querySelector(".frst")??null}get _output(){return document.querySelector('[role="status"]')??null}static properties={nextLabel:{type:String},prevLabel:{type:String},single:{type:String,reflect:!0},_currentSlide:{type:Number,attribute:!1},_offset:{type:String,attribute:!1},_first:{type:String,attribute:!1},_last:{type:String,attribute:!1},_focusMode:{type:Boolean,attribute:!1},_canMove:{type:Boolean,attribute:!1},_imageZoom:{type:Object,attribute:!1},_touchstartX:{type:Number},_touchstartY:{type:Number},_touches:{type:Number},_swipeTreshold:{type:Number}};static styles=[a,l];constructor(){super(),this.single=void 0,this.nextLabel="Nächstes",this.prevLabel="Vorheriges",this._first=!0,this._last=!1,this._currentSlide=1,this._offset=0,this._focusMode=!1,this._canMove=!0,this._imageZoom={},this._swipeTreshold=80}_move(t){if(this._canMove){this._canMove=!1;let e=this._current.nextElementSibling;"prev"===t&&(e=this._current.previousElementSibling),Number.isInteger(t)&&(e=this._items[t]);const s=parseInt(getComputedStyle(this).getPropertyValue("--carousel-shadow-offset"));this._offset+=e.getBoundingClientRect().left-this.getBoundingClientRect().left,this._offset=this._offset-s,this._wrapper.style.transform=`translateX(${-1*this._offset}px)`,this._current.classList.remove("current"),e.classList.add("current","active"),e.removeAttribute("inert"),"prev"===t?this._currentSlide--:"next"===t?this._currentSlide++:this._currentSlide=t+1;let i=`Element ${this._currentSlide}`;this._items[this._currentSlide-1].getAttribute("alt")&&(i=this._items[this._currentSlide-1].getAttribute("alt")),this._output.innerHTML=i,this._wrapper.addEventListener("transitionend",(t=>{this._canMove=!0}))}}_firstOrLast(){this._last=this._lastSlide.classList.contains("active"),this._first=!(this._currentSlide>1),this._last&&this.renderRoot.querySelector(".control--prev").focus(),!this._last&&this._first&&this.renderRoot.querySelector(".control--next").focus()}_prev=()=>{1!==this._currentSlide&&(this._move("prev"),this._changeSlide())};_next=()=>{this._lastSlide.classList.contains("active")||(this._move("next"),this._changeSlide())};slide(t){this._items[t]&&t!==this._currentSlide-1&&(this._move(t),this._changeSlide(t+1))}_changeSlide(t){this.dispatchEvent(new CustomEvent("slideChanged",{detail:this._currentSlide,bubbles:!0})),this._lazyLoadContent(t||this._currentSlide+1)}_lazyLoadContent(t){const e=this._items[t-1];if(e&&(e.hasAttribute("data-src")||e.querySelector("[data-src]"))){const t=e.querySelector("[data-src]")??e;t.onload=e=>{t.classList.add("loaded")},t.setAttribute("src",t.getAttribute("data-src")),t.removeAttribute("data-src")}}firstUpdated(){this.shadowRoot.querySelector("slot").addEventListener("slotchange",(t=>{this._setWidth(),this._observeItems(),this._setItemClasses(),this._lazyLoadContent(2),this._addEvents()}))}disconnectedCallback(){super.disconnectedCallback(),this._removeEvents(),Object.keys(this._imageZoom).length&&this._imageZoom.resetZoom()}_keyEvents(t){"ArrowRight"===t.code&&this._next(),"ArrowLeft"===t.code&&this._prev()}_removeEvents(){this.removeEventListener("keyup",this._keyEvents)}_handleTouch(t){(2===t.touches.length||n())&&(t.preventDefault(),this._focusMode||(console.info("👉 Start touch in Carousel."),this._initFocusMode(t))),this._touchstartX=t.changedTouches[0].clientX,this._touchstartY=t.changedTouches[0].clientY,this._touches=t.touches.length}_handleTouchEnd(t){setTimeout((()=>{this._imageZoom.ready&&this._imageZoom.endHandler()}),150),this._touchendX=t.changedTouches[0].clientX,this._touchendY=t.changedTouches[0].clientY,this._touches<2&&this._handleSwipe()}_handleSwipe(){this._focusMode||(this._touchendX+this._swipeTreshold<this._touchstartX&&this._next(),this._touchendX-this._swipeTreshold>this._touchstartX&&this._prev())}_leaveFocusMode(t){if(this._focusMode){console.log("👉 Stop focusmode"),this._focusMode=!1,this.classList.remove("focusmode"),this._items.forEach((t=>{t.removeAttribute("hidden"),t.classList.remove("wm-image--zoom"),t.querySelector("img")&&t.querySelector("img").classList.remove("wm-image--zoom")}));const e=t.target;e.style.removeProperty("width"),e.style.removeProperty("aspect-ratio"),this._imageZoom.destroyEvents(),setTimeout((()=>{this.classList.remove("notransition")}),300)}}_initFocusMode(t){const e=t.target;if(!this._focusMode&&(console.log("👉 Start focusmode"),"IMG"===e.nodeName)){this._focusMode=!0,this.classList.add("focusmode"),this.classList.add("notransition");const s=e;this._items.forEach((t=>{t!==this._current&&(t.hidden=!0)}));const i=s.closest(".content-inner");i.addEventListener("reset",this._leaveFocusMode.bind(this)),this._imageZoom=new o({img:s,container:i,zoomedClass:"wm-image--zoomed"}),i.style.width=`${s.width}px`,i.style.aspectRatio=`${s.width} / ${s.height}`,s.classList.add("wm-image--zoom"),setTimeout((()=>{this._imageZoom.startHandler(t,!0)}),150)}}_addEvents(){this.addEventListener("keyup",this._keyEvents),document.querySelector("dialog")&&document.querySelector("dialog").addEventListener("touchstart",r),this.addEventListener("touchstart",this._handleTouch),this.addEventListener("touchend",this._handleTouchEnd)}_setItemClasses(){this._items[0].classList.add("current","first"),this._items[this._items.length-1].classList.add("last")}_observeItems(){const t=new IntersectionObserver(this._handleIntersection.bind(this),{root:this,threshold:1});for(let e=0;e<this._items.length;e++){const s=this._items[e];t.observe(s)}}_setWidth(){this.single&&(this.style.width=`${this.single}px`)}_handleIntersection(t){t.map((t=>{const e=t.target;return e.classList.contains("wm-image--zoom")||(t.isIntersecting?(e.classList.add("active"),e.removeAttribute("inert")):(e.setAttribute("inert",""),e.classList.remove("active"))),this._firstOrLast(),t}))}render(){const t={"control--inactive":this._last},e={"control--inactive":this._first};return s`
      <div>
        <button class="control control--prev ${i(e)}" aria-label="${this.prevLabel}" @click="${this._prev}"></button>
        <button class="control control--next ${i(t)}" aria-label="${this.nextLabel}" @click="${this._next}"></button>
      </div>
      <div class="inner">
        <div class="strip">
          <slot></slot>
        </div>
      </div>
      
    `}}customElements.define("wm-carousel",c);const h="wm-carousel";export{c as Carousel,h as tagName};
