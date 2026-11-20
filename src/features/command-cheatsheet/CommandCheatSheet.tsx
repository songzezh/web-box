import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown, Copy, Star, X } from "lucide-react";
import { ToolPageLayout } from "../../components/Tools";
import { useToolActivity } from "../../hooks/useToolActivity";
import { commandCategories, commands } from "./data";
import { copyCommand, filterCommands, shouldFocusSearch } from "./filter";
import type { CommandEntry, LocalizedText } from "./types";
import "./commands.css";

function CommandRow({ entry }: { entry: CommandEntry }) {
  const { t, i18n } = useTranslation("tools");
  const text = (value: LocalizedText) =>
    value[i18n.resolvedLanguage === "zh-CN" ? "zh" : "en"];
  const [feedback, setFeedback] = useState<"copied" | "failed" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    clearTimeout(timer.current);
    try {
      await copyCommand(entry.command, navigator.clipboard);
      setFeedback("copied");
      timer.current = setTimeout(() => setFeedback(null), 2000);
    } catch {
      setFeedback("failed");
    }
  };
  return (
    <article className="command-row">
      <div className="command-heading">
        <h3>{text(entry.name)}</h3>
      </div>
      <div className="command-code">
        <pre>
          <code>{entry.command}</code>
        </pre>
        <button
          type="button"
          onClick={copy}
          aria-label={`${t(feedback === "copied" ? "cheatsheet.copied" : "cheatsheet.copyCommand")}: ${entry.command}`}
          title={t(feedback === "copied" ? "cheatsheet.copied" : "cheatsheet.copyCommand")}
        >
          {feedback === "copied" ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <Copy size={18} aria-hidden="true" />
          )}
        </button>
      </div>
      <p>{text(entry.description)}</p>
      <span className="sr-only" role="status">
        {feedback === "copied" ? t("cheatsheet.copied") : ""}
      </span>
      {feedback === "failed" && (
        <p className="command-warning" role="alert">
          {t("cheatsheet.failed")}
        </p>
      )}
      {entry.risk !== "safe" && (
        <p className="command-warning">
          <strong>
            {t(
              entry.risk === "danger"
                ? "cheatsheet.danger"
                : "cheatsheet.caution",
            )}
          </strong>{" "}
          — {entry.warning ? text(entry.warning) : t("cheatsheet.cautionNote")}
        </p>
      )}
      {entry.parameters?.length || entry.examples?.length || entry.platforms.length < 3 ? (
        <details>
          <summary><ChevronDown size={16} aria-hidden="true" />{t("cheatsheet.details")}</summary>
          <div className="command-details">
        <span className="eyebrow">
          {entry.platforms
            .map(
              (platform) =>
                ({ linux: "Linux", macos: "macOS", windows: "Windows" })[
                  platform
                ],
            )
            .join(" / ")}
        </span>
            {entry.parameters && (
              <>
                <h4>{t("cheatsheet.parameters")}</h4>
                <dl>
                  {entry.parameters.map((parameter) => (
                    <div key={parameter.name}>
                      <dt>
                        <code>{parameter.name}</code>
                      </dt>
                      <dd>{text(parameter.description)}</dd>
                    </div>
                  ))}
                </dl>
                <p>{t("cheatsheet.placeholder")}</p>
              </>
            )}
            {entry.examples && (
              <>
                <h4>{t("cheatsheet.examples")}</h4>
                {entry.examples.map((example) => (
                  <div key={example.command}>
                    <pre>
                      <code>{example.command}</code>
                    </pre>
                    <p>{text(example.description)}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </details>
      ) : null}
    </article>
  );
}

export default function CommandCheatSheet() {
  const { t, i18n } = useTranslation("tools");
  const language = i18n.resolvedLanguage === "zh-CN" ? "zh" : "en";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const input = useRef<HTMLInputElement>(null);
  const activity = useToolActivity("command-cheatsheet", true);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (shouldFocusSearch(event, event.target instanceof Element ? event.target : null)) {
        event.preventDefault();
        input.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const results = filterCommands(commands, query, category);
  const categoryOptions = [
    { id: "all", name: t("cheatsheet.allCommands"), count: commands.length },
    ...commandCategories.map(item => ({
      id: item.id,
      name: item.name[language],
      count: commands.filter(entry => entry.category === item.id).length,
    })),
  ];
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
                  <div className={category === "all" ? "command-group-heading" : "sr-only"}>
                    <h2 id={`commands-${item.id}`}>{item.name[language]}</h2>
                    <span>{t("cheatsheet.count", { count: entries.length })}</span>
                  </div>
                  {entries.map(entry => <CommandRow key={entry.id} entry={entry} />)}
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
        </div>
      </ToolPageLayout>
    </div>
  );
}
