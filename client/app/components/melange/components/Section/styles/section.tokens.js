import { css } from 'lit';

export const tokens = [css`
:host {
  --section-background: var(--_section-background, transparent);
  --section-border-color: var(--_section-border-color, var(--site-color-secondary));
  --section-border-width: var(--_section-border-width, 12px 0);
  --section-padding: var(--_section-padding, 0);
  --section-padding-highlight: var(--_section-padding-highlight, 1rem);
  --section-padding-highlight-large: var(--_section-padding-highlight-large, 2rem);
  --section-background-highlight: var(--_section-background-highlight, transparent);
  --section-nav-shadow: var(--_section-nav-shadow, none);
  --section-nav-link-padding: var(--_section-nav-link-padding, 0.8rem 1.875rem);
  --section-nav-link-highlight: var(--_section-nav-link-highlight, gray);
  --section-nav-link-highlight-large: var(--_section-nav-link-highlight-large, gray);
  --section-nav-background: var(--_section-nav-background, gray);
  --section-nav-background-large: var(--_section-nav-background-large, #fff);
}`]