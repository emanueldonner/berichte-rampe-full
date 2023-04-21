import { css } from 'lit';

export const tokens = [css`
:host {
  --tag-background: var(--_tag-background, #FFF);
  --tag-background-hover: var(--_tag-background-hover, var(--site-color-secondary));
  --tag-border: var(--_tag-border, var(--site-color-secondary));
  --tag-padding-inline: var(--_tag-padding-inline, 0.8125rem);
  --tag-padding-block: var(--_tag-padding-block, 0.15625rem);
  --tag-padding-inline-large: var(--_tag-padding-inline-large, 0.9375rem);
  --tag-padding-block-large: var(--_tag-padding-block-large, 0.28125rem);
  --tag-gap: var(--_tag-gap, 1rem);
  --tag-min-height: var(--_tag-min-height, 2.1375rem);
  --tag-min-height-large: var(--_tag-min-height-large, 2.5rem);
  --tag-link-color: var(--_tag-link-color, #000);
  --tag-font-size: var(--_tag-font-size, 0.8rem);
}`]