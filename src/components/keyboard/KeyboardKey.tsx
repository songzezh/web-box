/*
 * From Uiverse.io by Cksunandh
 * https://uiverse.io/Cksunandh/stale-dog-84
 *
 * MIT License
 * Copyright (c) Cksunandh (Sunandh ck)
 */
import { memo } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import './KeyboardKey.css'

export type KeyboardKeySize = 'default' | 'wide' | 'extra-wide' | 'space'
export type KeyboardKeyState = 'default' | 'highlighted' | 'pressed' | 'disabled'

export interface KeyboardKeyProps {
  keyCode: string
  label: string
  secondaryLabel?: string
  size?: KeyboardKeySize
  state?: KeyboardKeyState
  width?: number | string
  icon?: ReactNode
  disabled?: boolean
  /** Render a non-interactive key legend, outside the Tab order. */
  readOnly?: boolean
  onClick?: () => void
  className?: string
  'aria-label'?: string
}

export const KeyboardKey = memo(function KeyboardKey({
  keyCode, label, secondaryLabel, size = 'default', state = 'default',
  width, icon, disabled = false, readOnly = false, onClick, className = '',
  'aria-label': ariaLabel,
}: KeyboardKeyProps) {
  const isDisabled = disabled || state === 'disabled'
  const props = {
    className: `keyboard-key keyboard-key--${size} keyboard-key--${isDisabled ? 'disabled' : state}${icon ? ' keyboard-key--with-icon' : ''} ${className}`.trim(),
    style: width === undefined ? undefined : { '--keyboard-key-width': typeof width === 'number' ? `${width}px` : width, flex: '0 0 auto' } as CSSProperties,
    'data-key-code': keyCode,
    'aria-label': ariaLabel ?? (secondaryLabel ? `${label}, ${secondaryLabel}` : label),
  }
  const content = <span className="keyboard-key__content">
    {secondaryLabel && <span className="keyboard-key__secondary">{secondaryLabel}</span>}
    <span className="keyboard-key__face">
      {icon && <span className="keyboard-key__icon" aria-hidden="true">{icon}</span>}
      <span className="keyboard-key__label">{label}</span>
    </span>
  </span>

  return readOnly
    ? <kbd {...props} aria-disabled={isDisabled || undefined}>{content}</kbd>
    : <button {...props} type="button" disabled={isDisabled} aria-pressed={state === 'highlighted' || state === 'pressed'} onClick={onClick}>{content}</button>
})
