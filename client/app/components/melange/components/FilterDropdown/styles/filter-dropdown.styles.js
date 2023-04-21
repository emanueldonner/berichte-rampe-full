import { css } from 'lit'

export const styles = [
  css`
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
`]
