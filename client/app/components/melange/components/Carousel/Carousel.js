import { LitElement, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { tokens } from './styles/carousel.tokens'
import { styles } from './styles/carousel.styles'

/**
 * Bilder oder Card-Carousel.
 *
 * @slot default - Cards oder Bilder
 *
 */

/**
* @cssprop --carousel-ratio - Seitenverhältnis der einzelnen Slides
* @cssprop --carousel-item-inner-padding - Innenabstand in einzelnen Slides
* @cssprop --carousel-shadow-offset - Platz um das Karussell für Schatten
* @cssprop --carousel-gap - Abstand zwischen Elementen
* @cssprop --carousel-control-bg - Hintergrundfarbe der Controls
* @cssprop --carousel-control-bg-start - Hintergrundbild des ersten Buttons
* @cssprop --carousel-control-bg-end - Hintergrundbild des zweiten Buttons
*/

export class Carousel extends LitElement {
  /** @private */
  get _items () {
    return this.renderRoot?.querySelector('.inner').querySelector('slot').assignedElements()
  }

  /** @private */
  get _wrapper () {
    return this.renderRoot?.querySelector('.strip') ?? null
  }

  /** @private */
  get _visible () {
    return this.querySelectorAll('.active') ?? null
  }

  /** @private */
  get _current () {
    return this.querySelector('.current') ?? null
  }

  /** @private */
  get _lastSlide () {
    return this.querySelector('.last') ?? null
  }

  /** @private */
  get _firstSlide () {
    return this.querySelector('.frst') ?? null
  }

  /** @private */
  get _output () {
    return document.querySelector('output') ?? null
  }

  static properties = {
    single: { type: String },
    nextLabel: { type: String },
    prevLabel: { type: String },
    _currentSlide: { type: Number, attribute: false },
    _offset: { type: String, attribute: false },
    _first: { type: String, attribute: false },
    _last: { type: String, attribute: false }
  }

  static styles = [tokens, styles]

  constructor () {
    super()

    /**
     * @type {String} - Nur ein Element anzeigen
     * @summary Breite in Pixel
     */
    this.single = false

    /**
     * @type {String} - Label für den Button rechts
     */
    this.nextLabel = 'Nächstes'

    /**
     * @type {String} - Label für den Button links
     */
    this.prevLabel = 'Vorheriges'

    /**
     * @type {String} - Erstes Element aktiv?
     * @private
     */
    this._first = true

    /**
     * @type {String} - Letztes Element aktiv?
     * @private
     */
    this._last = false

    /**
     * @type {NumberConstructor} - Aktueller Slide
     * @private
     */
    this._currentSlide = 1

    /**
     * @type {NumberConstructor} - Versatz
     * @private
     */
    this._offset = 0
  }

  /**
   * @summary Move carousel
   * @private
   * @param {string} elemdirectionent - 'next' or 'prev'
   */
  _move (direction) {
    let item = this._current.nextElementSibling

    if (direction === 'prev') {
      item = this._current.previousElementSibling
    }

    // Get offset for shadows
    const shadowOffset = parseInt(getComputedStyle(this).getPropertyValue('--carousel-shadow-offset'))

    // Get position of next item
    this._offset += item.getBoundingClientRect().left - this.getBoundingClientRect().left
    this._offset = this._offset - shadowOffset

    // Scroll
    this._wrapper.style.transform = `translateX(${(this._offset) * -1}px)`

    // Swap current items
    this._current.classList.remove('current')
    item.classList.add('current')

    if (direction === 'prev') {
      this._currentSlide--
    } else {
      this._currentSlide++
    }

    // console.log(`move ${direction}`)
    // console.log(`Current slide: ${this._currentSlide}`)

    let output = `Element ${this._currentSlide}`

    if (this._items[this._currentSlide - 1].getAttribute('alt')) {
      output = this._items[this._currentSlide - 1].getAttribute('alt')
    }

    this._output.innerHTML = output
  }

  /**
   * @summary Is the current currentSlide the first or the last slide
   * @private
   */
  _firstOrLast () {
    this._last = (this._lastSlide.classList.contains('active'))
    this._first = !(this._currentSlide > 1)
  }

  /**
   * @summary Nächster Slider
   * @private
   */
  _prev = () => {
    if (this._currentSlide === 1) {
      return
    }

    this._move('prev')
    this._changeSlide()
  }

  /**
   * @summary Vorheriger Slider
   * @private
   */
  _next = () => {
    if (this._lastSlide.classList.contains('active')) {
      return
    }

    this._move('next')
    this._changeSlide()
  }

  /**
   * @summary Change the current slide
   * @private
   */
  _changeSlide () {
    /** @type {CustomEvent} Slide wurde gewechselt */
    this.dispatchEvent(new CustomEvent('slideChanged', {
      detail: this._currentSlide,
      bubbles: true
    })
    )

    this._lazyLoadContent(this._currentSlide + 1)
  }

  /**
   * If there's an img or iframe with data-src, load it
   * @summary Load lazy content
   * @private
   */
  _lazyLoadContent (index) {
    const element = this._items[index - 1]
    if (element) {
      if (element.hasAttribute('data-src') || element.querySelector('[data-src]')) {
        const lazyElement = element.querySelector('[data-src]') ?? element
        console.log(lazyElement)

        lazyElement.onload = e => {
          lazyElement.classList.add('loaded')
        }
        lazyElement.setAttribute('src', lazyElement.getAttribute('data-src'))
        lazyElement.removeAttribute('data-src')
      }
    }
  }

  firstUpdated () {
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', e => {
      this._setWidth()
      this._observeItems()
      this._setItemClasses()
      this._lazyLoadContent(2)
      this._addEvents()
    })
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this._removeEvents()
  }

  /**
   * @summary add key events
   * @private
   */
  _keyEvents (e) {
    if (e.code === 'ArrowRight') {
      this._next()
    }
    if (e.code === 'ArrowLeft') {
      this._prev()
    }
  }

  /**
   * @summary remove events
   * @private
   */
  _removeEvents () {
    this.removeEventListener('keyup', this._keyEvents)
  }

  /**
   * @summary add events
   * @private
   */
  _addEvents () {
    this.addEventListener('keyup', this._keyEvents)
  }

  /**
   * @summary set current, last, and first classes
   * @private
   */
  _setItemClasses () {
    console.log(this._items)
    this._items[0].classList.add('current', 'first')
    this._items[this._items.length - 1].classList.add('last')
  }

  /**
   * @summary observe item visibility
   * @private
   */
  _observeItems () {
    for (let i = 0; i < this._items.length; i++) {
      const item = this._items[i]

      const observer = new IntersectionObserver(this._handleIntersection.bind(this), {
        root: this,
        threshold: 1
      })
      observer.observe(item)
    }
  }

  /**
   * @summary set the width of each item for single carousels
   * @private
   */
  _setWidth () {
    if (this.single) {
      this.style.width = `${this.single}px`
    }

    this.setAttribute('tabindex', 0)
  }

  /**
   * @summary Make slides active/inactive
   * @private
   */
  _handleIntersection (entries) {
    // The callback will return an array of entries, even if you are only observing a single item
    entries.map((entry) => {
      const target = entry.target

      if (entry.isIntersecting) {
        target.classList.add('active')
        target.removeAttribute('inert')
      } else {
        target.setAttribute('inert', '')
        target.classList.remove('active')
      }

      this._firstOrLast()
      return entry
    })
  }

  render () {
    const nextButtonClass = { 'control--inactive': this._last }
    const prevButtonClass = { 'control--inactive': this._first }

    return html`
      <div>
        <button class="control control--prev ${classMap(prevButtonClass)}" aria-label="${this.prevLabel}" @click="${this._prev}"></button>
        <button class="control control--next ${classMap(nextButtonClass)}" aria-label="${this.nextLabel}" @click="${this._next}"></button>
      </div>
      <div class="inner">
        <div class="strip">
          <slot></slot>
        </div>
      </div>
      
    `
  }
}

customElements.define('wm-carousel', Carousel)

export const tagName = 'wm-carousel'
