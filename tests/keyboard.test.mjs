import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'
import { createServer } from 'vite'
import { createElement, act } from 'react'
import { createRoot } from 'react-dom/client'

let dom, server, root, Keyboard, layout, i18n, useTheme
before(async () => {
  dom = new JSDOM('<div id="root"></div>', { url: 'https://example.com' })
  for (const name of ['window', 'document', 'Node', 'HTMLElement', 'localStorage']) globalThis[name] = dom.window[name]
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
  i18n = (await server.ssrLoadModule('/src/i18n/index.ts')).default
  const module = await server.ssrLoadModule('/src/components/keyboard/index.ts')
  Keyboard = module.Keyboard
  layout = module.ansiKeyboardLayout
  useTheme = (await server.ssrLoadModule('/src/hooks/useTheme.ts')).useTheme
  root = createRoot(document.getElementById('root'))
})
after(async () => { await act(async () => root.unmount()); await server.close(); dom.window.close() })
const render = props => act(async () => root.render(createElement(Keyboard, props)))
const key = code => document.querySelector(`[data-code="${code}"]`)
const dispatch = (type, code, extra = {}) => act(async () => window.dispatchEvent(new window.KeyboardEvent(type, { code, bubbles: true, cancelable: true, ...extra })))

test('layout preserves all 78 source keys, unique codes, platform labels and click semantics', async () => {
  assert.equal(layout.flat().length, 78)
  assert.equal(new Set(layout.flat().map(key => key.code)).size, 78)
  const clicked = []
  await render({ platform: 'mac', activeKeys: ['MetaLeft', 'KeyK'], onKeyClick: code => clicked.push(code), className: 'custom' })
  assert.equal(document.querySelectorAll('button').length, 78)
  assert.equal(key('MetaLeft').textContent, '⌘')
  assert.equal(key('MetaRight').textContent, '⌘')
  assert.equal(key('Enter').textContent, 'return')
  assert.equal(key('KeyK').getAttribute('aria-pressed'), 'true')
  await act(async () => key('KeyK').click())
  assert.deepEqual(clicked, ['KeyK'])
  await render({ platform: 'windows' })
  assert.equal(key('MetaLeft').textContent, 'Win')
  assert.equal(key('Enter').textContent, 'enter')
})

test('simultaneous physical presses, repeats, blur and keyup preserve external highlights and native events', async () => {
  const down = [], up = []
  const props = { listenToKeyboard: true, activeKeys: ['KeyK'], onKeyDown: code => down.push(code), onKeyUp: code => up.push(code) }
  await render(props)
  await dispatch('keydown', 'ShiftLeft')
  await dispatch('keydown', 'KeyA')
  await dispatch('keydown', 'KeyA', { repeat: true })
  assert.deepEqual(down, ['ShiftLeft', 'KeyA'])
  assert.ok(key('ShiftLeft').dataset.physical)
  assert.ok(key('KeyA').dataset.physical)
  const event = new window.KeyboardEvent('keydown', { code: 'KeyB', cancelable: true })
  await act(async () => window.dispatchEvent(event))
  assert.equal(event.defaultPrevented, false)
  await dispatch('keyup', 'KeyA')
  assert.deepEqual(up, ['KeyA'])
  assert.equal(key('KeyA').dataset.physical, undefined)
  await act(async () => window.dispatchEvent(new window.Event('blur')))
  assert.equal(key('ShiftLeft').dataset.physical, undefined)
  assert.equal(key('KeyK').getAttribute('aria-pressed'), 'true')
  await dispatch('keydown', 'Fn')
  assert.equal(key('Fn').dataset.physical, undefined)
  await dispatch('keydown', 'KeyC')
  await render({ ...props, listenToKeyboard: false })
  await render(props)
  assert.equal(key('KeyC').dataset.physical, undefined)
})

test('display mode, custom layout, translations and unmount cleanup', async () => {
  await act(async () => i18n.changeLanguage('zh-CN'))
  await render({ interactive: false, activeKeys: ['KeyK'] })
  assert.equal(document.querySelectorAll('button').length, 0)
  assert.match(key('KeyK').getAttribute('aria-label'), /已高亮/)
  await render({ layout: [[{ code: 'KeyA', label: 'A', units: 1 }]] })
  assert.equal(document.querySelectorAll('button').length, 1)
  let calls = 0
  await render({ listenToKeyboard: true, onKeyDown: () => calls++ })
  await act(async () => root.render(null))
  await dispatch('keydown', 'KeyA')
  assert.equal(calls, 0)
})

test('existing theme hook supports light, dark, restored system following and system changes', async () => {
  let dark = true
  const listeners = new Set()
  globalThis.matchMedia = () => ({ matches: dark, addEventListener: (_, callback) => listeners.add(callback), removeEventListener: (_, callback) => listeners.delete(callback) })
  let theme
  function Harness() { theme = useTheme(); return null }
  localStorage.removeItem('web-box-theme')
  await act(async () => root.render(createElement(Harness)))
  assert.equal(document.documentElement.dataset.theme, 'dark')
  assert.equal(theme.followsSystem, true)
  await act(async () => theme.toggleTheme())
  assert.equal(document.documentElement.dataset.theme, 'light')
  assert.equal(localStorage.getItem('web-box-theme'), 'light')
  await act(async () => theme.toggleTheme())
  assert.equal(document.documentElement.dataset.theme, 'dark')
  await act(async () => theme.followSystemTheme())
  assert.equal(localStorage.getItem('web-box-theme'), null)
  await act(async () => { dark = false; for (const listener of listeners) listener() })
  assert.equal(document.documentElement.dataset.theme, 'light')
  assert.equal(theme.followsSystem, true)
  await act(async () => root.render(null))
  assert.equal(listeners.size, 0)
})
