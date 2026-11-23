/** 工具与资源 registry：集中定义元数据、查询、路径与启动校验，供路由、导航和页面目录共同使用。 */
/**
 * 内部分类允许使用的图标键，与分类卡片的图标映射保持对应。
 */
export type CategoryIcon =
  | "text"
  | "data"
  | "convert"
  | "security"
  | "time"
  | "code"
  | "image";
/**
 * 工具入口图标键，由展示层映射为 lucide-react Component。
 */
export type ToolIcon = "keyboard" | "terminal" | "text" | "data" | "convert" | "security" | "time" | "regex" | "image";
/**
 * 工具登记状态：available 为已可用，coming-soon 为规划占位；状态参与可用数统计。
 */
export type ToolStatus = "available" | "coming-soon";
/**
 * 内部工具分类元数据；英文名称供目录消费者使用，页面通过 ID 读取翻译。
 */
export interface ToolCategory {
  id: string;
  name: string;
  /** 主导航所用英文短名；界面显示时按 ID 翻译。 */
  shortName: string;
  description: string;
  /** 分类排序值，启动校验要求唯一。 */
  order: number;
  /** 规划工具数，用于统计，不代表实际实现数。 */
  plannedToolCount: number;
  icon: CategoryIcon;
}
/**
 * 工具注册项；path 必须为 /tools/{id}，categoryId 关联内部分类。
 */
export interface ToolDefinition {
  icon: ToolIcon;
  id: string;
  name: string;
  description: string;
  /** 所属内部分类的稳定 ID。 */
  categoryId: string;
  /** 站内工具路径，须与工具 ID 对应。 */
  path: string;
  /** 用于区分可用工具和规划占位并参与统计。 */
  status: ToolStatus;
  /** 工具元数据标签，目前目录查询不据此过滤。 */
  tags: string[];
}
export const externalResourceCategories = [
  {
    id: "ext-dev",
    name: "Development & Engineering",
    description:
      "Resources for development, debugging, and browser compatibility.",
    icon: "code",
  },
  {
    id: "ext-data",
    name: "Data & Formats",
    description: "Validate data, convert encodings, and work with formats.",
    icon: "data",
  },
  {
    id: "ext-design",
    name: "Design & Images",
    description: "Tools for image editing, compression, and visual design.",
    icon: "image",
  },
  {
    id: "ext-security",
    name: "Security & Privacy",
    description: "Resources for security practices and privacy protection.",
    icon: "security",
  },
  {
    id: "ext-productivity",
    name: "Productivity & Office",
    description:
      "Resources for collaboration, diagrams, and everyday productivity.",
    icon: "briefcase",
  },
  {
    id: "ext-learning",
    name: "Learning & Documentation",
    description: "Technical documentation, tutorials, and learning references.",
    icon: "book",
  },
  {
    id: "ext-open-source",
    name: "Open Source & Community",
    description: "Discover open source projects and technical communities.",
    icon: "community",
  },
  {
    id: "ext-official",
    name: "Site & Official Resources",
    description: "Web Box and related official resources.",
    icon: "site",
  },
] as const satisfies readonly {
  id: string;
  name: string;
  description: string;
  icon: string;
}[];
// IDs and translation keys are stable; English metadata remains available to registry consumers.
export type ExternalResourceCategory =
  (typeof externalResourceCategories)[number];
export type ExternalResourceCategoryId = ExternalResourceCategory["id"];
/**
 * 外部资源注册项；url 经过协议与凭据检查后才用于新窗口导航。
 */
export interface ExternalResource {
  id: string;
  name: string;
  description: string;
  categoryId: ExternalResourceCategoryId;
  url: string;
}
/**
 * 按 ID 查找外部资源分类；未知 ID 返回 undefined。
 */
export const getResourceCategoryById = (id: string) =>
  externalResourceCategories.find((c) => c.id === id);
/**
 * 生成外部资源分类路径；ID 由 ExternalResourceCategoryId 联合类型约束。
 */
export const getResourceCategoryPath = (id: ExternalResourceCategoryId) =>
  `/resources/${id}`;
/**
 * 返回指定外部分类的资源，保留 registry 登记顺序；无资源时为空数组。
 */
export const getResourcesByCategory = (id: ExternalResourceCategoryId) =>
  resources.filter((r) => r.categoryId === id);
/**
 * 解析并限制外部链接为不含用户名、密码的 http/https URL；不会验证远端可达性。
 * @param value - 待解析的绝对地址
 * @returns 可用 URL；解析失败、协议不允许或包含凭据时返回 undefined
 */
export function getSafeResourceUrl(value: string): URL | undefined {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url
      : undefined;
  } catch {
    return undefined;
  }
}

export const categories = (
  [
    {
      id: "text-content",
      name: "Text & Content",
      description: "Make everyday words easier to work with.",
      shortName: "Text",
      order: 1,
      plannedToolCount: 8,
      icon: "text",
    },
    {
      id: "data-format",
      name: "Data & Format",
      description: "Bring structure and clarity to your data.",
      shortName: "Data",
      order: 2,
      plannedToolCount: 9,
      icon: "data",
    },
    {
      id: "encode-convert",
      name: "Encode & Convert",
      description: "Move between encodings and formats.",
      shortName: "Encode",
      order: 3,
      plannedToolCount: 10,
      icon: "convert",
    },
    {
      id: "security-random",
      name: "Security & Random",
      description: "Generate random values for everyday tasks.",
      shortName: "Security",
      order: 4,
      plannedToolCount: 10,
      icon: "security",
    },
    {
      id: "time-schedule",
      name: "Time & Schedule",
      description: "Work with dates, durations, and timestamps.",
      shortName: "Time",
      order: 5,
      plannedToolCount: 8,
      icon: "time",
    },
    {
      id: "dev-test",
      name: "Development & Test",
      description: "Small utilities for your development workflow.",
      shortName: "Dev",
      order: 6,
      plannedToolCount: 6,
      icon: "code",
    },
    {
      id: "image-design",
      name: "Image & Design",
      description: "Practical helpers for images and color.",
      shortName: "Image",
      order: 7,
      plannedToolCount: 9,
      icon: "image",
    },
  ] satisfies ToolCategory[]
).sort((a, b) => a.order - b.order);

// Initial examples come from the repository README; this is not the full planned catalog.
export const tools: ToolDefinition[] = [
  {
    id: "keyboard-shortcuts",
    icon: "keyboard",
    name: "Keyboard Shortcuts",
    description: "Browse shortcut combinations and Vim / Vi commands.",
    categoryId: "dev-test",
    path: "/tools/keyboard-shortcuts",
    status: "available",
    tags: ["keyboard", "shortcuts", "mac", "windows"],
  },
  {
    id: "command-cheatsheet",
    icon: "terminal",
    name: "Command Cheat Sheet",
    description:
      "Quickly find, understand, and copy commonly used developer commands.",
    categoryId: "dev-test",
    path: "/tools/command-cheatsheet",
    status: "available",
    tags: ["commands", "git", "docker", "shell"],
  },
  {
    id: "text-statistics",
    icon: "text",
    name: "Text statistics",
    description: "Count characters and words in a piece of text.",
    categoryId: "text-content",
    path: "/tools/text-statistics",
    status: "coming-soon",
    tags: ["text"],
  },
  {
    id: "json-formatter",
    icon: "data",
    name: "JSON formatter",
    description: "Format structured JSON for easier reading.",
    categoryId: "data-format",
    path: "/tools/json-formatter",
    status: "coming-soon",
    tags: ["json"],
  },
  {
    id: "base64",
    icon: "convert",
    name: "Base64 encode / decode",
    description: "Convert text to and from Base64 encoding.",
    categoryId: "encode-convert",
    path: "/tools/base64",
    status: "coming-soon",
    tags: ["encoding"],
  },
  {
    id: "password-generator",
    icon: "security",
    name: "Random password generator",
    description: "Generate random passwords in your browser.",
    categoryId: "security-random",
    path: "/tools/password-generator",
    status: "coming-soon",
    tags: ["random"],
  },
  {
    id: "unix-timestamp",
    icon: "time",
    name: "Unix timestamp converter",
    description: "Convert between Unix timestamps and dates.",
    categoryId: "time-schedule",
    path: "/tools/unix-timestamp",
    status: "coming-soon",
    tags: ["time"],
  },
  {
    id: "regex-tester",
    icon: "regex",
    name: "Regular expression tester",
    description: "Explore patterns and test text matches.",
    categoryId: "dev-test",
    path: "/tools/regex-tester",
    status: "coming-soon",
    tags: ["development"],
  },
  {
    id: "color-converter",
    icon: "image",
    name: "Color converter",
    description: "Convert color values between common formats.",
    categoryId: "image-design",
    path: "/tools/color-converter",
    status: "coming-soon",
    tags: ["color"],
  },
];
// Official resource verification dates are recorded in docs/resources.md.
export const resources: ExternalResource[] = [
  {
    id: "mdn",
    name: "MDN Web Docs",
    description:
      "Reference and guides for HTML, CSS, JavaScript, and Web APIs.",
    categoryId: "ext-learning",
    url: "https://developer.mozilla.org/en-US/",
  },
  {
    id: "caniuse",
    name: "Can I use",
    description: "Browser support tables for web platform features.",
    categoryId: "ext-dev",
    url: "https://caniuse.com/",
  },
  {
    id: "regex101",
    name: "regex101",
    description: "Build, test, and explain regular expressions.",
    categoryId: "ext-dev",
    url: "https://regex101.com/",
  },
  {
    id: "jsonlint",
    name: "JSONLint",
    description: "Validate and format JSON documents.",
    categoryId: "ext-data",
    url: "https://jsonlint.com/",
  },
  {
    id: "cyberchef",
    name: "CyberChef",
    description: "Explore recipes for encoding and data transformations.",
    categoryId: "ext-data",
    url: "https://gchq.github.io/CyberChef/",
  },
  {
    id: "squoosh",
    name: "Squoosh",
    description: "Compress images and compare output settings.",
    categoryId: "ext-design",
    url: "https://squoosh.app/",
  },
  {
    id: "svgomg",
    name: "SVGOMG",
    description: "Optimize SVG markup with a visual interface for SVGO.",
    categoryId: "ext-design",
    url: "https://jakearchibald.github.io/svgomg/",
  },
  {
    id: "photopea",
    name: "Photopea",
    description: "Edit images with a browser-based photo editor.",
    categoryId: "ext-design",
    url: "https://www.photopea.com/",
  },
  {
    id: "uiverse",
    name: "Uiverse",
    description: "Explore community-built UI elements and copy their code.",
    categoryId: "ext-design",
    url: "https://uiverse.io/",
  },
  {
    id: "excalidraw",
    name: "Excalidraw",
    description: "Sketch diagrams on a hand-drawn-style whiteboard.",
    categoryId: "ext-productivity",
    url: "https://excalidraw.com/",
  },
];
export const projectUrl = "https://github.com/songzezh/web-box";
/**
 * 校验目录唯一性、工具分类关联、路径约定、状态与资源地址；模块加载时立即调用。
 * @param cs - 内部分类，顺序值需唯一，规划数量需为非负整数
 * @param ts - 工具登记数据
 * @param rs - 外部资源；分类关联检查使用本模块的固定资源分类
 * @returns 校验通过时无返回值；发现首个非法项时抛出 Error，阻止继续初始化
 */
export function validateRegistry(
  cs: ToolCategory[],
  ts: ToolDefinition[],
  rs: ExternalResource[],
) {
  const unique = (values: string[], label: string) => {
    if (new Set(values).size !== values.length)
      throw new Error(`Duplicate ${label}`);
  };
  unique(
    cs.map((c) => c.id),
    "category ID",
  );
  unique(
    cs.map((c) => String(c.order)),
    "category order",
  );
  unique(
    ts.map((t) => t.id),
    "tool ID",
  );
  unique(
    ts.map((t) => t.path),
    "tool path",
  );
  unique(
    rs.map((r) => r.id),
    "resource ID",
  );
  for (const c of cs) {
    if (!Number.isInteger(c.plannedToolCount) || c.plannedToolCount < 0)
      throw new Error("Invalid planned tool count: " + c.id);
  }
  for (const t of ts) {
    if (!cs.some((c) => c.id === t.categoryId))
      throw new Error(`Invalid category: ${t.categoryId}`);
    if (t.path !== `/tools/${t.id}`)
      throw new Error(`Invalid tool path: ${t.path}`);
    if (!["available", "coming-soon"].includes(t.status))
      throw new Error(`Invalid status: ${t.id}`);
  }
  for (const r of rs) {
    if (!getResourceCategoryById(r.categoryId))
      throw new Error(`Invalid resource category: ${r.categoryId}`);
    if (!getSafeResourceUrl(r.url))
      throw new Error(`Invalid resource URL: ${r.id}`);
  }
}
validateRegistry(categories, tools, resources);
/**
 * 按分类精确筛选工具，保持登记顺序；未知分类返回空数组。
 */
export const getToolsByCategory = (id: string) =>
  tools.filter((t) => t.categoryId === id);
/**
 * 按稳定 ID 查找工具；不存在时返回 undefined。
 */
export const getToolById = (id: string) => tools.find((t) => t.id === id);
/**
 * 查找内部分类；不存在时返回 undefined。
 */
export const getCategoryById = (id: string) =>
  categories.find((c) => c.id === id);
/**
 * 生成规范分类路径；编码 ID 以避免分隔符改变路由层级，不校验 ID 是否存在。
 */
export const getCategoryPath = (id: string) => "/" + encodeURIComponent(id);
/**
 * 模块初始化时生成的目录统计快照；规划数量来自分类声明，非实际已实现工具数。
 */
export const statistics = {
  planned: categories.reduce(
    (total, category) => total + category.plannedToolCount,
    0,
  ),
  categories: categories.length,
  registered: tools.length,
  available: tools.filter((t) => t.status === "available").length,
  resources: resources.length,
};
