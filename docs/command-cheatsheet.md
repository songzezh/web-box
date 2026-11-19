# 常用命令速查

入口：开发与测试 → 常用命令速查。遵循现有工具路由 `/tools/command-cheatsheet`（HashRouter 部署时为 `/#/tools/command-cheatsheet`）。

## 实现

- `src/features/command-cheatsheet/types.ts`：双语命令、参数、示例、平台和风险类型。
- `data.ts`：集中维护分类及 97 条命令；稳定 ID 与展示组件解耦。
- `filter.ts`：无副作用的搜索与分类过滤、快捷键判断，以及可注入 Clipboard 的复制函数。
- `CommandCheatSheet.tsx` / `commands.css`：复用 ToolPageLayout、全局语言状态及 Carbon 主题变量；横向滚动分类、代码区域独立滚动、原生 details 渐进展开。
- `src/hooks/useToolActivity.ts`：原工程仅在 README 规划收藏/最近使用，未提供实现。本次补充可复用的轻量 hook，分类卡片与工具页共享收藏状态；访问时记录最近使用，最多保留 20 个工具 ID。存储键为 `web-box:favorites` 和 `web-box:recent-tools`。存储受限时页面仍可使用。
- 不增加依赖，不修改首页布局、主导航、语言/主题状态，不执行展示的命令。

## 命令数量

| 分类 | 数量 |
| --- | ---: |
| Git | 22 |
| Docker | 13 |
| Linux / Shell | 16 |
| npm | 9 |
| pnpm | 9 |
| Node.js | 8 |
| 网络诊断 | 10 |
| 系统与进程 | 10 |
| 合计 | 97 |

## 参考与内容维护

核对日期：2026-11-19。展示内容使用自行编写的简短双语说明，未复制官方手册长段内容。

- [Git CLI](https://git-scm.com/docs/git)
- [Docker CLI](https://docs.docker.com/reference/cli/docker/)
- [npm CLI](https://docs.npmjs.com/cli/v11/commands/)
- [pnpm install](https://pnpm.io/cli/install)
- [Node.js CLI](https://nodejs.org/api/cli.html)
- [curl manual](https://curl.se/docs/manpage.html)

命令依赖目标系统安装对应 CLI。本工具中的平台表示该命令写法适用的系统，不保证系统预装相关工具。POSIX Shell 示例不能直接视作 Windows 命令；curl 的 Windows PowerShell 5.1 别名差异、Node 最低版本、Compose v2 及 netcat 变体差异在相关详情中标注。尖括号占位符必须先替换。命令复制保留完整原文，不做自动插值。

危险操作始终显示具体风险，不需要先展开详情。示例仅供参考，工具不会执行系统命令。Clipboard 不支持、权限拒绝或非安全上下文均显示明确错误，并允许手动选择代码复制。

## 验证与限制

自动化包含数据完整性、命令 ID 唯一性、分类与平台、危险提示、占位符、双语搜索、组合筛选、清空/空状态、快捷键、复制成功/失败、详情展开收起、语言切换、收藏及最近使用，以及原有页面回归。使用现有 Node test runner、Vite SSR 和 jsdom，无新测试依赖。

本地浏览器预览被浏览器权限策略拒绝，真实浏览器的移动端溢出、浅色/深色视觉对比和真实剪贴板权限仍需人工验收。jsdom 测试使用模拟 Clipboard。未执行数据中的任何命令，也未对每种操作系统进行实机运行验证。
