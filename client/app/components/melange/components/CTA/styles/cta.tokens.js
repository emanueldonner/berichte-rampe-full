import { css } from 'lit';

export const tokens = [css`
:host {
  --cta-icon: var(--_cta-icon, none);
  --cta-icon-start: var(--_cta-icon-start, none);
  --cta-color-link: var(--_cta-color-link, var(--site-color));
  --cta-color-visited: var(--_cta-color-visited, var(--site-color));
  --cta-font-variation-settings: var(--_cta-font-variation-settings, none);
  --cta-font-weight: var(--_cta-font-weight, bold);
  --cta-padding: var(--_cta-padding, .5rem .5rem .5rem 0);
  --cta-padding-start: var(--_cta-padding-start, .5rem 0 .5rem .5rem .5rem);
}`]