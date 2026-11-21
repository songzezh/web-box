import type { ShortcutSequenceStep } from '../../components/shortcuts'

export const modes = ['Normal', 'Insert', 'Visual', 'Visual Block', 'Replace', 'Command-line'] as const
export const categories = ['modes', 'navigation', 'editing', 'clipboard', 'search', 'files', 'windows', 'formatting', 'marks'] as const
export type Mode = typeof modes[number]
export interface Shortcut {
  id: string
  keys: string
  category: typeof categories[number]
  relatedCategories?: (typeof categories[number])[]
  name: { en: string; 'zh-CN': string }
  modes: Mode[]
  targetMode?: Mode
  compatibility: 'vi-vim' | 'vim' | 'conditional'
  kind: 'chord' | 'sequence' | 'command'
}
export type KeyStep = ShortcutSequenceStep

// ANSI physical keys, independent of the selected operating system.
export function characterKeys(character: string): string[] {
  if (/^[a-z]$/i.test(character)) return [...(character === character.toUpperCase() ? ['ShiftLeft'] : []), `Key${character.toUpperCase()}`]
  if (/^[0-9]$/.test(character)) return [`Digit${character}`]
  const plain: Record<string, string> = { ' ': 'Space', '`': 'Backquote', '-': 'Minus', '=': 'Equal', '[': 'BracketLeft', ']': 'BracketRight', '\\': 'Backslash', ';': 'Semicolon', "'": 'Quote', ',': 'Comma', '.': 'Period', '/': 'Slash' }
  const shifted: Record<string, string> = { '~': 'Backquote', '!': 'Digit1', '@': 'Digit2', '#': 'Digit3', '$': 'Digit4', '%': 'Digit5', '^': 'Digit6', '&': 'Digit7', '*': 'Digit8', '(': 'Digit9', ')': 'Digit0', '_': 'Minus', '+': 'Equal', '{': 'BracketLeft', '}': 'BracketRight', '|': 'Backslash', ':': 'Semicolon', '"': 'Quote', '<': 'Comma', '>': 'Period', '?': 'Slash' }
  return shifted[character] ? ['ShiftLeft', shifted[character]] : plain[character] ? [plain[character]] : []
}
export function shortcutSteps(shortcut: Pick<Shortcut, 'keys' | 'kind'>): KeyStep[] {
  if (shortcut.keys === 'Esc') return [{ label: 'Esc', codes: ['Escape'] }]
  if (/^(Ctrl|Shift|Alt|Cmd|Meta)\+/.test(shortcut.keys)) {
    const [chord, ...rest] = shortcut.keys.split(' ')
    const parts = chord.split('+')
    const character = parts.pop() ?? ''
    const modifiers: Record<string, string> = { Ctrl: 'ControlLeft', Shift: 'ShiftLeft', Alt: 'AltLeft', Cmd: 'MetaLeft', Meta: 'MetaLeft' }
    const codes = [...new Set([...parts.map(part => modifiers[part]).filter(Boolean), ...characterKeys(character)])]
    return [{ label: chord, codes }, ...rest.flatMap(value => [...value].map(label => ({ label, codes: characterKeys(label) }))) ]
  }
  const steps = [...shortcut.keys].map(label => ({ label, codes: characterKeys(label) }))
  if (shortcut.kind === 'command') steps.push({ label: 'Enter', codes: ['Enter'] })
  return steps
}
export function matchesShortcut(shortcut: Shortcut, query: string): boolean {
  return [shortcut.keys, shortcut.name.en, shortcut.name['zh-CN'], ...shortcut.modes, shortcut.targetMode ?? '', shortcut.compatibility].join(' ').toLowerCase().includes(query.trim().toLowerCase())
}
