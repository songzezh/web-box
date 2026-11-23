/**
 * 命令目录专用的双语文本；zh 与 i18next 的 zh-CN 由组件显式对应。
 */
export interface LocalizedText {
  /** 英文文本，也是非简体中文界面的显示分支。 */
  en: string;
  /** 简体中文文本。 */
  zh: string;
}
/**
 * 静态风险级别：safe 不展示提示，caution 与 danger 决定提示标题；不据此执行或阻止命令。
 */
export type CommandRisk = "safe" | "caution" | "danger";
/**
 * 命令适用平台标签，用于详情说明，不用于检测当前操作系统。
 */
export type CommandPlatform = "linux" | "macos" | "windows";
/**
 * 示例由可复制命令和双语说明组成，共用所属条目的高亮语言。
 */
export interface CommandExample {
  /** 展示和复制的原始命令；不包含 UI 添加的终端提示符。 */
  command: string;
  /** 命令用途的双语说明，参与搜索。 */
  description: LocalizedText;
}
/**
 * 单条命令的展示与搜索契约；category 通过 ID 关联分类目录。
 */
export interface CommandEntry {
  /** 命令唯一标识，用于 React key 和详情选择。 */
  id: string;
  /** 所属 commandCategories 的分类 ID。 */
  category: string;
  /** 命令标题的双语文案。 */
  name: LocalizedText;
  command: string;
  description: LocalizedText;
  /** 额外的检索关键词。 */
  keywords: string[];
  /** 参与搜索的标签集合。 */
  tags: string[];
  /** 详情显示的适用操作系统。 */
  platforms: CommandPlatform[];
  /** 控制风险提示标题与是否显示。 */
  risk: CommandRisk;
  /** 可选参数说明；缺省或空数组时隐藏参数区域。 */
  parameters?: { name: string; description: LocalizedText }[];
  /** 可选示例；缺省或空数组时隐藏示例区域。 */
  examples?: CommandExample[];
  /** 可选双语风险说明；非 safe 且缺省时使用通用提示。 */
  warning?: LocalizedText;
}
