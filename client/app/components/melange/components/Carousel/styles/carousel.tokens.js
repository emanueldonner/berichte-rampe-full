import { css } from 'lit';

export const tokens = [css`
:host {
  --carousel-ratio: var(--_carousel-ratio, 16 / 9);
  --carousel-item-inner-padding: var(--_carousel-item-inner-padding, 0);
  --carousel-shadow-offset: var(--_carousel-shadow-offset, 0);
  --carousel-gap: var(--_carousel-gap, 1rem);
  --carousel-control-bg: var(--_carousel-control-bg, #fff);
  --carousel-control-bg-start: var(--_carousel-control-bg-start, none);
  --carousel-control-bg-end: var(--_carousel-control-bg-end, none);
}`]