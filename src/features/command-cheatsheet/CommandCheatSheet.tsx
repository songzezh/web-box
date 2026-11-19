import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, Copy, Star } from "lucide-react";
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
      </div>
      <div className="command-code">
        <pre>
          <code>{entry.command}</code>
        </pre>
        <button
          type="button"
          onClick={copy}
          aria-label={`${t("cheatsheet.copy")}: ${entry.command}`}
          title={t("cheatsheet.copy")}
        >
          {feedback === "copied" ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <Copy size={18} aria-hidden="true" />
          )}
          <span>
            {t(feedback === "copied" ? "cheatsheet.copied" : "cheatsheet.copy")}
          </span>
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
      {entry.parameters?.length || entry.examples?.length ? (
        <details>
          <summary>{t("cheatsheet.details")}</summary>
          <div className="command-details">
            <h4>{t("cheatsheet.purpose")}</h4>
            <p>{text(entry.description)}</p>
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
      if (
        shouldFocusSearch(
          event,
          event.target instanceof Element ? event.target : null,
        )
      ) {
        event.preventDefault();
        input.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const results = filterCommands(commands, query, category);
  return (
    <ToolPageLayout
      title={t("command-cheatsheet.name")}
      description={t("command-cheatsheet.description")}
    >
      <div className="command-sheet">
        <div className="command-toolbar">
          <p className="eyebrow">{t("cheatsheet.local")}</p>
          <button
            type="button"
            aria-pressed={activity.favorite}
            onClick={activity.toggleFavorite}
          >
            <Star
              size={18}
              fill={activity.favorite ? "currentColor" : "none"}
              aria-hidden="true"
            />
            {t(
              activity.favorite
                ? "cheatsheet.unfavorite"
                : "cheatsheet.favorite",
            )}
          </button>
        </div>
        <label htmlFor="command-search">{t("cheatsheet.search")}</label>
        <div className="command-search">
          <input
            id="command-search"
            ref={input}
            type="search"
            placeholder={t("cheatsheet.search")}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-keyshortcuts="/"
          />
          <button
            type="button"
            disabled={!query}
            onClick={() => {
              setQuery("");
              input.current?.focus();
            }}
          >
            {t("cheatsheet.clear")}
          </button>
        </div>
        <p className="command-help">{t("cheatsheet.placeholder")}</p>
        <div
          className="command-filters"
          role="group"
          aria-label={t("cheatsheet.all")}
        >
          <button
            type="button"
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            {t("cheatsheet.all")} <span>{commands.length}</span>
          </button>
          {commandCategories.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.name[language]}{" "}
              <span>
                {commands.filter((entry) => entry.category === item.id).length}
              </span>
            </button>
          ))}
        </div>
        <p className="command-count" role="status">
          {t("cheatsheet.count", { count: results.length })}
        </p>
        {!results.length && (
          <div className="empty-state">
            <div>
              <h2>{t("cheatsheet.empty")}</h2>
              <p>{t("cheatsheet.emptyHelp")}</p>
            </div>
          </div>
        )}
        {commandCategories.map((item) => {
          const entries = results.filter((entry) => entry.category === item.id);
          return entries.length ? (
            <section
              className="command-group"
              key={item.id}
              aria-labelledby={`commands-${item.id}`}
            >
              <div className="command-group-heading">
                <h2 id={`commands-${item.id}`}>{item.name[language]}</h2>
                <span>{t("cheatsheet.count", { count: entries.length })}</span>
              </div>
              {entries.map((entry) => (
                <CommandRow key={entry.id} entry={entry} />
              ))}
            </section>
          ) : null;
        })}
      </div>
    </ToolPageLayout>
  );
}
