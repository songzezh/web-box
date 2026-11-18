import test from 'node:test'
import assert from 'node:assert/strict'
import { categories, tools, resources, statistics, validateRegistry, getToolById, getToolsByCategory } from '../src/registry/index.ts'

test('catalog counts reflect actual metadata and availability', () => {
  assert.equal(statistics.categories, 7)
  assert.equal(statistics.registered, tools.length)
  assert.equal(statistics.available, 0)
  assert.equal(statistics.resources, resources.length)
  assert.deepEqual(categories.map(c => c.order), [1, 2, 3, 4, 5, 6, 7])
  assert.equal(categories.flatMap(c => getToolsByCategory(c.id)).length, tools.length)
  assert.equal(getToolById(tools[0].id), tools[0])
  assert.equal(getToolById('missing'), undefined)
})
test('rejects duplicate IDs and paths', () => {
  assert.throws(() => validateRegistry(categories, [...tools, tools[0]], []), /Duplicate tool ID/)
  assert.throws(() => validateRegistry(categories, [...tools, { ...tools[0], id: 'other' }], []), /Duplicate tool path/)
  assert.throws(() => validateRegistry([...categories, categories[0]], [], []), /Duplicate category ID/)
})
test('rejects unknown categories and incorrect paths', () => {
  assert.throws(() => validateRegistry(categories, [{ ...tools[0], categoryId: 'missing' }], []), /Invalid category/)
  assert.throws(() => validateRegistry(categories, [{ ...tools[0], path: '//other.example' }], []), /Invalid tool path/)
})
test('external resources require HTTP/HTTPS without credentials and a known category', () => {
  const resource = { id: 'example', name: 'Example', description: 'Test fixture', categoryId: 'ext-dev', url: 'https://example.com' }
  assert.doesNotThrow(() => validateRegistry([], [], [resource]))
  assert.doesNotThrow(() => validateRegistry([], [], [{ ...resource, url: 'http://example.com' }]))
  assert.throws(() => validateRegistry([], [], [{ ...resource, categoryId: 'missing' }]), /Invalid resource category/)
  for (const url of ['ftp://example.com', 'javascript:alert(1)', 'invalid', 'https://user:secret@example.com']) {
    assert.throws(() => validateRegistry([], [], [{ ...resource, url }]))
  }
})

test('planned totals, category paths and filtering stay separate from availability', () => {
  assert.deepEqual(categories.map(c => c.plannedToolCount), [8, 9, 10, 10, 8, 6, 9])
  assert.equal(statistics.planned, 60)
  for (const category of categories) {
    assert.ok(getToolsByCategory(category.id).every(tool => tool.categoryId === category.id))
  }
  assert.deepEqual(getToolsByCategory('missing'), [])
  assert.throws(() => validateRegistry([{ ...categories[0], plannedToolCount: -1 }], [], []), /Invalid planned tool count/)
})
