export type KeyboardPlatform = 'mac' | 'windows'

export interface KeyboardKey {
  code: string
  label: string
  units: number
  macLabel?: string
  detectable?: boolean
}

export interface KeyboardProps {
  platform?: KeyboardPlatform
  layout?: readonly (readonly KeyboardKey[])[]
  activeKeys?: readonly string[]
  interactive?: boolean
  listenToKeyboard?: boolean
  onKeyClick?: (code: string) => void
  onKeyDown?: (code: string) => void
  onKeyUp?: (code: string) => void
  className?: string
}
