import { useTranslation } from "react-i18next";
import CommandCode from "./CommandCode";

// Presentation only: the shell label is a code-display identifier, not execution.
export default function TerminalCard({ command }: { command: string }) {
  const { t } = useTranslation("tools");
  return <section className="terminal-card" aria-label={t("cheatsheet.command")}>
    <div className="terminal-header">
      <div className="terminal-dots" aria-hidden="true">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
      </div>
      <span className="terminal-shell">bash</span>
    </div>
    <CommandCode command={command} prompt />
  </section>;
}
