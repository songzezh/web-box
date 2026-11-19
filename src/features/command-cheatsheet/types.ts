export interface LocalizedText {
  en: string;
  zh: string;
}
export type CommandRisk = "safe" | "caution" | "danger";
export type CommandPlatform = "linux" | "macos" | "windows";
export interface CommandExample {
  command: string;
  description: LocalizedText;
}
export interface CommandEntry {
  id: string;
  category: string;
  name: LocalizedText;
  command: string;
  description: LocalizedText;
  keywords: string[];
  tags: string[];
  platforms: CommandPlatform[];
  risk: CommandRisk;
  parameters?: { name: string; description: LocalizedText }[];
  examples?: CommandExample[];
  warning?: LocalizedText;
}
