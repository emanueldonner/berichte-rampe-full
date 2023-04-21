import { css } from 'lit';

export const tokens = [css`
:host {
  --grid-spacing: var(--_grid-spacing, 1rem);
  --grid-spacing-xs: var(--_grid-spacing-xs, 0.625rem);
  --grid-spacing-s: var(--_grid-spacing-s, 0.9375rem);
  --grid-spacing-m: var(--_grid-spacing-m, 1.25rem);
  --grid-spacing-l: var(--_grid-spacing-l, 1.875rem);
}`]