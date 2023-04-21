import { css } from 'lit'

export const styles = [css`
  * {
    box-sizing: border-box;
  }

  :host {
    transition: transform 0.3s;
  }

  :host([color="flieder"]) {
    --header-nav-wrapper-background: var(--wm-color-flieder-light) !important;
  }

  :host([color="goldgelb"]) {
    --header-nav-wrapper-background: var(--wm-color-goldgelb-light) !important;
  }

  :host([color="abendstimmung"]) {
    --header-nav-wrapper-background: var(--wm-color-abendstimmung-light) !important;
  }

  :host([color="morgenrot"]) {
    --header-nav-wrapper-background: var(--wm-color-morgenrot-light) !important;
  }

  :host([color="frischgruen"]) {
    --header-nav-wrapper-background: var(--wm-color-frischgruen-light) !important;
  }

  .nav-actions {
    background: red;
    display: flex;
    justify-content: space-between;
    padding-inline: var(--site-wrapper-padding);
    width: 100%;
    align-items: center;
    border-image: conic-gradient( var(--header-nav-wrapper-background) 0 0) fill 1//0 50vw;
    display: flex;
    justify-content: space-between;
    min-height: var(--header-nav-height);
    margin-inline: var(--site-wrapper-margin-inline);
    max-width: var(--site-wrapper-width);
  }
`]
