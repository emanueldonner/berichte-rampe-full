/* @copyright Stadt Wien - Wiener Melange v2 */
import{i as t,s as o,y as r}from"../../lit-element-a22611a3.js";const n=[t`
:host {
  --button-background: var(--_button-background, gray);
  --button-border: var(--_button-border, gray);
  --button-color: var(--_button-color, #000000);
  --button-text-transform: var(--_button-text-transform, none);
}`],e=[t`

::slotted(:is(button, a)) {
  --button-background: var(--button-primary);
  --button-background-hover: var(--button-secondary);
  --button-border-color: var(--button-primary);
  --button-color: var(--button-secondary);
  --button-color-hover: var(--button-primary);
}

:host ::slotted(:is(button, a)) {
  display: flex;
  justify-content: center;
  gap: var(--wm-spacing-xxs) !important;
}

/* Disabled buttons */

::slotted(button:is([aria-disabled="true"], [disabled])) {
  opacity: 0.5;
  pointer-events: none;
}

/* Secondary Buttons */

:host([kind="secondary"]) ::slotted(:is(button, a)) {
  --button-background: var(--button-secondary);
  --button-color: var(--button-primary);
  --button-background-hover: var(--button-primary);
  --button-color-hover: var(--button-secondary)
}

/* Tertiary Buttons */

:host([kind="tertiary"]) ::slotted(:is(button, a)) {
  --button-background: none;
  --button-color: var(--button-primary);
  --button-background-hover: none;
  --button-color-hover: var(--button-primary);
  --button-border-color: transparent;

  text-transform: none !important; 
  text-decoration: underline !important;
  font-variation-settings: var(--wm-font-weight-normal) !important;
  font-weight: normal !important;
  padding: 0 !important;
}

:host([kind="tertiary"]) ::slotted(button:is(:hover, :focus-visible)) {
  text-decoration: none !important;
}

/* Clean Buttons */

:host([kind="clean"]) ::slotted(:is(button, a)) {
  all: unset !important;
  align-items: center !important;
  cursor: pointer !important;
  display: inline-flex !important;
  gap: var(--wm-spacing-xxs) !important;
  line-height: 1.45 !important;
  outline: revert !important;
  box-sizing: border-box !important;
}

:host([kind="clean"]) ::slotted(button:focus-visible) {
  outline-offset: var(--site-focus-outline-offset) !important;
  outline: var(--_button-focus-outline, var(--site-focus-outline)) !important;
}

/* Full width Buttons */

:host([full]) ::slotted(:is(button, a)) {
  width:100% !important;
}

:host([alignment="center"]) ::slotted(:is(button, a)) {
  justify-content: center !important;
}

:host([alignment="space-between"]) ::slotted(:is(button, a)) {
  justify-content: space-between !important;
}

/* Color variations */

:host([color]) ::slotted(:is(button, a)) {
  --button-color:  var(--wm-color-fastschwarz);
  --button-color-hover:  var(--wm-color-fastschwarz);
}

:host([kind="secondary"]) ::slotted(:is(button, a)) {
  --button-color: var(--wm-color-fastschwarz);
  --button-color-hover:  var(--wm-color-weiss);
}

:host([kind="tag"]) ::slotted(:is(button, a)) {
  border-radius: 30px;
  --button-text-transform: none;
}

:host([color="frischgruen"]) ::slotted(:is(button, a)) {
  --button-primary: var(--wm-color-frischgruen);
  --button-secondary: var(--wm-color-weiss);
}

:host([color="morgenrot"]) ::slotted(:is(button, a)) {
  --button-primary: var(--wm-color-morgenrot);
  --button-secondary: var(--wm-color-weiss);
}

:host([color="nebelgrau"]) ::slotted(:is(button, a)) {
  --button-primary: var(--wm-color-nebelgrau);
  --button-secondary: var(--wm-color-weiss);
}

:host([color="abendstimmung"]) ::slotted(:is(button, a)) {
  --button-primary: var(--wm-color-abendstimmung);
  --button-secondary: var(--wm-color-weiss);

  --button-color:  var(--wm-color-weiss);
  --button-color-hover:  var(--wm-color-abendstimmung);
}

:host([color="abendstimmung"][kind="secondary"]) ::slotted(:is(button, a)) {
  --button-color: var(--wm-color-abendstimmung);
  --button-color-hover:  var(--wm-color-weiss);
}

:host([color="abendstimmung"][kind="tertiary"]) ::slotted(:is(button, a)) {
  --button-color: var(--button-primary);
}

:host([color="goldgelb"]) ::slotted(:is(button, a)) {
  --button-primary: var(--wm-color-goldgelb);
  --button-secondary: var(--wm-color-weiss);
}

:host([color="flieder"]) ::slotted(:is(button, a)) {
  --button-primary: var(--wm-color-flieder);
  --button-secondary: var(--wm-color-weiss);
}
`];class a extends o{static properties={kind:{type:String,reflect:!0},color:{type:String,reflect:!0},full:{type:Boolean,reflect:!0},alignment:{type:String,reflect:!0}};static styles=[n,e];constructor(){super(),this.kind="primary",this.full=!1,this.alignment=void 0,this.color=void 0}render(){return r`
      <slot></slot>
    `}}customElements.define("wm-button",a);const s="wm-button";export{a as Button,s as tagName};
