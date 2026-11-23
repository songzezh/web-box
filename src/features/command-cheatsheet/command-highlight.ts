/** 共享 Shiki 高亮服务；模块被异步渲染器加载后初始化主题，语法按实际语言延迟加载。 */
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

/**
 * 渲染器支持的语言；shell 共用 bash 语法。
 */
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

/**
 * 按需加载语法并生成同时含明暗主题颜色的 token；共享初始化与语言加载 Promise 以合并并发请求。
 * @param code - 保留原始换行的命令文本
 * @param language - 语法标识，shell 映射为 bash
 * @returns Shiki token 行数组；加载或分词失败时拒绝，由展示组件回退原文
 * 加载失败的 Promise 仍留在缓存中，本模块不自动重试。
 */
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
