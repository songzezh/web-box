import { Keyboard, Terminal } from 'lucide-react'

export const applications = [
  { id: 'general', nameKey: 'shortcuts.general', icon: Keyboard },
  { id: 'vim', nameKey: 'shortcuts.vim', icon: Terminal },
] as const

export type ApplicationId = typeof applications[number]['id']
export const applicationNameKey = (id: ApplicationId) => applications.find(app => app.id === id)!.nameKey

