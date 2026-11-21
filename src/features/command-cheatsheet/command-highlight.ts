import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

export type CommandLanguage = "bash" | "shell" | "powershell" | "json";

// Lazily loaded by the shared code renderer. Share initialization across
// list rows, examples, StrictMode mounts and subsequent dialog openings.
const highlighter = createHighlighterCore({
  themes: [import("shiki/themes/github-light.mjs"), import("shiki/themes/github-dark.mjs")],
  langs: [],
  engine: createJavaScriptRegexEngine(),
});
const loaders = {
  bash: () => import("shiki/langs/bash.mjs"),
  powershell: () => import("shiki/langs/powershell.mjs"),
  json: () => import("shiki/langs/json.mjs"),
};
const languages = new Map<string, Promise<void>>();

export async function highlightCommand(code: string, language: CommandLanguage) {
  const instance = await highlighter;
  const lang = language === "shell" ? "bash" : language;
  let loading = languages.get(lang);
  if (!loading) {
    loading = instance.loadLanguage(loaders[lang]());
    languages.set(lang, loading);
  }
  await loading;
  return instance.codeToTokensWithThemes(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
  });
}
