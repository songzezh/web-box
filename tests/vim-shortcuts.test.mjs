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
const copied = []
const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
before(async () => {
  dom = new JSDOM('<div id="root"></div>', { url: 'https://example.com' })
  for (const name of ['window', 'document', 'Node', 'HTMLElement', 'localStorage']) globalThis[name] = dom.window[name]
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { writeText: async text => copied.push(text) } } })
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
  i18n = (await server.ssrLoadModule('/src/i18n/index.ts')).default
  Page = (await server.ssrLoadModule('/src/features/keyboard-shortcuts/KeyboardShortcuts.tsx')).default
  root = createRoot(document.getElementById('root'))
})
after(async () => { await act(async () => root.unmount()); await server.close(); dom.window.close(); if (originalNavigator) Object.defineProperty(globalThis, 'navigator', originalNavigator); else delete globalThis.navigator })
const change = (element, value) => act(async () => { element.value = value; element.dispatchEvent(new window.Event('change', { bubbles: true })) })
test('page preserves shortcut details, keycaps, filters, copying and translations without favorites without a virtual keyboard', async () => {
  await act(async () => root.render(createElement(Page)))
  assert.equal(document.querySelectorAll('.shortcuts-presets button').length, 4)
  await act(async () => document.querySelectorAll('.shortcuts-presets button')[1].click())
  assert.equal(copied.at(-1), 'Ctrl+C')
  await change(document.querySelectorAll('select')[1], 'mac')
  await act(async () => document.querySelectorAll('.shortcuts-presets button')[1].click())
  assert.equal(copied.at(-1), '⌘+C')
  await change(document.querySelector('select'), 'vim')
  assert.equal(document.querySelectorAll('.shortcut-row').length, 105)
  const row = keys => [...document.querySelectorAll('.shortcut-row')].find(row => row.dataset.shortcutKeys === keys)
  await act(async () => row('Ctrl+w h').querySelector('button').click())
  assert.equal(document.querySelector('.keyboard'), null)
  assert.equal(document.querySelector('[data-code]'), null)
  assert.deepEqual([...document.querySelectorAll('.shortcut-steps kbd')].map(key => key.textContent), ['Ctrl+w', 'h'])
  assert.equal(document.querySelectorAll('.shortcut-steps .keyboard-key--highlighted').length, 2)
  assert.equal(document.querySelectorAll('.shortcut-steps button').length, 0)
  assert.equal(document.querySelector('.shortcut-steps kbd').dataset.keyCode, 'ControlLeft+KeyW')
  assert.match(document.querySelector('.shortcut-preview').textContent, /Ctrl\+w h/)
  await act(async () => row('dd').querySelectorAll('button')[1].click())
  assert.equal(copied.at(-1), 'dd')
  assert.equal(document.querySelector('.shortcuts-filters input[type="checkbox"]'), null)
  assert.equal(row('dd').querySelectorAll('button').length, 2)
  assert.deepEqual([...row('dd').querySelectorAll('kbd')].map(key => key.textContent), ['d', 'd'])
  assert.deepEqual([...row(':wq').querySelectorAll('kbd')].map(key => key.textContent), [':', 'w', 'q', 'Enter'])
  assert.equal(row('Ctrl+w h').querySelectorAll('.keyboard-key--highlighted').length, 2)
  assert.equal(localStorage.getItem('web-box-shortcut-favorites'), null)
  await act(async () => i18n.changeLanguage('zh-CN'))
  assert.match(row('dd').textContent, /删除/)
  await change(document.querySelectorAll('.shortcuts-filters select')[0], 'navigation')
  const navigation = vimShortcuts.filter(item => item.category === 'navigation' || item.relatedCategories?.includes('navigation'))
  assert.equal(document.querySelectorAll('.shortcut-row').length, navigation.length)
})
