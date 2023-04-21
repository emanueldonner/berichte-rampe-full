import { css } from 'lit';

export const tokens = [css`
:host {
  --card-background: var(--_card-background, #FFFFFF);
  --card-border: var(--_card-border, 1px solid var(--site-color));
  --card-eyecatcher-spacing: var(--_card-eyecatcher-spacing, 1rem);
  --card-eyecatcher-padding: var(--_card-eyecatcher-padding, 0.5rem);
  --card-eyecatcher-fontsize: var(--_card-eyecatcher-fontsize, 1.5rem);
  --card-media-background: var(--_card-media-background, hsl(0 0% 0%));
  --card-media-color: var(--_card-media-color, hsl(0 0% 100%));
  --card-spacing: var(--_card-spacing, 1rem);
  --card-spacing-large: var(--_card-spacing-large, 1.5rem);
  --card-shadow: var(--_card-shadow, none);
}`]