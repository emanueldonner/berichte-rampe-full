import { css } from 'lit'

export const styles = [css`
:host {
  display: flex;
  flex-direction: column;
}

@media(min-width: 48em) {
  :host {
    flex-direction: row;
  }
}

:host([vertical="true"]) {
  flex-direction: column;
}

:host([horizontal="true"]) {
  flex-direction: row;
}

:host([grow="false"][vertical="true"]) {
  align-items: start;
}

:host([wrap="false"]) {
  /* overflow: auto; */
}

/* Noch testen, ob das was macht:
:host([wrap="false"]) ::slotted(*) {
  flex-shrink: 0;
}
*/

:host {
  --_justify: start;
  --_align: normal;
  justify-content: var(--_justify);
  align-items: var(--_align);
}

:host([wrap="true"]) {
  flex-wrap: wrap;
}

:host([grow="true"]) ::slotted(*) {
  flex-grow: 1;
}

:host([equal="true"][grow="true"]) ::slotted(*) {
  flex-shrink: 0;
  min-width: 0;
}

:host([equal="true"][grow="true"]:not([wrap="true"])) ::slotted(*) {
  flex-basis: 0px;
}

:host([gap="default"]) {
  gap: var(--stack-spacing);
}

:host([gap="xs"]) {
  gap: var(--stack-spacing-xs);
}

:host([gap="s"]) {
  gap: var(--stack-spacing-s);
}

:host([gap="m"]) {
  gap: var(--stack-spacing-m);
}

:host([gap="l"]) {
  gap: var(--stack-spacing-l);
}

:host([gapx="default"]) {
  column-gap: var(--stack-spacing);
}

:host([gapx="xs"]) {
  column-gap: var(--stack-spacing-xs);
}

:host([gapx="s"]) {
  column-gap: var(--stack-spacing-s);
}

:host([gapx="m"]) {
  column-gap: var(--stack-spacing-m);
}

:host([gapx="l"]) {
  column-gap: var(--stack-spacing-l);
}

:host([gapy="default"]) {
  row-gap: var(--stack-spacing);
}

:host([gapy="xs"]) {
  row-gap: var(--stack-spacing-xs);
}

:host([gapy="s"]) {
  row-gap: var(--stack-spacing-s);
}

:host([gapy="m"]) {
  row-gap: var(--stack-spacing-m);
}

:host([gapy="l"]) {
  row-gap: var(--stack-spacing-l);
}

:host([justify="center"]) {
  --_justify: center;
}

:host([justify="space-between"]) {
  --_justify: space-between;
}

@media(min-width: 48em) {
  :host([alignment="center"]) {
    --_align: center;
  }

  :host([alignment="end"]) {
    --_align: end;
  }
}

::slotted(img) {
  align-self: start;
}

::slotted(*) {
  margin: 0 !important;
}
`]
