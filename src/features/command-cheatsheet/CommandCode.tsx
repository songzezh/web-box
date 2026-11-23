import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Check, Copy } from "lucide-react";
import { copyCommand } from "./filter";
import { lazy, Suspense } from "react";
import type { CommandLanguage } from "./command-highlight";

const HighlightedCommand = lazy(() => import("./HighlightedCommand").catch(() => ({
  default: ({ code }: { code: string; language: CommandLanguage }) => code,
})));

interface CommandCodeProps {
  command: string;
  actions?: ReactNode;
  prompt?: boolean;
  highlight?: boolean;
  language?: CommandLanguage;
  variant?: "compact" | "default" | "expanded";
}

/**
 * Terminal UI design reference:
 * From Uiverse.io by Yaya12085
 * https://uiverse.io/Yaya12085
 */
export default function CommandCode({ command, actions, prompt = false, highlight = false, language = "bash", variant = "default" }: CommandCodeProps) {
  const { t } = useTranslation("tools");
  const [feedback, setFeedback] = useState<"copied" | "failed" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(false);
  const copying = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; clearTimeout(timer.current); };
  }, []);
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
