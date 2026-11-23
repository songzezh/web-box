import { useTranslation } from "react-i18next";
import CommandCode from "./CommandCode";
import type { CommandLanguage } from "./command-highlight";

// Presentation only: the shell label is a code-display identifier, not execution.
/**
 * 详情页的终端展示壳；command 只用于显示和复制，language 默认 bash，JSON 不显示提示符。
 */
export default function TerminalCard({ command, language = "bash" }: { command: string; language?: CommandLanguage }) {
  const { t } = useTranslation("tools");
  return <section className="terminal-card" aria-label={t("cheatsheet.command")}>
    <CommandCode command={command} variant="expanded" prompt={language !== "json"} highlight language={language} />
  </section>;
}
