import { css } from 'lit';

export const tokens = [css`
:host {
  --tabs-alignment: var(--_tabs-alignment, start);
  --tabs-border: var(--_tabs-border, none);
  --tabs-gap: var(--_tabs-gap, 0);
  --tabs-padding: var(--_tabs-padding, 1rem);
  --tabs-spacing: var(--_tabs-spacing, 0);
  --tab-background-color: var(--_tab-background-color, var(--site-color-secondary));
  --tab-background-color-selected: var(--_tab-background-color-selected, transparent);
  --tab-border-width: var(--_tab-border-width, 1px 1px 0 1px);
  --tab-border-color: var(--_tab-border-color, transparent);
  --tab-border-color-selected: var(--_tab-border-color-selected, var(--site-color));
  --tab-padding: var(--_tab-padding, 0.4rem 0.8rem);
  --tabpanel-padding: var(--_tabpanel-padding, 0.4rem 0.8rem);
  --tabpanel-border-width: var(--_tabpanel-border-width, 1px);
  --tabpanel-border-color: var(--_tabpanel-border-color, var(--site-color));
}`]