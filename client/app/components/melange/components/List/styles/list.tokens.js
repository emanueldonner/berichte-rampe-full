import { css } from 'lit';

export const tokens = [css`
:host {
  --list-border: var(--_list-border, 1px solid);
  --list-border-color: var(--_list-border-color, var(--site-color));
  --list-gap: var(--_list-gap, 0.5rem);
}`]