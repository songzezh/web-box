import { useEffect, useId, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { applications } from './applications'
import type { ApplicationId } from './applications'

/**
 * 受控应用选择器；selected 标识当前应用，onSelect 通知父级切换。
 * 桌面使用侧栏，移动端使用原生 dialog；切换到桌面时关闭抽屉并将焦点移到当前应用按钮。
 */
export function ApplicationSidebar({ selected, onSelect }: { selected: ApplicationId; onSelect: (id: ApplicationId) => void }) {
  const { t } = useTranslation('tools')
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const id = useId()

  useEffect(() => {
    if (!window.matchMedia) return
    const media = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => {
      if (media.matches && dialog.current?.open) {
        dialog.current.close()
        document.getElementById(`${id}-desktop`)?.querySelector<HTMLButtonElement>('[aria-current="true"]')?.focus()
      }
    }
    media.addEventListener('change', closeOnDesktop)
    return () => media.removeEventListener('change', closeOnDesktop)
  }, [id])

  function close() {
    dialog.current?.close()
    trigger.current?.focus()
  }

  function list(mobile = false) {
    return <nav aria-label={t('shortcuts.applications')} className="application-list">
      {applications.map(({ id, nameKey, icon: Icon }) => <button type="button" key={id} aria-current={selected === id ? 'true' : undefined} title={t(nameKey)} onClick={() => { onSelect(id); if (mobile) close() }}>
        <Icon size={18} aria-hidden="true" /><span>{t(nameKey)}</span>
      </button>)}
    </nav>
  }

  return <>
    <aside className="application-sidebar" id={`${id}-desktop`}>
      <h2>{t('shortcuts.applications')}</h2>
      {list()}
    </aside>
    <button ref={trigger} type="button" className="application-trigger" aria-haspopup="dialog" aria-controls={id} onClick={() => {
      dialog.current?.showModal()
      dialog.current?.querySelector<HTMLButtonElement>('[aria-current="true"]')?.focus()
    }}><Menu size={18} aria-hidden="true" />{t('shortcuts.applications')}</button>
    <dialog ref={dialog} id={id} className="application-drawer" aria-labelledby={`${id}-title`} onClick={event => { if (event.target === event.currentTarget) close() }} onCancel={event => { event.preventDefault(); close() }}>
      <div className="application-drawer-panel">
        <header><h2 id={`${id}-title`}>{t('shortcuts.applications')}</h2><button type="button" onClick={close} aria-label={t('cheatsheet.close')}><X size={20} aria-hidden="true" /></button></header>
        {list(true)}
      </div>
    </dialog>
  </>
}
