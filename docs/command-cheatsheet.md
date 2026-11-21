# 常用命令速查

入口：开发与测试 → 常用命令速查。遵循现有工具路由 `/tools/command-cheatsheet`（HashRouter 部署时为 `/#/tools/command-cheatsheet`）。

## 实现

- `src/features/command-cheatsheet/types.ts`：双语命令、参数、示例、平台和风险类型。
- `data.ts`：集中维护 10 个分类及 147 条命令；稳定 ID 与展示组件解耦。证书运维的 50 条静态数据位于 `certificate-commands.ts`，继续使用原有 `CommandEntry` 类型，不改变 UI 或搜索逻辑。
- `filter.ts`：无副作用的搜索与分类过滤、快捷键判断，以及可注入 Clipboard 的复制函数。
- `CommandCheatSheet.tsx` / `commands.css`：复用 ToolPageLayout、全局语言状态及 Carbon 主题变量；桌面端右侧常驻分类列表、窄屏分类选择框、代码区域独立滚动及统一原生 dialog 详情弹窗。
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
| OpenSSL | 40 |
| Java Keytool | 10 |
| 合计 | 147 |

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

本轮证书运维扩展按要求仅生成代码和文档，未运行自动化测试、TypeScript 检查、lint 或构建，验收由人工完成。既有界面测试中的总数量预期同步更新为 147；原有占位符断言按 `<name>` 格式识别，避免将 POSIX 输入/错误重定向误当作占位符，未新增测试场景。

自动化包含数据完整性、命令 ID 唯一性、分类与平台、危险提示、占位符、双语搜索、组合筛选、清空/空状态、快捷键、复制成功/失败、详情展开收起、语言切换、收藏及最近使用，以及原有页面回归。使用现有 Node test runner、Vite SSR 和 jsdom，无新测试依赖。

本地浏览器预览被浏览器权限策略拒绝，真实浏览器的移动端溢出、浅色/深色视觉对比和真实剪贴板权限仍需人工验收。jsdom 测试使用模拟 Clipboard。未执行数据中的任何命令，也未对每种操作系统进行实机运行验证。

## 证书运维覆盖范围与开发状态

2026-11-20：已完成数据扩展，待人工验收。当前检出版本原先只有 8 个基础分类，没有 OpenSSL/Keytool 数据，本轮补齐两个分类。原有 97 条命令保留，新增 50 条；没有增加证书上传、解析、存储或执行功能，没有新增收藏、最近使用或其他平台能力，也没有修改页面组件、数据模型及搜索实现。

- **PKCS#12（8 条）**：查看结构及 MAC、查看证书、提取叶子候选和 CA、导出加密及明文私钥、创建证书包、Legacy Provider 兼容诊断。P12/PFX 检查可按两个扩展名搜索。
- **X.509（11 条）**：完整字段、有效期、30 天到期检查、主体及颁发者、SAN、SHA-256 指纹、序列号、CA 约束、Key Usage/EKU，以及 PEM/DER 双向转换。
- **证书链验证（7 条）**：指定根 CA、提供中间证书、显示构建链、域名与服务器用途、多个中间 CA、严格验证、叶子 CRL 吊销检查。
- **线上 TLS（9 条）**：SNI 连接、服务器实际发送证书、域名验证、指定 CA、线上叶子有效期及主体、TLS 1.2/1.3、OCSP Stapling 诊断。
- **私钥匹配（4 条）**：分别提取证书公钥及私钥公钥，再对两份规范化 DER 公钥取 SHA-256 摘要比较。两条管道都必须先确认上游转换成功。
- **OpenSSL 环境（1 条）**：查看实际可执行文件版本及构建信息。
- **Java Keytool（10 条）**：P12 条目及指定别名、自定义 TrustStore、JKS/P12 双向转换、默认 cacerts、CA 导入、远程证书、PEM 证书导出、CA 文件检查。P12 列表需求中仅文件名不同的操作合并为一个条目。

### 兼容性与安全边界

- 通用 OpenSSL 示例按 1.1.1 与 3.x 的常见选项编写；明文私钥导出主命令使用 3.x 的 `-noenc`，同一条目的示例补充 1.1.1 的 `-nodes`。后者在 3.x 已弃用。`-legacy` 是 3.x Provider 兼容场景，不能视作 1.1.1 参数，也不应无条件用于新导出。
- 严格 X.509 检查随 OpenSSL 版本演进；算法及 TLS 协议支持取决于实际构建和服务器策略。macOS 系统的 openssl 也可能实际是 LibreSSL，不能仅根据系统名称判断兼容性。
- Keytool 的基本列表、导入导出及转换覆盖 JDK 8/11/17/21 的常见用法，仍须核对具体更新版本及 Provider。`-cacerts` 按现代 JDK 用法提供；旧 JDK 8 构建的实际运行时路径替代写法放在同一条目的示例中，不硬编码密码。JDK 9 起默认库格式为 PKCS12，示例仍明确指定源/目标格式，避免依赖默认值。
- 新版 P12 加密/MAC 算法与旧 JDK 的兼容性取决于更新版本。转换前备份，转换后检查别名、私钥条目及完整存储链。JKS 不能表示所有 PKCS12 条目类型，包括 SecretKeyEntry；必须检查导入错误。
- `root-ca.pem` 是选定的信任锚，`intermediate.pem` / `intermediates.pem` 是构建链的候选证书，`certificate.pem` 是叶子证书。`-untrusted` 不赋予信任。示例指定 CAfile 不代表完全隔离其他默认信任来源。
- 链可构建、CA 被信任、域名匹配、用途正确、有效期内是不同条件。普通链验证不代表已检查吊销；`-crl_check` 只检查叶子，CRL 必须来源正确、签名有效、覆盖相应颁发者及范围且未过期。`-crl_check_all` 需要整条链相应 CRL。OCSP 单独处理，`s_client -status` 显示装订响应本身不构成完整吊销结论。
- `s_client -showcerts` 仅显示服务器发送列表，通常不必包含根，不是已验证的完整链；`-servername` 是 SNI 选择，域名验证使用 `-verify_hostname`。默认 s_client 可能在验证出错后继续，应使用验证条目中的 `-verify_return_error`。
- `-checkend` 仅检查到期窗口，非零也可能表示处理错误。远程叶子提取及公钥摘要管道使用 POSIX Shell 写法，平台限制为 Linux/macOS；隐藏 stderr 或只检查管道末尾状态可能掩盖上游失败，不能据此认定 TLS 验证成功。
- 明文私钥导出与 CA 信任库修改展示始终可见的具体危险提示。所有密码使用交互输入，没有真实凭据或证书内容，没有提供关闭 MAC 校验作为修复方法。

### 故障场景与人工检查

| 故障 | 关联命令 ID 与检查重点 |
| --- | --- |
| P12 密码错误 | `openssl-p12-info`：密码、MAC、文件完整性；不要绕过校验 |
| P12 无法解析 | `openssl-version`、`openssl-p12-legacy`：版本、算法及 Legacy Provider |
| 无法建立证书链 | `openssl-verify-intermediate`、`openssl-verify-multiple-intermediates`：缺失中间证书、根不匹配 |
| 证书已过期 | `openssl-x509-dates`、`openssl-x509-checkend`、`openssl-tls-dates`：Not Before/Not After 与部署实际证书 |
| 域名不匹配 | `openssl-x509-san`、`openssl-verify-hostname`、`openssl-tls-verify-hostname`：SAN、SNI、目标域名 |
| Java PKIX path building failed | `keytool-default-cacerts`、`keytool-truststore-list`、`keytool-import-ca`：应用实际 JVM/TrustStore、CA 信任及服务端中间证书 |
| 证书与私钥不匹配 | `openssl-cert-public-key`、`openssl-key-public-key`、`openssl-public-digest-certificate`、`openssl-public-digest-private`：规范化公钥一致性 |
| 浏览器不信任证书 | `openssl-verify-hostname`、`openssl-x509-constraints`、`openssl-x509-usage`：实际信任锚、链、用途及浏览器策略 |
| 服务端证书不完整 | `openssl-tls-showcerts`、`openssl-verify-show-chain`：实际发送的中间证书与本地构建路径的区别 |
| TLS 握手失败 | `openssl-version`、`openssl-tls-connect`、`openssl-tls-1-2`、`openssl-tls-1-3`：协议、套件、SNI、客户端证书及服务端配置 |

人工验收：切换两个分类核对 40/10 条计数；组合搜索 `p12`、`pfx`、`证书链`、`certificate chain`、`truststore`、`PKIX`、`expiry`、`SAN`；切换中英文并展开详情；复制带管道/重定向的完整原文；确认明文私钥及信任库导入的风险提示不需展开即可看到。按需由人工执行类型检查和构建。本轮未对任何真实证书或线上服务运行这些命令。

### 证书命令参考

- [OpenSSL 3.0 PKCS#12](https://docs.openssl.org/3.0/man1/openssl-pkcs12/)
- [OpenSSL 1.1.1 PKCS#12](https://docs.openssl.org/1.1.1/man1/pkcs12/)
- [OpenSSL X.509](https://docs.openssl.org/3.0/man1/openssl-x509/)
- [OpenSSL 1.1.1 verify](https://docs.openssl.org/1.1.1/man1/verify/)
- [OpenSSL verification options](https://docs.openssl.org/3.0/man1/openssl-verification-options/)
- [OpenSSL s_client](https://docs.openssl.org/3.0/man1/openssl-s_client/)
- [JDK 8 Keytool](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html)
- [JDK 17 Keytool](https://docs.oracle.com/en/java/javase/17/docs/specs/man/keytool.html)


## 双栏分类导航与紧凑布局

2026-11-20：桌面端使用左侧命令内容与右侧常驻分类列表，替换原生 dialog 抽屉。命令数据、搜索与复制逻辑保持不变。

- 移除命令容器原有 1120px 限制，复用 `.page-grid` 的 1584px 页面最大宽度；主内容 `minmax(0, 1fr)`、分类栏 240px，两栏间距 32px。代码区域继续独立横向滚动，纯图标复制按钮保持固定热区（桌面 40px，移动端与触屏 48px）。
- 在 Carbon 大屏断点 1056px 起显示右侧列表。分类栏 sticky 顶部偏移为共享 `--app-header-height` 加 16px；Header 同样使用该高度 token。列表高度受可用视口限制，可独立滚动，不锁定页面滚动。
- 1056px 以下切换单栏，在搜索框附近显示有标签的原生 select，隐藏桌面分类栏。浏览器提供键盘及触屏选择交互，不保留抽屉触发器、遮罩、开关状态、焦点恢复或滚动锁。
- 两端复用同一份 `categoryOptions`，从 `commandCategories` 及既有数据生成名称与计数，并共享唯一 `category` 状态。切换布局、语言或分类不重置搜索词，默认全部命令。
- 复制成功后 Check 图标维持 2 秒，失败保留明确反馈；aria-label、title 随语言变化。平台、参数和示例在统一详情弹窗中查看，风险说明在列表及弹窗中保留。
- 交互回归覆盖常驻列表筛选、原生选择框与列表状态同步、组合搜索、双语标签、复制与原有功能；实际 Sticky、移动端溢出及主题视觉仍需人工浏览器检查。


## 紧凑列表与命令详情弹窗

列表只负责快速阅读及复制，详细说明由页面层管理的单一模态弹窗展示。命令数据、分类栏及筛选逻辑保持不变，没有引入新依赖。

- 条目上下 Padding 为 8px，标题行高 1.35，描述行高 1.4；标题与代码、代码与描述间距均为 4px，代码 Padding 为 6px 12px，分组仅保留顶部 16px 间距。没有大卡片或内联详情占位空间。
- 每条命令代码末尾提供 Copy/Check 与 Info 两个纯图标按钮，间距 4px。桌面按钮 40px，移动端和粗指针设备 48px，复制操作不会打开弹窗，详情操作不会触发复制。
- `CommandCode.tsx` 复用完整命令和示例的复制、成功图标及失败提示。`CommandDetailsDialog.tsx` 使用现有 `CommandEntry`，按非空数据展示参数和示例；不生成额外说明，不维护另一份详情数据。
- 现有 UI Dialog 文件引用未安装的组件依赖，因此使用浏览器原生 `<dialog>`。原生模态提供背景不可交互及 Tab 焦点约束；打开后聚焦标题，锁定背景滚动。关闭按钮、Escape 或弹窗外遮罩关闭后恢复原滚动状态及详情触发按钮焦点，并保留分类、搜索词和页面滚动位置。弹窗内不响应页面的 `/` 搜索快捷键。
- 弹窗最大宽度 680px，与视口保留 16px 边距，高度不超过可视区域；标题/关闭按钮与滚动内容分区，长命令局部横向滚动。移动端参数列表改为单列。标题、按钮、参数、示例及风险标签复用全局语言与主题机制。
- 原有风险级别及提示同时保留于列表和弹窗，不因密度优化而隐藏。无参数/示例的简单命令仍可打开基本信息弹窗，不产生空章节。
- 删除原生 details/summary 的内联展开标记、逻辑及样式。右侧常驻 Sticky 分类栏、窄屏分类 select 和原有平台能力均未扩展。
- 回归测试覆盖逐条详情入口、简单命令无空章节、弹窗命令/示例独立复制、双语信息、Escape/遮罩/关闭按钮、焦点恢复、滚动状态及搜索/分类保持。jsdom 对原生 dialog 方法使用替身；实际浏览器 Tab 约束、移动端溢出和主题视觉仍需人工验收。
