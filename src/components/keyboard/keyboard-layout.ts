import type { KeyboardKey } from './keyboard.types'

const key = (code: string, label: string, units = 1, macLabel?: string): KeyboardKey => ({ code, label, units, macLabel })
const letters = (value: string) => [...value].map(letter => key(`Key${letter}`, letter))

// Visual reference: Uiverse.io by dexter-st (user-supplied HTML/CSS).
// Fn and Eject use stable virtual IDs; browsers do not reliably report them.
export const ansiKeyboardLayout: readonly (readonly KeyboardKey[])[] = [
  [key('Escape', 'esc'), ...Array.from({ length: 12 }, (_, i) => key(`F${i + 1}`, `F${i + 1}`)), { ...key('Eject', '⏏', 2), detectable: false }],
  [key('Backquote', '~ `'), ...'1234567890'.split('').map((n, i) => key(`Digit${n}`, `${'!@#$%^&*()'[i]} ${n}`)), key('Minus', '_ −'), key('Equal', '+ ='), key('Backspace', 'backspace', 2, 'delete')],
  [key('Tab', 'tab', 1.5), ...letters('QWERTYUIOP'), key('BracketLeft', '{ ['), key('BracketRight', '} ]'), key('Backslash', '| \\', 1.5)],
  [key('CapsLock', 'caps lock', 1.75), ...letters('ASDFGHJKL'), key('Semicolon', ': ;'), key('Quote', '" \''), key('Enter', 'enter', 2.25, 'return')],
  [key('ShiftLeft', 'shift', 2.25), ...letters('ZXCVBNM'), key('Comma', '< ,'), key('Period', '> .'), key('Slash', '? /'), key('ShiftRight', 'shift', 2.75)],
  [{ ...key('Fn', 'fn'), detectable: false }, key('ControlLeft', 'ctrl', 1.25), key('AltLeft', 'alt', 1.25, '⌥'), key('MetaLeft', 'Win', 1.25, '⌘'), key('Space', '', 5), key('MetaRight', 'Win', 1.25, '⌘'), key('AltRight', 'alt', 1.25, '⌥'), key('ArrowLeft', '◀'), key('ArrowDown', '▼'), key('ArrowUp', '▲'), key('ArrowRight', '▶')],
]
