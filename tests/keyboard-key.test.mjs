import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'
import { createServer } from 'vite'
import { createElement, act } from 'react'
import { createRoot } from 'react-dom/client'

let dom, server, root, KeyboardKey
before(async () => {
  dom = new JSDOM('<div id="root"></div>')
  for (const name of ['window', 'document', 'Node', 'HTMLElement']) globalThis[name] = dom.window[name]
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
  KeyboardKey = (await server.ssrLoadModule('/src/components/keyboard/index.ts')).KeyboardKey
  root = createRoot(document.getElementById('root'))
})
after(async () => { await act(async () => root.unmount()); await server.close(); dom.window.close() })
const render = props => act(async () => root.render(createElement(KeyboardKey, props)))

test('key content, optional decorative icon, width and native button behavior', async () => {
  let clicks = 0
  await render({ keyCode: 'Digit1', label: '1', secondaryLabel: '!', width: 64, onClick: () => clicks++ })
  const button = document.querySelector('button')
  assert.equal(button.type, 'button')
  assert.equal(button.dataset.keyCode, 'Digit1')
  assert.equal(button.style.getPropertyValue('--keyboard-key-width'), '64px')
  assert.equal(button.getAttribute('aria-label'), '1, !')
  assert.equal(button.querySelector('.keyboard-key__secondary').textContent, '!')
  await act(async () => button.click())
  assert.equal(clicks, 1)
  await render({ keyCode: 'MetaLeft', label: 'Cmd', size: 'wide', width: '25%', icon: createElement('svg'), 'aria-label': 'Command' })
  assert.equal(button.getAttribute('aria-label'), 'Command')
  assert.equal(button.style.getPropertyValue('--keyboard-key-width'), '25%')
  assert.equal(button.querySelector('.keyboard-key__icon').getAttribute('aria-hidden'), 'true')
})

test('disabled prop and state suppress clicks; pressed is controlled independently of hover', async () => {
  let clicks = 0
  for (const props of [{ state: 'disabled' }, { disabled: true, state: 'highlighted' }]) {
    await render({ keyCode: 'Enter', label: 'Enter', onClick: () => clicks++, ...props })
    const button = document.querySelector('button')
    assert.equal(button.disabled, true)
    await act(async () => button.click())
  }
  assert.equal(clicks, 0)
  await render({ keyCode: 'Enter', label: 'Enter', state: 'pressed' })
  assert.equal(document.querySelector('button').getAttribute('aria-pressed'), 'true')
  assert.ok(document.querySelector('button').classList.contains('keyboard-key--pressed'))
})

test('multiple highlighted keys and function labels remain independent; readonly legends do not activate', async () => {
  const labels = ['Esc', 'Tab', 'Caps Lock', 'Shift', 'Ctrl', 'Alt', 'Enter', 'Backspace', 'Space', 'Cmd', ...Array.from({ length: 12 }, (_, i) => `F${i + 1}`)]
  await act(async () => root.render(createElement('div', null, ...labels.map(label => createElement(KeyboardKey, { key: label, keyCode: label, label, state: 'highlighted', size: label === 'Space' ? 'space' : 'extra-wide' })))))
  assert.equal(document.querySelectorAll('button[aria-pressed="true"]').length, labels.length)
  let clicks = 0
  await render({ keyCode: 'KeyA', label: 'A', readOnly: true, onClick: () => clicks++ })
  assert.equal(document.querySelector('button'), null)
  const legend = document.querySelector('kbd')
  assert.equal(legend.tabIndex, -1)
  legend.click()
  assert.equal(clicks, 0)
})
