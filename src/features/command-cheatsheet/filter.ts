import type { CommandEntry } from "./types.ts";
/**
 * 先按分类限制，再匹配命令、中英文名称和说明、keywords 与 tags；不搜索参数或示例。
 * @param entries - 原始命令集合，不会被修改
 * @param query - 查询文本，去首尾空白并忽略大小写；空串匹配全部
 * @param category - 默认 all 表示所有分类，否则精确匹配分类 ID
 * @returns 保留原有顺序的筛选结果
 */
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
/**
 * 判断斜杠键是否应聚焦搜索，避免打断输入框、可编辑区域及 IME 输入。
 * @param event - 键盘事件所需字段；Ctrl、Meta 或 Alt 组合不会触发
 * @param target - 事件目标元素，允许 null
 * @returns 是否可由页面接管；函数本身不调用 preventDefault 或 focus
 */
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
/**
 * 只复制原始命令文本，不添加终端提示符。
 * @param command - 写入剪贴板的原文
 * @param clipboard - 注入的 Clipboard 写接口；省略时抛出异常
 * @returns 写入完成的 Promise；不可用或写入被拒绝时向调用方传播异常
 */
export async function copyCommand(
  command: string,
  clipboard?: Pick<Clipboard, "writeText">,
) {
  if (!clipboard) throw new Error("Clipboard unavailable");
  await clipboard.writeText(command);
}
