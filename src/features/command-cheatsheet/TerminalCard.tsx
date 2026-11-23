import { useTranslation } from "react-i18next";
import CommandCode from "./CommandCode";
import type { CommandLanguage } from "./command-highlight";

// Presentation only: the shell label is a code-display identifier, not execution.
export default function TerminalCard({ command, language = "bash" }: { command: string; language?: CommandLanguage }) {
  const { t } = useTranslation("tools");
  return <section className="terminal-card" aria-label={t("cheatsheet.command")}>
    <CommandCode command={command} variant="expanded" prompt={language !== "json"} highlight language={language} />
  </section>;
}
