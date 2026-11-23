/** 快捷键数据模型与纯转换函数；输出由 ShortcutSequence 消费，不注册或执行系统快捷键。 */
import type { ShortcutSequenceStep } from '../../components/shortcuts'

export const modes = ['Normal', 'Insert', 'Visual', 'Visual Block', 'Replace', 'Command-line'] as const
export const categories = ['modes', 'navigation', 'editing', 'clipboard', 'search', 'files', 'windows', 'formatting', 'marks'] as const
export type Mode = typeof modes[number]
/**
 * Vim 快捷键数据契约；模式、兼容性与分类用于筛选，kind 用于解释输入方式。
 */
export interface Shortcut {
  /** 列表唯一标识及父级展开项标识。 */
  id: string
  /** 用于显示和步骤解析的原始键串。 */
  keys: string
  /** 主分类，必须属于本模块 categories。 */
  category: typeof categories[number]
  /** 可选关联分类；未提供时只按主分类命中。 */
  relatedCategories?: (typeof categories[number])[]
  /** 英文与简体中文操作名称。 */
  name: { en: string; 'zh-CN': string }
  /** 适用的 Vim 模式集合。 */
  modes: Mode[]
  /** 可选切换目标模式；缺省时不展示模式箭头，也不额外命中模式筛选。 */
  targetMode?: Mode
  /** Vi/Vim 共通、Vim 特有或取决于环境的条件支持标签。 */
  compatibility: 'vi-vim' | 'vim' | 'conditional'
  /** 输入方式：组合键、顺序按键或需要提交的命令。 */
  kind: 'chord' | 'sequence' | 'command'
}
export type KeyStep = ShortcutSequenceStep

// ANSI physical keys, independent of the selected operating system.
/**
 * 将单字符映射为 ANSI 物理按键；大写字母与移位符号包含 ShiftLeft。
 * @param character - 待映射的单字符
 * @returns 物理键标识；不支持的字符返回空数组，不做系统键位转换
 */
export function characterKeys(character: string): string[] {
  if (/^[a-z]$/i.test(character)) return [...(character === character.toUpperCase() ? ['ShiftLeft'] : []), `Key${character.toUpperCase()}`]
  if (/^[0-9]$/.test(character)) return [`Digit${character}`]
  const plain: Record<string, string> = { ' ': 'Space', '`': 'Backquote', '-': 'Minus', '=': 'Equal', '[': 'BracketLeft', ']': 'BracketRight', '\\': 'Backslash', ';': 'Semicolon', "'": 'Quote', ',': 'Comma', '.': 'Period', '/': 'Slash' }
  const shifted: Record<string, string> = { '~': 'Backquote', '!': 'Digit1', '@': 'Digit2', '#': 'Digit3', '$': 'Digit4', '%': 'Digit5', '^': 'Digit6', '&': 'Digit7', '*': 'Digit8', '(': 'Digit9', ')': 'Digit0', '_': 'Minus', '+': 'Equal', '{': 'BracketLeft', '}': 'BracketRight', '|': 'Backslash', ':': 'Semicolon', '"': 'Quote', '<': 'Comma', '>': 'Period', '?': 'Slash' }
  return shifted[character] ? ['ShiftLeft', shifted[character]] : plain[character] ? [plain[character]] : []
}
/**
 * 将显示键串转换为顺序步骤；Esc 特判，修饰键前缀先解析组合，再按字符追加后续步骤。
 * @param shortcut - 原始 keys 与输入种类 kind
 * @returns 展示用步骤；非修饰键分支的 command 末尾附加 Enter，未知字符仍保留 label
 */
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
/**
 * 对键串、中英文名称、模式及兼容性执行不区分大小写的子串搜索；不搜索分类字段。
 * @param shortcut - 待检查条目
 * @param query - 去首尾空白的查询；空串匹配所有条目
 * @returns 是否命中任一合并字段
 */
export function matchesShortcut(shortcut: Shortcut, query: string): boolean {
  return [shortcut.keys, shortcut.name.en, shortcut.name['zh-CN'], ...shortcut.modes, shortcut.targetMode ?? '', shortcut.compatibility].join(' ').toLowerCase().includes(query.trim().toLowerCase())
}
