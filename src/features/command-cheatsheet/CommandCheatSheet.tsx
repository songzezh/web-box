import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Info, Star, X } from "lucide-react";
import { ToolPageLayout } from "../../components/Tools";
import { useToolActivity } from "../../hooks/useToolActivity";
import { commandCategories, commands } from "./data";
import { filterCommands, shouldFocusSearch } from "./filter";
import type { CommandEntry } from "./types";
import CommandCode from "./CommandCode";
import CommandDetailsDialog, { CommandRiskNotice } from "./CommandDetailsDialog";
import "./commands.css";

function CommandRow({ entry, onDetails }: { entry: CommandEntry; onDetails: (entry: CommandEntry, trigger: HTMLButtonElement) => void }) {
  const { t, i18n } = useTranslation("tools");
  const language = i18n.resolvedLanguage === "zh-CN" ? "zh" : "en";
  return <article className="command-row">
    <div className="command-heading"><h3>{entry.name[language]}</h3></div>
    <CommandCode command={entry.command} variant="compact" highlight
      language={entry.id === "system-stop-win" ? "powershell" : "bash"} actions={
      <button className="command-details-trigger" type="button" aria-haspopup="dialog"
        aria-label={`${t("cheatsheet.details")}: ${entry.name[language]}`} title={t("cheatsheet.details")}
        onClick={event => onDetails(entry, event.currentTarget)}>
        <Info size={18} aria-hidden="true" />
      </button>
    } />
    <p>{entry.description[language]}</p>
    <CommandRiskNotice entry={entry} />
  </article>;
}

export default function CommandCheatSheet() {
  const { t, i18n } = useTranslation("tools");
  const language = i18n.resolvedLanguage === "zh-CN" ? "zh" : "en";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(commandCategories[0].id);
  const [selection, setSelection] = useState<{ entry: CommandEntry; trigger: HTMLButtonElement } | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const activity = useToolActivity("command-cheatsheet", true);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!selection && shouldFocusSearch(event, event.target instanceof Element ? event.target : null)) {
        event.preventDefault();
        input.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selection]);
  const results = filterCommands(commands, query, category);
  const categoryOptions = commandCategories.map(item => ({
      id: item.id,
      name: item.name[language],
      count: commands.filter(entry => entry.category === item.id).length,
  }));
  return (
    <div className="command-page">
      <ToolPageLayout
        title={t("command-cheatsheet.name")}
        description={t("command-cheatsheet.description")}
      >
        <div className="command-sheet command-layout">
          <div className="command-content">
            <label htmlFor="command-search">{t("cheatsheet.search")}</label>
            <div className="command-search">
              <input
                id="command-search"
                ref={input}
                type="search"
                placeholder={t("cheatsheet.search")}
                value={query}
                onChange={event => setQuery(event.target.value)}
                aria-keyshortcuts="/"
              />
              <button
                className="command-clear"
                type="button"
                aria-label={t("cheatsheet.clear")}
                title={t("cheatsheet.clear")}
                disabled={!query}
                onClick={() => { setQuery(""); input.current?.focus(); }}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="command-mobile-categories">
              <label htmlFor="command-category-select">{t("cheatsheet.categories")}</label>
              <select id="command-category-select" value={category} onChange={event => setCategory(event.target.value)}>
                {categoryOptions.map(item => (
                  <option key={item.id} value={item.id}>{item.name} ({item.count})</option>
                ))}
              </select>
            </div>
            <div className="command-results-bar">
              <p className="command-count" role="status">{t("cheatsheet.count", { count: results.length })}</p>
              <button
                className="command-favorite"
                type="button"
                aria-pressed={activity.favorite}
                aria-label={t(activity.favorite ? "cheatsheet.unfavorite" : "cheatsheet.favorite")}
                title={t(activity.favorite ? "cheatsheet.unfavorite" : "cheatsheet.favorite")}
                onClick={activity.toggleFavorite}
              >
                <Star size={16} fill={activity.favorite ? "currentColor" : "none"} aria-hidden="true" />
              </button>
            </div>
            {!results.length && (
              <div className="empty-state">
                <div>
                  <h2>{t("cheatsheet.empty")}</h2>
                  <p>{t("cheatsheet.emptyHelp")}</p>
                </div>
              </div>
            )}
            {commandCategories.map(item => {
              const entries = results.filter(entry => entry.category === item.id);
              return entries.length ? (
                <section className="command-group" key={item.id} aria-labelledby={`commands-${item.id}`}>
                  <div className="sr-only">
                    <h2 id={`commands-${item.id}`}>{item.name[language]}</h2>
                    <span>{t("cheatsheet.count", { count: entries.length })}</span>
                  </div>
                  {entries.map(entry => <CommandRow key={entry.id} entry={entry} onDetails={(entry, trigger) => setSelection({ entry, trigger })} />)}
                </section>
              ) : null;
            })}
          </div>
          <aside className="command-sidebar" aria-labelledby="command-category-title">
            <h2 id="command-category-title">{t("cheatsheet.categories")}</h2>
            <nav className="command-category-list" aria-label={t("cheatsheet.categories")}>
              {categoryOptions.map(item => (
                <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>
                  <span>{item.name}</span><span>{item.count}</span>
                </button>
              ))}
            </nav>
          </aside>
          {selection && <CommandDetailsDialog key={selection.entry.id} entry={selection.entry} trigger={selection.trigger} onClose={() => setSelection(null)} />}
        </div>
      </ToolPageLayout>
    </div>
  );
}
