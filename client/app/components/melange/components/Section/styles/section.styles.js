import { css } from 'lit'

export const styles = [css`
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
    transition: opacity 0.3s, visibility 0.3s;
    z-index: 1230;

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
  }

  :host([nav="scroll"]) nav {
    --_nav-inset: calc(var(--header-height) + var(--header-nav-height)) 0 0;
    --_nav-height: var(--header-height);
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
      --_nav-pos: sticky;
      --_nav-width: 20.5rem;
      --_nav-inset: calc(var(--header-height) + var(--header-nav-height) + 2rem) 0 auto auto;
      --_nav-height: auto;
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
    padding: var(--section-nav-link-padding);
    text-decoration: none;
    transition: background-color 100ms;
  }

  nav a[aria-current],
  nav a:hover {
    background-color: var(--_nav-link)
  }


`]
