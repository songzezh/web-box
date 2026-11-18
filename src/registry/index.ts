export type CategoryIcon = 'text' | 'data' | 'convert' | 'security' | 'time' | 'code' | 'image'
export type ToolStatus = 'available' | 'coming-soon'
export interface ToolCategory { id: string; name: string; shortName: string; description: string; order: number; plannedToolCount: number; icon: CategoryIcon }
export interface ToolDefinition { id: string; name: string; description: string; categoryId: string; path: string; status: ToolStatus; tags: string[] }
export interface ExternalResource { id: string; name: string; description: string; category: string; url: string }

export const categories = ([
  { id: 'text-content', name: 'Text & Content', description: 'Make everyday words easier to work with.', shortName: 'Text', order: 1, plannedToolCount: 8, icon: 'text' },
  { id: 'data-format', name: 'Data & Format', description: 'Bring structure and clarity to your data.', shortName: 'Data', order: 2, plannedToolCount: 9, icon: 'data' },
  { id: 'encode-convert', name: 'Encode & Convert', description: 'Move between encodings and formats.', shortName: 'Encode', order: 3, plannedToolCount: 10, icon: 'convert' },
  { id: 'security-random', name: 'Security & Random', description: 'Generate random values for everyday tasks.', shortName: 'Security', order: 4, plannedToolCount: 10, icon: 'security' },
  { id: 'time-schedule', name: 'Time & Schedule', description: 'Work with dates, durations, and timestamps.', shortName: 'Time', order: 5, plannedToolCount: 8, icon: 'time' },
  { id: 'dev-test', name: 'Development & Test', description: 'Small utilities for your development workflow.', shortName: 'Dev', order: 6, plannedToolCount: 6, icon: 'code' },
  { id: 'image-design', name: 'Image & Design', description: 'Practical helpers for images and color.', shortName: 'Image', order: 7, plannedToolCount: 9, icon: 'image' },
] satisfies ToolCategory[]).sort((a, b) => a.order - b.order)

// Initial examples come from the repository README; this is not the full planned catalog.
export const tools: ToolDefinition[] = [
  { id: 'text-statistics', name: 'Text statistics', description: 'Count characters and words in a piece of text.', categoryId: 'text-content', path: '/tools/text-statistics', status: 'coming-soon', tags: ['text'] },
  { id: 'json-formatter', name: 'JSON formatter', description: 'Format structured JSON for easier reading.', categoryId: 'data-format', path: '/tools/json-formatter', status: 'coming-soon', tags: ['json'] },
  { id: 'base64', name: 'Base64 encode / decode', description: 'Convert text to and from Base64 encoding.', categoryId: 'encode-convert', path: '/tools/base64', status: 'coming-soon', tags: ['encoding'] },
  { id: 'password-generator', name: 'Random password generator', description: 'Generate random passwords in your browser.', categoryId: 'security-random', path: '/tools/password-generator', status: 'coming-soon', tags: ['random'] },
  { id: 'unix-timestamp', name: 'Unix timestamp converter', description: 'Convert between Unix timestamps and dates.', categoryId: 'time-schedule', path: '/tools/unix-timestamp', status: 'coming-soon', tags: ['time'] },
  { id: 'regex-tester', name: 'Regular expression tester', description: 'Explore patterns and test text matches.', categoryId: 'dev-test', path: '/tools/regex-tester', status: 'coming-soon', tags: ['development'] },
  { id: 'color-converter', name: 'Color converter', description: 'Convert color values between common formats.', categoryId: 'image-design', path: '/tools/color-converter', status: 'coming-soon', tags: ['color'] },
]
// Official resource addresses checked on 2026-11-18; see docs/resources.md.
export const resources: ExternalResource[] = [
  { id: 'mdn', name: 'MDN Web Docs', description: 'Reference and guides for HTML, CSS, JavaScript, and Web APIs.', category: 'Documentation', url: 'https://developer.mozilla.org/en-US/' },
  { id: 'caniuse', name: 'Can I use', description: 'Browser support tables for web platform features.', category: 'Compatibility', url: 'https://caniuse.com/' },
  { id: 'regex101', name: 'regex101', description: 'Build, test, and explain regular expressions.', category: 'Development', url: 'https://regex101.com/' },
  { id: 'jsonlint', name: 'JSONLint', description: 'Validate and format JSON documents.', category: 'Data', url: 'https://jsonlint.com/' },
  { id: 'cyberchef', name: 'CyberChef', description: 'Explore recipes for encoding and data transformations.', category: 'Conversion', url: 'https://gchq.github.io/CyberChef/' },
  { id: 'squoosh', name: 'Squoosh', description: 'Compress images and compare output settings.', category: 'Images', url: 'https://squoosh.app/' },
  { id: 'svgomg', name: 'SVGOMG', description: 'Optimize SVG markup with a visual interface for SVGO.', category: 'Images', url: 'https://jakearchibald.github.io/svgomg/' },
  { id: 'photopea', name: 'Photopea', description: 'Edit images with a browser-based photo editor.', category: 'Design', url: 'https://www.photopea.com/' },
  { id: 'excalidraw', name: 'Excalidraw', description: 'Sketch diagrams on a hand-drawn-style whiteboard.', category: 'Design', url: 'https://excalidraw.com/' },
]
export const projectUrl = 'https://github.com/songzezh/web-box'
export function validateRegistry(cs: ToolCategory[], ts: ToolDefinition[], rs: ExternalResource[]) {
  const unique = (values: string[], label: string) => { if (new Set(values).size !== values.length) throw new Error(`Duplicate ${label}`) }
  unique(cs.map(c => c.id), 'category ID')
  unique(cs.map(c => String(c.order)), 'category order')
  unique(ts.map(t => t.id), 'tool ID')
  unique(ts.map(t => t.path), 'tool path')
  unique(rs.map(r => r.id), 'resource ID')
  for (const c of cs) {
    if (!Number.isInteger(c.plannedToolCount) || c.plannedToolCount < 0) throw new Error('Invalid planned tool count: ' + c.id)
  }
  for (const t of ts) {
    if (!cs.some(c => c.id === t.categoryId)) throw new Error(`Invalid category: ${t.categoryId}`)
    if (t.path !== `/tools/${t.id}`) throw new Error(`Invalid tool path: ${t.path}`)
    if (!['available', 'coming-soon'].includes(t.status)) throw new Error(`Invalid status: ${t.id}`)
  }
  for (const r of rs) {
    const url = new URL(r.url)
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error(`Invalid resource URL: ${r.id}`)
  }
}
validateRegistry(categories, tools, resources)
export const getToolsByCategory = (id: string) => tools.filter(t => t.categoryId === id)
export const getToolById = (id: string) => tools.find(t => t.id === id)
export const getCategoryById = (id: string) => categories.find(c => c.id === id)
export const getCategoryPath = (id: string) => '/' + encodeURIComponent(id)
export const statistics = { planned: categories.reduce((total, category) => total + category.plannedToolCount, 0), categories: categories.length, registered: tools.length, available: tools.filter(t => t.status === 'available').length, resources: resources.length }
