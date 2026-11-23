import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Check, Copy } from "lucide-react";
import { copyCommand } from "./filter";
import { lazy, Suspense } from "react";
import type { CommandLanguage } from "./command-highlight";

// 按需加载高亮组件；模块加载失败或 Suspense 等待时均保留原始命令文本。
const HighlightedCommand = lazy(() => import("./HighlightedCommand").catch(() => ({
  default: ({ code }: { code: string; language: CommandLanguage }) => code,
})));

/**
 * 终端代码展示 Props；command 是复制原文，actions 为可选附加操作。
 */
interface CommandCodeProps {
  /** 需要展示并原样复制的命令文本。 */
  command: string;
  /** 可选附加操作区域；省略时只显示复制按钮。 */
  actions?: ReactNode;
  /** 默认 false；开启后显示语言对应提示符，JSON 始终不显示。 */
  prompt?: boolean;
  /** 默认 false；开启后异步加载高亮，失败保留原文。 */
  highlight?: boolean;
  /** 默认 bash；也支持 shell、powershell 和 json。 */
  language?: CommandLanguage;
  /** 默认 default；compact 用于列表，expanded 用于详情。 */
  variant?: "compact" | "default" | "expanded";
}

/**
 * Terminal UI design reference:
 * From Uiverse.io by Yaya12085
 * https://uiverse.io/Yaya12085
 */
/**
 * 共享命令展示与复制反馈组件；prompt 与 highlight 默认 false，language 默认 bash，variant 默认 default。
 * 复制只写 command，成功提示两秒后清除，失败提示保留到再次复制；不执行任何命令。
 */
export default function CommandCode({ command, actions, prompt = false, highlight = false, language = "bash", variant = "default" }: CommandCodeProps) {
  const { t } = useTranslation("tools");
  const [feedback, setFeedback] = useState<"copied" | "failed" | null>(null);
  // Ref 保存计时器、挂载状态和复制互斥标记，不参与渲染；卸载后不再写入反馈 State。
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(false);
  const copying = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; clearTimeout(timer.current); };
  }, []);
  // 忽略尚未完成时的重复复制；finally 始终释放标记，卸载时清除待执行计时器。
  const copy = async () => {
    if (copying.current) return;
    copying.current = true;
    clearTimeout(timer.current);
    setFeedback(null);
    try {
      await copyCommand(command, navigator.clipboard);
      if (!mounted.current) return;
      setFeedback("copied");
      timer.current = setTimeout(() => setFeedback(null), 2000);
    } catch {
      if (mounted.current) setFeedback("failed");
    } finally {
      copying.current = false;
    }
  };
  const label = t(feedback === "copied" ? "cheatsheet.copied" : "cheatsheet.copyCommand");
  return <>
    <div className={`command-code command-code--${variant}`}>
      <div className="command-terminal-header">
        <div className="terminal-dots" aria-hidden="true">
          <span className="terminal-dot terminal-dot-red" />
          <span className="terminal-dot terminal-dot-yellow" />
          <span className="terminal-dot terminal-dot-green" />
        </div>
        <span className="terminal-shell">{language}</span>
        <div className="command-actions">
          <button className="command-copy" data-copied={feedback === "copied" || undefined} type="button" onClick={copy} aria-label={`${label}: ${command}`} title={label}>
            {feedback === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          </button>
          {actions}
        </div>
      </div>
      <pre tabIndex={0} aria-label={t("cheatsheet.command")}>{prompt && language !== "json" && <span className="terminal-prompt" aria-hidden="true">{language === "powershell" ? "PS> " : "$ "}</span>}<code>{highlight ? <Suspense fallback={command}><HighlightedCommand code={command} language={language} /></Suspense> : command}</code></pre>
    </div>
    <span className="sr-only" role="status">{feedback === "copied" ? t("cheatsheet.copied") : ""}</span>
    {feedback === "failed" && <p className="command-warning" role="alert">{t("cheatsheet.failed")}</p>}
  </>;
}
