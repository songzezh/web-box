import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Check, Copy } from "lucide-react";
import { copyCommand } from "./filter";

export default function CommandCode({ command, actions }: { command: string; actions?: ReactNode }) {
  const { t } = useTranslation("tools");
  const [feedback, setFeedback] = useState<"copied" | "failed" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    clearTimeout(timer.current);
    try {
      await copyCommand(command, navigator.clipboard);
      setFeedback("copied");
      timer.current = setTimeout(() => setFeedback(null), 2000);
    } catch {
      setFeedback("failed");
    }
  };
  const label = t(feedback === "copied" ? "cheatsheet.copied" : "cheatsheet.copyCommand");
  return <>
    <div className="command-code">
      <pre><code>{command}</code></pre>
      <div className="command-actions">
        <button className="command-copy" type="button" onClick={copy} aria-label={`${label}: ${command}`} title={label}>
          {feedback === "copied" ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
        </button>
        {actions}
      </div>
    </div>
    <span className="sr-only" role="status">{feedback === "copied" ? t("cheatsheet.copied") : ""}</span>
    {feedback === "failed" && <p className="command-warning" role="alert">{t("cheatsheet.failed")}</p>}
  </>;
}
