import { LitElement, html } from 'lit'
import { meta, properties } from './filter-dropdown.meta.js'
import { styles } from './styles/filter-dropdown.styles'
export class FilterDropdown extends LitElement {
  get _fieldsets () {
    return this.querySelectorAll('fieldset') ?? null
  }

  get _inputs () {
    return this.querySelectorAll('input') ?? null
  }

  get _expanded () {
    return this.renderRoot?.querySelectorAll('[expanded="true"]') ?? null
  }

  get _sublistToggles () {
    return this.renderRoot?.querySelectorAll('.sublisttoggle') ?? null
  }

  static properties = properties
  static styles = [styles]

  constructor () {
    super()

    this.allOptions = {}
    this.isOpen = false
    this.total = this._inputs.length
    this.url = ''
    this.label = 'Erweiterte Filter'
    this.searchlabel = 'Suchen'
    this.dismisslabel = 'Schließen'

    this._getCheckOnInit()
    this.totalChecked = this._getChecked(true, true)
    this.totalSelected = this._getChecked(true, true)
    this.__()
    this._updateSelection()
    this._closeOnEscape()
  }

  _openOrCloseSubList (idx, open = true) {
    this._sublistToggles[idx].setAttribute('expanded', open)
  }

  checkAll (e) {
    // console.log('check all')
    const parent = e.target.closest('li')
    const list = parent.querySelector('.sublist')
    const checkboxes = list.querySelectorAll('input')
    const checked = e.target.checked

    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i]
      checkbox.checked = checked
      checkbox.dispatchEvent(new Event('change'))
    }

    if (!checked) {
      this._openOrCloseSubList(parent.dataset.index, false)
    }
  }

  toggleList () {
    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  open () {
    // console.log('open')
    this.isOpen = true
    // lock.lock(this)

    this.dispatchEvent(new CustomEvent('filter-open', {
      detail: this._getChecked(false, true, undefined, false),
      bubbles: true,
      composed: true
    }))
  }

  close (revert = true) {
    // console.log('close')
    this.isOpen = false
    this._closeDropDownToggles()

    // Don't save options? Revert to previous state
    if (revert) {
      this._revertSelection()
    }

    // lock.unlock()
    this.dispatchEvent(new CustomEvent('filter-close', {
      detail: this._getChecked(false, true, undefined, false),
      bubbles: true,
      composed: true
    }))
  }

  toggleSubList (e) {
    const button = e.target.closest('button')
    const open = button.getAttribute('expanded') !== 'false'
    button.setAttribute('expanded', !open)
  }

  _closeOrSubmit (e) {
    if (this.totalChecked > 0) {
      this._loadAsync()
    } else {
      this.close()
    }
  }

  _loadAsync () {
    this._saveLastState() // ????
    this._updateSelection() // ????

    console.log(this._getChecked(false, true, undefined))
    console.log(this.totalSelected)

    const filters = {}
    const selected = this._getChecked(false, true, undefined)
    selected.forEach(result => {
      if (!filters.hasOwnProperty(result.name.replace('[]', ''))) { // eslint-disable-line
        filters[result.name.replace('[]', '')] = []
      }
      filters[result.name.replace('[]', '')].push(result.value)
    })

    this.dispatchEvent(new CustomEvent('filter-submit', {
      detail: {
        filter: filters,
        url: this.url
      },
      bubbles: true,
      composed: true
    }))
    this.close(false)
  }

  _saveLastState () {
    this.lastAllOptions = JSON.parse(JSON.stringify(this.allOptions))
    this.totalSelected = this._getChecked(true, true)
  }

  remove (idx, value) {
    if (idx === 'all') {
      this._removeAll()
    } else {
      const section = this.querySelector(`[value="${value}"]`).name
      this._addOrRemoveOption(idx, value, section, false)
    }
    this._loadAsync()
  }

  _removeAll () {
    for (const key in this.allOptions) {
      const section = this.allOptions[key]
      section.map(option => {
        this._uncheckCheckbox(option.value)
        option.checked = false
        return option
      })
    }
    this.totalChecked = this._getChecked(true, true)
  }

  _revertSelection () {
    // console.log('revert')
    for (const idx in this.allOptions) {
      this._lastAllOptions[idx].forEach(option => {
        const section = this.querySelector(`[value="${option.value}"]`).name
        this._addOrRemoveOption(idx, option.value, section, option.checked)
      })
    }
  }

  _closeDropDownToggles () {
    // Close all open toggles
    const openToggles = this._expanded

    for (let i = 0; i < openToggles.length; i++) {
      const toggle = openToggles[i]
      toggle.setAttribute('expanded', false)
    }
  }

  _closeOnEscape () {
    document.addEventListener('keydown', e => {
      if (this.isOpen && e.code === 'Escape') {
        console.log('close on escape')
        this.close()
      }
    })
  }

  _updateSelection () {
    this.dispatchEvent(new CustomEvent('filter-selection-changed', {
      detail: this._getChecked(false, true, undefined, false),
      bubbles: true,
      composed: true
    }))
  }

  __ () {
    this._lastAllOptions = JSON.parse(JSON.stringify(this.allOptions))
    this.totalSelected = this._getChecked(true, true)
  }

  _getCheckOnInit () {
    const filterCategories = []
    const searchParams = (new URL(document.location)).searchParams

    this._fieldsets.forEach((fieldset, idx) => {
      const checkboxes = fieldset.querySelectorAll('[type="checkbox"]')
      const checkedParams = searchParams.getAll(checkboxes[0].name)

      filterCategories.push(checkboxes[0].name.slice(0, -2))

      this.allOptions[idx] = []

      checkboxes.forEach(checkbox => {
        const checked = checkedParams.indexOf(checkbox.value) !== -1
        const label = this.querySelector(`[for="${checkbox.id}"]`).textContent

        this.allOptions[idx].push({ value: checkbox.value, checked, label, id: idx, name: checkbox.name, category: fieldset.querySelector('legend').textContent })
      })
    })
  }

  _clickOutSide (e) {
    if (!e.target.closest('.fake-select') && !e.target.closest('.list')) {
      this.close()
    }
  }

  _renderDropDownButton () {
    return html`
      <button type="button" @click=${this.toggleList} class="fake-select wm-form__select">
        ${this.placeholder ?? this.label} 
        ${this.totalChecked > 0 ? `(${this.totalChecked} von ${this.total})` : ''}
      </button>
    `
  }

  _renderCloseButton () {
    return html`
      <button class="close" color="${this.totalChecked > 0 ? '' : 'nebelgrau'}" block @click=${this._closeOrSubmit}>
        ${this.totalChecked > 0 ? this.searchlabel : this.dismisslabel}
      </button>
    `
  }

  _uncheckCheckbox (value, val = false) {
    document.querySelector(`[value="${value}"]`).checked = val
    this.shadowRoot.querySelector(`[value="${value}"]`).checked = val
  }

  _getChecked (count, flat = false, idx, live = true) {
    const options = live ? this.allOptions : this._lastAllOptions

    let items = idx !== undefined ? options[idx] : options

    if (flat) {
      items = Object.values(items).flat()
    }

    items = items.filter(option => option.checked)

    return count ? items.length : items
  }

  _isChecked (idx, input) {
    const checked = this.allOptions[idx].filter(option => (input.value === option.value && option.checked)).length
    this._allChecked(input.name, idx)
    return checked
  }

  _check (e, idx) {
    // console.log('check')

    const value = e.target.value
    const isChecked = e.target.checked

    this._addOrRemoveOption(idx, value, e.target.name, isChecked)
  }

  _addOrRemoveOption (idx, value, section, isChecked) {
    this._uncheckCheckbox(value, isChecked)
    this.allOptions[idx].map(option => {
      if (option.value === value) {
        option.checked = isChecked
      }
      return option
    })

    this.totalChecked = this._getChecked(true, true)
    this._allChecked(section, idx)
  }

  _allChecked (name, idx, allCheckboxes = false) {
    const selector = allCheckboxes ? '[type="checkbox"]' : `[name="${name}"]`
    const checkboxes = this.shadowRoot.querySelectorAll(selector)
    if (checkboxes.length) {
      const checked = Array.from(checkboxes).filter(e => e.checked)
      const all = this.shadowRoot.querySelector(`#check_${idx}`)

      all.indeterminate = false
      all.checked = true

      if (checked.length === 0) {
        all.checked = false
      } else if (checkboxes.length !== checked.length) {
        all.indeterminate = true
      }
    }
  }

  _renderSublist (inputs, idx) {
    return html`
    <div class="sublist">
      ${inputs.map((input) => {
        const label = input.nextElementSibling
        return html`
        <div>
          <input @change="${(e) => this._check(e, idx)}" class="${input.classList}" type="${input.type}" name="${input.name}" id="${input.id}" value="${input.value}" ?checked=${this._isChecked(idx, input)}>
          <label class="${label.classList}" for="${input.id}"">${label.textContent}</label>
        </div>
        `
      })}
    </div>
    `
  }

  _renderSublists () {
    return html`${Array.from(this._fieldsets).map((fieldset, idx) => {
      const legend = fieldset.querySelector('legend')
      const inputs = [...fieldset.querySelectorAll('[type="checkbox"]')]

      return html`<li data-index="${idx}">
        <input type="checkbox" class="wm-h-vh" id="check_${idx}" @change="${(e) => this.checkAll(e, legend.textContent)}" ?checked=${this.allOptions[idx].length} indeterminate="true">
        <label for="check_${idx}">
          <span class="wm-h-vh">
            Check all
          </span>
        </label>
        <button @click="${this.toggleSubList}" expanded="false" clean class="sublisttoggle">
          <strong>${legend.textContent}</strong>

          ${this._getChecked(true, false, idx) > 0 ? `(${this._getChecked(true, false, idx)} von ${inputs.length})` : ''}
        </button>
        ${this._renderSublist(inputs, idx)}
      </li>`
    })}`
  }

  render () {
    return html`
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
    `
  }
}

customElements.define(meta.tag, FilterDropdown)
