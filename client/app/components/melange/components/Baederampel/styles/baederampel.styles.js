import { css } from 'lit'

export const styles = [css`
* {
  box-sizing: border-box;
}

:host {
  align-items: center;
  display: flex;
  gap: var(--wm-spacing-xs);
  flex-wrap: wrap;
}

span {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.status {
  width: 1.6rem;
  height: 1.6rem;
  background: #d6d1ca;
  display: inline-block;
  border-radius: 50%;
}

.status-0 {
  background: #292929;
}

.status-1 {
  background: #82d282;
}

.status-2 {
  background: #e6c828;
}

.status-3 {
  background: #e6b728;
}
.status-4 {
  background: #e68a28;
}

.status-5 {
  background: #cc0000;
}

strong {
  font-weight: normal;
  font-variation-settings: var(--wm-f-fwb);
}
`]
