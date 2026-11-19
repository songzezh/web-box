import type { CommandEntry } from "./types.ts";
export function filterCommands(
  entries: readonly CommandEntry[],
  query: string,
  category = "all",
) {
  const needle = query.trim().toLowerCase();
  return entries.filter(
    (entry) =>
      (category === "all" || entry.category === category) &&
      [
        entry.command,
        entry.name.en,
        entry.name.zh,
        entry.description.en,
        entry.description.zh,
        ...entry.keywords,
        ...entry.tags,
      ].some((value) => value.toLowerCase().includes(needle)),
  );
}
export function shouldFocusSearch(
  event: Pick<
    KeyboardEvent,
    "key" | "ctrlKey" | "metaKey" | "altKey" | "isComposing"
  >,
  target: Element | null,
) {
  return (
    event.key === "/" &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
    !event.isComposing &&
    !target?.closest(
      'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]',
    )
  );
}
export async function copyCommand(
  command: string,
  clipboard?: Pick<Clipboard, "writeText">,
) {
  if (!clipboard) throw new Error("Clipboard unavailable");
  await clipboard.writeText(command);
}
