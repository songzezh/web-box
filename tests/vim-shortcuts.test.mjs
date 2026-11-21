import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'
import { createServer } from 'vite'
import { createElement, act } from 'react'
import { createRoot } from 'react-dom/client'
import { vimShortcuts } from '../src/features/keyboard-shortcuts/vim-data.ts'
import { shortcutSteps, matchesShortcut } from '../src/features/keyboard-shortcuts/shortcut-model.ts'

const find = keys => vimShortcuts.find(item => item.keys === keys)
test('Vim catalog has unique commands, complete metadata and physical mappings', () => {
  assert.equal(vimShortcuts.length, 105)
  assert.equal(new Set(vimShortcuts.map(item => item.id)).size, 105)
  assert.equal(new Set(vimShortcuts.map(item => item.keys)).size, 105)
  for (const item of vimShortcuts) {
    assert.ok(item.name.en && item.name['zh-CN'] && item.modes.length)
    assert.ok(shortcutSteps(item).every(step => step.codes.length))
  }
  for (const keys of ['v', 'V', 'diw', 'ciw', 'yiw', 'Ctrl+r', '*', '#', 'Ctrl+o', 'Ctrl+i']) assert.equal(find(keys).compatibility, 'vim')
  assert.equal(find('"+y').compatibility, 'conditional')
  assert.equal(find('Esc').targetMode, 'Normal')
})
test('sequences, Shift, chords, command terminators and bilingual search remain distinct', () => {
  assert.deepEqual(shortcutSteps(find('dd')).map(s => s.codes), [['KeyD'], ['KeyD']])
  assert.deepEqual(shortcutSteps(find('Ctrl+w h')).map(s => s.codes), [['ControlLeft', 'KeyW'], ['KeyH']])
  assert.deepEqual(shortcutSteps(find('I'))[0].codes, ['ShiftLeft', 'KeyI'])
  assert.deepEqual(shortcutSteps(find(':wq')).map(s => s.codes), [['ShiftLeft', 'Semicolon'], ['KeyW'], ['KeyQ'], ['Enter']])
  assert.equal(shortcutSteps(find('/text')).at(-1).label, 'Enter')
  for (const query of ['delete', '删除', 'dd']) assert.ok(matchesShortcut(find('dd'), query))
  assert.ok(matchesShortcut(find('Ctrl+w h'), 'Ctrl+w'))
  assert.ok(matchesShortcut(find('v'), 'visual'))
})
let dom, server, root, Page, i18n
before(async () => {
  dom = new JSDOM('<div id="root"></div>', { url: 'https://example.com' })
  for (const name of ['window', 'document', 'Node', 'HTMLElement', 'localStorage']) globalThis[name] = dom.window[name]
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
  i18n = (await server.ssrLoadModule('/src/i18n/index.ts')).default
  Page = (await server.ssrLoadModule('/src/features/keyboard-shortcuts/KeyboardShortcuts.tsx')).default
  root = createRoot(document.getElementById('root'))
})
after(async () => { await act(async () => root.unmount()); await server.close(); dom.window.close() })
const change = (element, value) => act(async () => { element.value = value; element.dispatchEvent(new window.Event('change', { bubbles: true })) })
const row = keys => [...document.querySelectorAll('.shortcut-row')].find(item => item.dataset.shortcutKeys === keys)
const legends = element => [...element.querySelectorAll('kbd')].map(key => key.textContent)
const toggle = keys => act(async () => row(keys).querySelector('.shortcut-expand').click())

test('inline details retain data, descriptions, filters, translations and exclusive expansion', async () => {
  await act(async () => root.render(createElement(Page)))
  await act(async () => i18n.changeLanguage('en'))
  assert.equal(document.querySelectorAll('.shortcut-row').length, 4)
  assert.deepEqual(legends(row('Ctrl+c').querySelector('.shortcut-summary')), ['Ctrl', 'C'])
  await toggle('Ctrl+c')
  assert.deepEqual(legends(row('Ctrl+c').querySelector('.shortcut-expansion')), ['Ctrl', 'C'])
  assert.equal(document.querySelectorAll('.shortcut-expansion[data-expanded]').length, 1)
  await toggle('Ctrl+k')
  assert.equal(row('Ctrl+c').querySelector('button').getAttribute('aria-expanded'), 'false')
  await change(document.querySelectorAll('select')[1], 'mac')
  assert.deepEqual(legends(row('Cmd+c').querySelector('.shortcut-summary')), ['⌘', 'C'])
  assert.equal(document.querySelector('.shortcut-expansion[data-expanded]'), null)
  await toggle('Cmd+c')
  assert.deepEqual(legends(row('Cmd+c').querySelector('.shortcut-expansion')), ['⌘', 'C'])
  await change(document.querySelector('select'), 'vim')
  assert.equal(document.querySelectorAll('.shortcut-row').length, 105)
  assert.equal(document.querySelector('.shortcut-expansion[data-expanded]'), null)
  assert.equal(document.querySelector('[role="menu"], dialog, .shortcut-preview'), null)
  assert.equal(document.querySelector('.shortcuts-filters input[type="checkbox"]'), null)
  assert.equal(row('dd').querySelectorAll('button').length, 1)
  assert.deepEqual(legends(row('dd').querySelector('.shortcut-summary')), ['d', 'd'])
  const button = row('dd').querySelector('button')
  button.focus()
  await toggle('dd')
  const panel = document.getElementById(button.getAttribute('aria-controls'))
  assert.equal(panel.parentElement, row('dd'))
  assert.equal(button.getAttribute('aria-expanded'), 'true')
  assert.equal(panel.getAttribute('aria-hidden'), 'false')
  assert.equal(panel.hasAttribute('inert'), false)
  assert.equal(document.activeElement, button)
  assert.deepEqual([...panel.querySelectorAll('h3')].map(item => item.textContent), ['Details', 'Key Sequence'])
  assert.ok(panel.textContent.includes(find('dd').name.en))
  assert.deepEqual(legends(panel), ['d', 'd'])
  assert.equal(panel.querySelectorAll('.shortcut-sequence li').length, 2)
  assert.equal(panel.querySelector('.shortcut-sequence-arrow').textContent, '→')
  await toggle('Ctrl+w h')
  assert.equal(button.getAttribute('aria-expanded'), 'false')
  assert.equal(panel.getAttribute('aria-hidden'), 'true')
  assert.equal(panel.hasAttribute('inert'), true)
  assert.equal(document.querySelectorAll('.shortcut-expansion[data-expanded]').length, 1)
  const mixed = row('Ctrl+w h').querySelector('.shortcut-expansion')
  assert.deepEqual(legends(mixed), ['Ctrl', 'W', 'h'])
  assert.equal(mixed.querySelectorAll('.shortcut-sequence li').length, 2)
  assert.equal(mixed.querySelector('.shortcut-sequence-keys > span').textContent, '+')
  await toggle('Ctrl+w h')
  assert.equal(document.querySelector('.shortcut-expansion[data-expanded]'), null)
  await toggle(':wq')
  assert.deepEqual(legends(row(':wq').querySelector('.shortcut-expansion')), [':', 'w', 'q', 'Enter'])
  assert.equal(row(':wq').querySelectorAll('.shortcut-expansion .shortcut-sequence-arrow').length, 3)
  await act(async () => i18n.changeLanguage('zh-CN'))
  assert.deepEqual([...row(':wq').querySelectorAll('h3')].map(item => item.textContent), ['详细说明', '按键顺序'])
  assert.match(row('dd').textContent, /删除/)
  await change(document.querySelectorAll('.shortcuts-filters select')[0], 'navigation')
  const navigation = vimShortcuts.filter(item => item.category === 'navigation' || item.relatedCategories?.includes('navigation'))
  assert.equal(document.querySelectorAll('.shortcut-row').length, navigation.length)
  assert.equal(document.querySelector('.shortcut-expansion[data-expanded]'), null)
  assert.equal(localStorage.getItem('web-box-shortcut-favorites'), null)
})

test('multi-modifier chords remain one step and render distinct keycaps without changing the Vim catalog', async () => {
  const shortcut = { ...find('Ctrl+w h'), keys: 'Ctrl+Shift+P', kind: 'chord' }
  assert.deepEqual(shortcutSteps(shortcut), [{ label: 'Ctrl+Shift+P', codes: ['ControlLeft', 'ShiftLeft', 'KeyP'] }])
  const { ShortcutItem } = await server.ssrLoadModule('/src/components/shortcuts/index.ts')
  await act(async () => root.render(createElement(ShortcutItem, { title: 'Test chord', keys: shortcut.keys, steps: shortcutSteps(shortcut), expanded: true, onToggle: () => {} })))
  assert.deepEqual(legends(document.querySelector('.shortcut-expansion')), ['Ctrl', 'Shift', 'P'])
  assert.equal(document.querySelectorAll('.shortcut-expansion .shortcut-sequence li').length, 1)
  assert.equal(document.querySelector('.shortcut-sequence-arrow'), null)
  assert.equal(vimShortcuts.length, 105)
})
