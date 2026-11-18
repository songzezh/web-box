import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'
import { createServer } from 'vite'
import { createElement, act } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { readLanguage, persistLanguage } from '../src/i18n/config.ts'

let server, i18n, App, registry, root, dom
before(async () => {
  dom = new JSDOM('<html><head><meta name="description"></head><body><div id="root"></div></body></html>', { url: 'https://example.com/web-box/#/resources/ext-dev' })
  for (const name of ['window', 'document', 'Node', 'HTMLElement', 'localStorage']) globalThis[name] = dom.window[name]
  Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true })
  Object.defineProperty(navigator, 'language', { value: 'zh-CN', configurable: true })
  Object.defineProperty(navigator, 'languages', { value: ['zh-CN'], configurable: true })
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  globalThis.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} })
  window.scrollTo = () => {}
  server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
  i18n = (await server.ssrLoadModule('/src/i18n/index.ts')).default
  App = (await server.ssrLoadModule('/src/App.tsx')).default
  registry = await server.ssrLoadModule('/src/registry/index.ts')
  root = createRoot(document.getElementById('root'))
})
after(async () => {
  if (root) await act(async () => root.unmount())
  await server?.close()
  dom?.window.close()
})
const mount = () => act(async () => root.render(createElement(HashRouter, null, createElement(App))))
const click = element => act(async () => element.click())
const trigger = () => document.querySelector('.language-toggle')

test('language initialization only accepts explicit saved languages and tolerates restricted storage', () => {
  for (const [saved, expected] of [[null, 'en'], ['en', 'en'], ['zh-CN', 'zh-CN'], ['zh', 'en'], ['fr', 'en'], ['', 'en']]) {
    assert.equal(readLanguage({ getItem: () => saved }), expected)
  }
  assert.equal(readLanguage({ getItem() { throw Error('restricted') } }), 'en')
  assert.doesNotThrow(() => persistLanguage('zh-CN', { setItem() { throw Error('restricted') } }))
  assert.equal(i18n.language, 'en') // Browser reports Chinese; first visit remains English.
})

test('all catalog entries have English and Chinese copy; counts interpolate and Chinese falls back to English', async () => {
  const namespaces = ['common', 'navigation', 'categories', 'resources', 'tools']
  for (const ns of namespaces) {
    const en = JSON.parse(readFileSync(`src/i18n/resources/en/${ns}.json`, 'utf8'))
    const zh = JSON.parse(readFileSync(`src/i18n/resources/zh-CN/${ns}.json`, 'utf8'))
    const normalized = values => [...new Set(Object.keys(values).map(key => key.replace(/_(one|other)$/, '')))].sort()
    assert.deepEqual(normalized(en), normalized(zh), ns)
    for (const value of [...Object.values(en), ...Object.values(zh)]) assert.ok(value.trim())
  }
  for (const language of ['en', 'zh-CN']) {
    await i18n.changeLanguage(language)
    for (const category of registry.categories) for (const field of ['name', 'description', 'shortName']) assert.ok(i18n.exists(`categories:${category.id}.${field}`, { lng: language, fallbackLng: false }))
    for (const category of registry.externalResourceCategories) for (const field of ['name', 'description']) assert.ok(i18n.exists(`resources:${category.id}.${field}`, { lng: language, fallbackLng: false }))
    for (const resource of registry.resources) assert.ok(i18n.exists(`resources:items.${resource.id}.description`, { lng: language, fallbackLng: false }))
  }
  assert.equal(i18n.t('resources:resourceCount', { count: 9 }), '9 个资源')
  delete i18n.getResourceBundle('zh-CN', 'common').openTool
  assert.equal(i18n.t('common:openTool'), 'Open tool')
  i18n.addResource('zh-CN', 'common', 'openTool', '打开工具')
  await i18n.changeLanguage('en')
  assert.equal(i18n.t('resources:resourceCount', { count: 1 }), '1 resource')
  assert.equal(i18n.t('resources:resourceCount', { count: 2 }), '2 resources')
})

test('direct language toggle updates live content and metadata without changing URL, focus, theme or unrelated storage', async () => {
  localStorage.setItem('web-box-theme', 'light')
  localStorage.setItem('web-box:favorites', '["json-formatter"]')
  localStorage.setItem('web-box:recent', '["base64"]')
  await mount()
  const originalUrl = window.location.href
  const main = document.getElementById('main-content')
  assert.equal(document.querySelector('h1').textContent, 'Development & Engineering')
  assert.equal(trigger().textContent, '')
  assert.equal(trigger().title, 'Switch to Chinese')
  assert.equal(trigger().getAttribute('aria-label'), 'Switch to Chinese')
  assert.equal(trigger().getAttribute('aria-haspopup'), null)
  assert.equal(trigger().getAttribute('type'), 'button')
  assert.equal(trigger().tabIndex, 0)
  trigger().focus()
  await click(trigger())
  assert.equal(trigger().textContent, '')
  assert.equal(trigger().title, '切换为英文')
  assert.equal(trigger().getAttribute('aria-label'), '切换为英文')
  assert.equal(document.querySelector('[role="menu"]'), null)
  assert.equal(document.querySelector('h1').textContent, '开发与工程')
  assert.equal(document.title, '开发与工程 — Web Box')
  assert.equal(document.documentElement.lang, 'zh-CN')
  assert.match(document.querySelector('meta[name="description"]').content, /隐私/)
  assert.equal(localStorage.getItem('web-box:language'), 'zh-CN')
  assert.equal(readLanguage(), 'zh-CN') // Same saved preference is used on future startup.
  assert.equal(window.location.href, originalUrl)
  assert.equal(document.getElementById('main-content'), main)
  assert.equal(document.activeElement, trigger())
  assert.equal(document.documentElement.dataset.theme, 'light')
  await click(document.querySelector('.language-switcher + .theme-toggle'))
  assert.equal(document.documentElement.dataset.theme, 'dark')
  assert.equal(i18n.language, 'zh-CN')
  await click(trigger())
  assert.equal(trigger().textContent, '')
  assert.equal(trigger().title, 'Switch to Chinese')
  assert.equal(trigger().getAttribute('aria-label'), 'Switch to Chinese')
  assert.equal(localStorage.getItem('web-box:language'), 'en')
  assert.equal(document.querySelector('h1').textContent, 'Development & Engineering')
  assert.equal(document.documentElement.lang, 'en')
  assert.equal(document.documentElement.dataset.theme, 'dark')
  assert.equal(localStorage.getItem('web-box:favorites'), '["json-formatter"]')
  assert.equal(localStorage.getItem('web-box:recent'), '["base64"]')
  assert.equal(document.querySelector('[role="menu"]'), null)
  assert.equal(document.activeElement, trigger())
})

test('both languages cover existing routes, resource empty states and local tools', async () => {
  for (const language of ['zh-CN', 'en']) {
    await act(async () => i18n.changeLanguage(language))
    const paths = ['/', ...registry.categories.map(c => registry.getCategoryPath(c.id)), ...registry.tools.map(t => t.path), '/resources', ...registry.externalResourceCategories.map(c => registry.getResourceCategoryPath(c.id)), '/about', '/privacy', '/not-a-page']
    for (const path of paths) {
      await act(async () => { window.location.hash = `#${path}`; await new Promise(resolve => window.setTimeout(resolve, 0)) })
      assert.equal(document.documentElement.lang, language)
      assert.doesNotMatch(document.getElementById('main-content').textContent, /(?:common|resources|categories|tools|navigation):/)
      assert.ok(document.querySelector('h1').textContent.trim())
      if (path === '/resources/ext-security') assert.match(document.getElementById('main-content').textContent, language === 'en' ? /No resources yet/ : /暂无外部资源/)
      if (path === '/not-a-page') assert.equal(document.querySelector('h1').textContent, language === 'en' ? 'Page not found.' : '找不到页面。')
    }
  }
})
