import { Keyboard, Terminal } from 'lucide-react'

/**
 * 应用侧栏的唯一数据源；ID 同时约束父级 State，nameKey 指向 tools namespace。
 */
export const applications = [
  { id: 'general', nameKey: 'shortcuts.general', icon: Keyboard },
  { id: 'vim', nameKey: 'shortcuts.vim', icon: Terminal },
] as const

export type ApplicationId = typeof applications[number]['id']
/**
 * 返回已登记应用的标题键；参数受 ApplicationId 限制，调用方应保证运行时 ID 同样有效。
 */
export const applicationNameKey = (id: ApplicationId) => applications.find(app => app.id === id)!.nameKey

