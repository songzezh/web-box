import { Fragment, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { highlightCommand } from "./command-highlight";
import type { CommandLanguage } from "./command-highlight";

export default function HighlightedCommand({ code, language }: { code: string; language: CommandLanguage }) {
  const [result, setResult] = useState<{ code: string; language: CommandLanguage; tokens: Awaited<ReturnType<typeof highlightCommand>> } | null>(null);
  useEffect(() => {
    let active = true;
    highlightCommand(code, language).then(tokens => {
      if (active) setResult({ code, language, tokens });
    }).catch(() => { /* Keep the original, selectable command on failure. */ });
    return () => { active = false; };
  }, [code, language]);
  if (!result || result.code !== code || result.language !== language) return code;
  const separators = code.match(/\r\n|\r|\n/g) ?? [];
  const rendered = result.tokens.map(line => line.map(token => token.content).join("")).map((line, index) => (index > 0 ? separators[index - 1] ?? "\n" : "") + line).join("");
  // A grammar must never alter the original text, including line endings.
  if (rendered !== code) return code;
  return result.tokens.map((line, index) => <Fragment key={index}>
    {index > 0 && (separators[index - 1] ?? "\n")}{line.map((token, tokenIndex) => <span key={tokenIndex} className="command-token" style={{
      "--command-light": token.variants.light.color,
      "--command-dark": token.variants.dark.color,
    } as CSSProperties}>{token.content}</span>)}
  </Fragment>);
}
