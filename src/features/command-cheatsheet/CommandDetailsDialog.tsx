import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import CommandCode from "./CommandCode";
import TerminalCard from "./TerminalCard";
import { commandCategories } from "./data";
import type { CommandEntry } from "./types";

/**
 * 复用命令风险说明；safe 不显示，有 warning 时显示当前语言文本，否则使用通用谨慎提示。
 */
export function CommandRiskNotice({ entry }: { entry: CommandEntry }) {
  const { t, i18n } = useTranslation("tools");
  if (entry.risk === "safe" || !entry.risk) return null;
  const language = i18n.resolvedLanguage === "zh-CN" ? "zh" : "en";
  return <p className="command-warning">
    <strong>{t(entry.risk === "danger" ? "cheatsheet.danger" : "cheatsheet.caution")}</strong>
    {" — "}{entry.warning ? entry.warning[language] : t("cheatsheet.cautionNote")}
  </p>;
}

/**
 * 原生模态详情：entry 提供命令、可选参数与示例，trigger 用于关闭后恢复焦点，onClose 通知父级卸载。
 * 参数和示例仅在非空时显示；点击真正的背景区域、Escape 或关闭按钮请求关闭。
 */
export default function CommandDetailsDialog({ entry, trigger, onClose }: {
  entry: CommandEntry;
  trigger: HTMLButtonElement;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation("tools");
  const language = i18n.resolvedLanguage === "zh-CN" ? "zh" : "en";
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  // 挂载时记录滚动与 body overflow、锁定背景并聚焦标题；清理时恢复，且只聚焦仍连接的触发元素。
  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    const previousOverflow = document.body.style.overflow;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    modal.showModal();
    document.body.style.overflow = "hidden";
    title.current?.focus({ preventScroll: true });
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      if (trigger.isConnected) trigger.focus({ preventScroll: true });
      if (window.scrollX !== scrollX || window.scrollY !== scrollY) window.scrollTo(scrollX, scrollY);
    };
  }, [trigger]);
  const category = commandCategories.find(item => item.id === entry.category);
  const codeLanguage = entry.id === "system-stop-win" ? "powershell" : "bash";
  return <dialog ref={dialog} className="command-dialog" aria-modal="true" aria-labelledby="command-dialog-title"
    aria-describedby="command-dialog-description"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClose={event => {
      // close() queues its event. StrictMode may already have reopened this
      // dialog after an effect cleanup, so ignore that stale close event.
      if (!event.currentTarget.open) onClose();
    }}
    onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
    }}>
    <header className="command-dialog-heading">
      <h2 id="command-dialog-title" ref={title} tabIndex={-1}>{entry.name[language]}</h2>
      <button className="command-dialog-close" type="button" aria-label={t("cheatsheet.close")} title={t("cheatsheet.close")} onClick={onClose}>
        <X size={20} aria-hidden="true" />
      </button>
    </header>
    <div className="command-dialog-body">
      <p className="eyebrow">{category?.name[language]}{category && " · "}{entry.platforms.map(platform => ({ linux: "Linux", macos: "macOS", windows: "Windows" })[platform]).join(" / ")}</p>
      <TerminalCard command={entry.command} language={codeLanguage} />
      <p id="command-dialog-description" className="command-description">{entry.description[language]}</p>
      {entry.parameters?.length ? <section aria-labelledby="command-parameters-title">
        <h3 id="command-parameters-title">{t("cheatsheet.parameters")}</h3>
        <dl className="command-parameters">{entry.parameters.map(parameter => <div key={parameter.name}>
          <dt><code>{parameter.name}</code></dt><dd>{parameter.description[language]}</dd>
        </div>)}</dl>
        {/<[a-z][a-z0-9-]*>/i.test(entry.command) && <p className="command-dialog-help">{t("cheatsheet.placeholder")}</p>}
      </section> : null}
      {entry.examples?.length ? <section aria-labelledby="command-examples-title">
        <h3 id="command-examples-title">{t("cheatsheet.examples")}</h3>
        {entry.examples.map(example => <div className="command-example" key={example.command}>
          <p>{example.description[language]}</p><CommandCode command={example.command} variant="expanded" highlight language={codeLanguage} />
        </div>)}
      </section> : null}
      <CommandRiskNotice entry={entry} />
    </div>
  </dialog>;
}
