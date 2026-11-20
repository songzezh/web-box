# Web Box

**A lightweight, privacy-first collection of browser-based tools.**

Web Box 是一个轻量、开源、隐私优先的在线工具箱，集成开发者工具、文本处理、编码转换、图片处理等实用功能。

无需注册或登录，工具输入与输出默认在浏览器本地处理，不上传至服务器。基于现代前端技术构建，通过 GitHub Pages 静态部署，开箱即用。

## 特性

- **隐私优先** — 工具数据默认在浏览器本地处理，无需上传服务器。
- **轻量快速** — 基于 Vite 构建，工具模块按需加载。
- **丰富工具** — 覆盖开发、编码、文本、图片及日常实用场景。
- **快速搜索** — 支持通过名称、分类和关键词查找工具。
- **工具收藏** — 收藏常用工具，方便快速访问。
- **最近使用** — 本地记录最近访问的工具。
- **主题切换** — 支持浅色、深色及跟随系统主题。
- **命令面板** — 支持快捷键搜索工具和执行常用操作。
- **响应式设计** — 兼容桌面、平板和移动设备。
- **静态部署** — 无需后端服务，支持 GitHub Pages 部署。

> 部分特性与工具正在规划和开发中。

## 工具分类

| 分类 | 规划工具 |
| --- | --- |
| 开发工具 | JSON 格式化、UUID 生成、正则表达式测试 |
| 编码转换 | Base64 编解码、URL 编解码、Hash 计算 |
| 文本工具 | 文本统计、大小写转换、文本去重 |
| 时间工具 | Unix 时间戳转换、日期计算 |
| 图片工具 | 图片压缩、图片尺寸调整、格式转换 |
| 实用工具 | 二维码生成、颜色转换、随机密码生成 |

所有工具优先使用浏览器原生 API 实现，不依赖运行时后端服务。

已实现「常用命令速查」：10 个分类、147 条双语静态命令，其中 OpenSSL 40 条、Java Keytool 10 条，覆盖 P12/PFX、X.509、证书链、TLS 诊断及 Java 证书库运维。证书扩展代码已完成，待人工验收；本轮未运行自动测试或构建。详见 [命令覆盖范围与兼容性说明](docs/command-cheatsheet.md)。页面仅供查询与复制，不执行命令，不上传或解析证书及私钥。

## 技术栈

| 技术 | 用途 |
| --- | --- |
| React | 前端 UI 框架 |
| TypeScript | 类型安全 |
| Vite | 开发服务器与构建工具 |
| Tailwind CSS | UI 样式 |
| shadcn/ui | UI 组件 |
| React Router | 客户端路由 |
| Zustand | 状态管理 |
| Lucide React | 图标 |
| Fuse.js | 工具搜索 |
| localStorage / IndexedDB | 浏览器本地存储 |
| GitHub Actions | CI/CD |
| GitHub Pages | 静态站点托管 |

## 快速开始

### 环境要求

- Node.js 22 或兼容当前 Vite 版本的更新版本
- npm
- Git

### 克隆仓库

```bash
git clone https://github.com/YOUR_USERNAME/web-box.git
cd web-box
```

将 `YOUR_USERNAME` 替换为实际 GitHub 用户名。

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

浏览器访问：

`http://localhost:5173/`

### 生产构建

```bash
npm run build
```

构建产物默认输出到 `dist/` 目录。

### 本地预览

```bash
npm run preview
```

## 项目结构

```text
web-box/
├── .github/
│   └── workflows/        # GitHub Actions
├── public/               # 静态资源
├── src/
│   ├── app/              # 应用配置与路由
│   ├── components/       # 通用 UI 组件
│   ├── features/         # 搜索、收藏、主题等平台能力
│   ├── tools/            # 独立工具模块
│   ├── registry/         # 工具分类与注册表
│   ├── stores/           # 全局状态管理
│   ├── hooks/            # 自定义 React Hooks
│   ├── lib/              # 通用工具函数
│   ├── pages/            # 页面组件
│   └── styles/           # 样式配置
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## GitHub Pages 部署

Web Box 使用 GitHub Actions 自动构建并部署到 GitHub Pages。

### 配置部署路径

项目仓库部署在 `https://YOUR_USERNAME.github.io/web-box/` 时，Vite 的 `base` 应设置为：

```ts
export default defineConfig({
  base: "/web-box/",
});
```

如果使用自定义域名并部署在根路径，可将 `base` 设置为 `/`。

### 启用 GitHub Pages

1. 打开 GitHub 仓库的 **Settings → Pages**。
2. 在 **Build and deployment** 中选择 **GitHub Actions**。
3. 确保 `.github/workflows/deploy.yml` 已配置构建与部署流程。
4. 推送代码到 `main` 分支，触发自动部署。

部署成功后，访问：

`https://YOUR_USERNAME.github.io/web-box/`

## 隐私与安全

Web Box 以本地优先为设计原则：

- 工具输入、文件和计算结果默认不上传至服务器。
- 不需要注册账号或登录。
- 收藏、主题偏好和最近使用记录保存在浏览器本地。
- 默认不持久化用户输入的敏感内容。
- 尽量避免不必要的第三方服务和网络请求。
- 用户可以清除浏览器中保存的项目数据。

**说明：** GitHub Pages 在交付网页和静态资源时仍会产生正常的网络请求。上述隐私承诺主要针对工具处理的数据，不代表访问网站时完全没有网络通信。

## 开发路线

### Phase 1 — 平台基础

- [ ] 响应式页面布局与导航
- [ ] 工具分类与注册表
- [ ] 工具搜索
- [ ] 收藏与最近使用
- [ ] 深色与浅色主题
- [ ] 全局命令面板
- [ ] 首批浏览器本地工具
- [ ] GitHub Pages 自动部署

### Phase 2 — 功能扩展

- [ ] 图片处理工具
- [ ] 高级文本与文件转换
- [ ] Web Workers 计算优化
- [ ] 工具按需加载
- [ ] 单元测试与端到端测试

### Phase 3 — 使用体验

- [ ] PWA 支持
- [ ] 离线访问
- [ ] 多语言支持
- [ ] 工具设置导入与导出
- [ ] 可访问性优化

## License

计划采用 [MIT License](https://opensource.org/licenses/MIT)。

---

**Web Box — Simple tools. Local processing. Privacy first.**
