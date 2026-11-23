/** OpenSSL 证书命令参考数据；占位符、风险、参数和示例用于详情展示，浏览器不处理证书或执行命令。 */
import type { CommandEntry } from "./types";

// Static reference data only; no command or certificate is processed by the browser.
export const certificateCommands: CommandEntry[] = [
  {
    "id": "openssl-p12-info",
    "category": "openssl",
    "name": {
      "en": "Inspect PKCS#12 structure",
      "zh": "查看 P12/PFX 结构"
    },
    "command": "openssl pkcs12 -info -in certificate.p12 -noout",
    "description": {
      "en": "Inspect the bundle structure, encryption algorithms and integrity MAC without exporting credentials.",
      "zh": "查看证书包结构、加密算法及完整性 MAC，不导出凭据。"
    },
    "keywords": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "Inspect PKCS#12 structure",
      "查看 P12/PFX 结构",
      "P12 密码错误",
      "MAC",
      "password",
      "P12 无法解析"
    ],
    "tags": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl pkcs12 -info -in certificate.p12 -noout",
        "description": {
          "en": "Enter the import password interactively. A MAC error can indicate an incorrect password or damaged file; an unsupported-algorithm error may instead be a compatibility issue. Check openssl version -a and the legacy inspection command. Do not bypass MAC verification.",
          "zh": "交互输入导入密码。MAC 错误可能源于密码错误或文件损坏，不支持算法的错误则可能属于兼容性问题。检查 openssl version -a 及旧版兼容诊断命令，不要绕过 MAC 校验。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-info",
        "description": {
          "en": "Show PKCS#12 structure, encryption algorithms and iteration counts.",
          "zh": "显示 PKCS#12 结构、加密算法及迭代次数。"
        }
      },
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      }
    ]
  },
  {
    "id": "openssl-p12-certificates",
    "category": "openssl",
    "name": {
      "en": "View certificates in P12",
      "zh": "查看 P12 中的证书"
    },
    "command": "openssl pkcs12 -in certificate.p12 -nokeys",
    "description": {
      "en": "Print certificates as PEM without outputting private keys.",
      "zh": "以 PEM 输出证书，不输出私钥。"
    },
    "keywords": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "View certificates in P12",
      "查看 P12 中的证书"
    ],
    "tags": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl pkcs12 -in certificate.p12 -nokeys",
        "description": {
          "en": "P12 and PFX normally identify PKCS#12 containers, not PEM text. A bundle can contain several certificates; inspect the subject and issuer of each before deployment.",
          "zh": "P12 与 PFX 通常指 PKCS#12 容器，并非 PEM 文本。一个包中可能包含多张证书，部署前检查各证书的主体与颁发者。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-nokeys",
        "description": {
          "en": "Do not output private keys.",
          "zh": "不输出私钥。"
        }
      }
    ]
  },
  {
    "id": "openssl-p12-leaf",
    "category": "openssl",
    "name": {
      "en": "Extract leaf certificate candidates",
      "zh": "提取叶子候选证书"
    },
    "command": "openssl pkcs12 -in certificate.p12 -clcerts -nokeys -out certificate.pem",
    "description": {
      "en": "Export certificates classified as non-CA, excluding private keys.",
      "zh": "导出被分类为非 CA 的证书，不包含私钥。"
    },
    "keywords": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "Extract leaf certificate candidates",
      "提取叶子候选证书"
    ],
    "tags": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "May overwrite the local output file. Check the path and set appropriate file permissions.",
      "zh": "可能覆盖本地输出文件，请核对路径并设置适当文件权限。"
    },
    "examples": [
      {
        "command": "openssl pkcs12 -in certificate.p12 -clcerts -nokeys -out certificate.pem",
        "description": {
          "en": "The -clcerts filter depends on PKCS#12 bag associations/type markers. It does not guarantee exactly one intended leaf certificate. Inspect the output with openssl x509.",
          "zh": "-clcerts 的筛选依赖 PKCS#12 内的证书关联及类型标识，不能保证任意文件中都恰好只有一张预期叶子证书。请用 openssl x509 检查输出。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-clcerts",
        "description": {
          "en": "Select non-CA certificate bags; this does not guarantee a single intended leaf.",
          "zh": "筛选非 CA 证书条目，不保证只有一张预期叶子证书。"
        }
      },
      {
        "name": "-nokeys",
        "description": {
          "en": "Do not output private keys.",
          "zh": "不输出私钥。"
        }
      },
      {
        "name": "-out",
        "description": {
          "en": "Output file; existing content may be overwritten.",
          "zh": "输出文件，可能覆盖已有内容。"
        }
      }
    ]
  },
  {
    "id": "openssl-p12-ca",
    "category": "openssl",
    "name": {
      "en": "Extract bundled CA certificates",
      "zh": "提取包内 CA 证书"
    },
    "command": "openssl pkcs12 -in certificate.p12 -cacerts -nokeys -out ca-chain.pem",
    "description": {
      "en": "Export the certificates classified as CA in a PKCS#12 bundle.",
      "zh": "导出 PKCS#12 包内被分类为 CA 的证书。"
    },
    "keywords": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Extract bundled CA certificates",
      "提取包内 CA 证书"
    ],
    "tags": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "May overwrite the local output file. Check the path and set appropriate file permissions.",
      "zh": "可能覆盖本地输出文件，请核对路径并设置适当文件权限。"
    },
    "examples": [
      {
        "command": "openssl pkcs12 -in certificate.p12 -cacerts -nokeys -out ca-chain.pem",
        "description": {
          "en": "Extracted CA certificates are not automatically trusted. Independently verify their source and SHA-256 fingerprints before selecting any as a trust anchor.",
          "zh": "提取出的 CA 证书不会自动可信。作为信任锚使用前，须独立核对来源及 SHA-256 指纹。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-cacerts",
        "description": {
          "en": "Select CA certificate bags, without granting them trust.",
          "zh": "筛选 CA 证书条目，不赋予其信任。"
        }
      },
      {
        "name": "-nokeys",
        "description": {
          "en": "Do not output private keys.",
          "zh": "不输出私钥。"
        }
      },
      {
        "name": "-out",
        "description": {
          "en": "Output file; existing content may be overwritten.",
          "zh": "输出文件，可能覆盖已有内容。"
        }
      }
    ]
  },
  {
    "id": "openssl-p12-encrypted-key",
    "category": "openssl",
    "name": {
      "en": "Extract an encrypted private key",
      "zh": "提取加密私钥"
    },
    "command": "openssl pkcs12 -in certificate.p12 -nocerts -out private-encrypted.pem",
    "description": {
      "en": "Export private key material with output encryption.",
      "zh": "以加密形式导出私钥材料。"
    },
    "keywords": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性",
      "Extract an encrypted private key",
      "提取加密私钥"
    ],
    "tags": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "Contains private key material. Never commit it to Git; avoid shared directories, restrict permissions and remove unnecessary copies.",
      "zh": "包含私钥材料，不得提交到 Git；避免写入共享目录，限制文件权限并清理不再需要的副本。"
    },
    "examples": [
      {
        "command": "openssl pkcs12 -in certificate.p12 -nocerts -out private-encrypted.pem",
        "description": {
          "en": "Enter the bundle password and a strong output PEM passphrase when prompted. Protect the encrypted key and its passphrase separately; encryption does not make public sharing safe.",
          "zh": "按提示输入证书包密码及强输出 PEM 口令。分别保护加密私钥及其口令，加密不代表可以公开共享。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-nocerts",
        "description": {
          "en": "Exclude certificates from output.",
          "zh": "输出中不包含证书。"
        }
      },
      {
        "name": "-out",
        "description": {
          "en": "Output file; existing content may be overwritten.",
          "zh": "输出文件，可能覆盖已有内容。"
        }
      }
    ]
  },
  {
    "id": "openssl-p12-plain-key",
    "category": "openssl",
    "name": {
      "en": "Extract an unencrypted private key",
      "zh": "导出未加密私钥"
    },
    "command": "openssl pkcs12 -in certificate.p12 -nocerts -noenc -out private.key",
    "description": {
      "en": "Write a plaintext private key using OpenSSL 3.x syntax.",
      "zh": "使用 OpenSSL 3.x 语法写出明文私钥。"
    },
    "keywords": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性",
      "Extract an unencrypted private key",
      "导出未加密私钥"
    ],
    "tags": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "danger",
    "warning": {
      "en": "Never commit plaintext private keys to Git or write them to shared directories. Use restrictive file permissions, avoid overwriting existing keys, and promptly remove plaintext copies that are no longer needed.",
      "zh": "不得将明文私钥提交到 Git 或写入共享目录。设置严格文件权限，避免覆盖已有私钥，并及时清理不再需要的明文副本。"
    },
    "examples": [
      {
        "command": "openssl pkcs12 -in certificate.p12 -nocerts -noenc -out private.key",
        "description": {
          "en": "OpenSSL 3.x uses -noenc. OpenSSL 1.1.1 uses -nodes instead; -nodes is deprecated in 3.x. Both forms expose the private key in plaintext. Enter the bundle password interactively.",
          "zh": "OpenSSL 3.x 使用 -noenc，1.1.1 使用 -nodes，后者在 3.x 已弃用。两种写法都会暴露明文私钥，证书包密码采用交互输入。"
        }
      },
      {
        "command": "openssl pkcs12 -in certificate.p12 -nocerts -nodes -out private.key",
        "description": {
          "en": "OpenSSL 1.1.1 alternative for the same operation. It also writes an unencrypted private key; apply every plaintext-key precaution.",
          "zh": "同一操作的 OpenSSL 1.1.1 替代写法，同样输出未加密私钥，必须执行全部明文私钥保护措施。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-nocerts",
        "description": {
          "en": "Exclude certificates from output.",
          "zh": "输出中不包含证书。"
        }
      },
      {
        "name": "-noenc",
        "description": {
          "en": "Do not encrypt private-key output; OpenSSL 3.x syntax replacing older -nodes.",
          "zh": "不加密私钥输出，OpenSSL 3.x 写法，替代旧版 -nodes。"
        }
      },
      {
        "name": "-out",
        "description": {
          "en": "Output file; existing content may be overwritten.",
          "zh": "输出文件，可能覆盖已有内容。"
        }
      }
    ]
  },
  {
    "id": "openssl-p12-create",
    "category": "openssl",
    "name": {
      "en": "Create a PKCS#12 bundle",
      "zh": "创建 P12 证书包"
    },
    "command": "openssl pkcs12 -export -inkey private.key -in certificate.crt -certfile intermediate.pem -out certificate.p12 -name server",
    "description": {
      "en": "Package a private key, its server certificate and intermediate CA certificates.",
      "zh": "打包私钥、对应服务器证书及中间 CA 证书。"
    },
    "keywords": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Create a PKCS#12 bundle",
      "创建 P12 证书包"
    ],
    "tags": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "Contains private key material. Never commit it to Git; avoid shared directories, restrict permissions and remove unnecessary copies.",
      "zh": "包含私钥材料，不得提交到 Git；避免写入共享目录，限制文件权限并清理不再需要的副本。"
    },
    "examples": [
      {
        "command": "openssl pkcs12 -export -inkey private.key -in certificate.crt -certfile intermediate.pem -out certificate.p12 -name server",
        "description": {
          "en": "The .crt input here is PEM-encoded. -name sets the friendly name. Decide whether to include a root according to deployment and trust requirements; packaging it does not grant trust. Check key matching first and enter the export password interactively.",
          "zh": "此处 .crt 输入为 PEM 编码，-name 设置友好名称。是否打包根证书应根据实际部署及信任要求决定，打包不会赋予信任。先检查私钥匹配，再交互设置导出密码。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-export",
        "description": {
          "en": "Create a PKCS#12 container instead of reading one.",
          "zh": "创建 PKCS#12 容器而非读取容器。"
        }
      },
      {
        "name": "-inkey",
        "description": {
          "en": "Private key corresponding to the server certificate.",
          "zh": "与服务器证书匹配的私钥。"
        }
      },
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-certfile",
        "description": {
          "en": "Additional intermediate CA certificates in PEM; including them does not grant trust.",
          "zh": "附加 PEM 中间 CA 证书，包含在包中不表示可信。"
        }
      },
      {
        "name": "-out",
        "description": {
          "en": "Output file; existing content may be overwritten.",
          "zh": "输出文件，可能覆盖已有内容。"
        }
      },
      {
        "name": "-name",
        "description": {
          "en": "Friendly name for the packaged key/certificate, server in this example.",
          "zh": "包内私钥及证书的友好名称，此处为 server。"
        }
      }
    ]
  },
  {
    "id": "openssl-p12-legacy",
    "category": "openssl",
    "name": {
      "en": "Diagnose legacy PKCS#12 compatibility",
      "zh": "诊断旧版 P12 兼容性"
    },
    "command": "openssl pkcs12 -info -in legacy.p12 -noout -legacy",
    "description": {
      "en": "Load the OpenSSL 3.x Legacy Provider to inspect older bundles.",
      "zh": "加载 OpenSSL 3.x Legacy Provider 检查旧证书包。"
    },
    "keywords": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包",
      "Diagnose legacy PKCS#12 compatibility",
      "诊断旧版 P12 兼容性",
      "P12 无法解析",
      "Legacy Provider",
      "unsupported"
    ],
    "tags": [
      "PKCS#12",
      "p12",
      "pfx",
      "证书包"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "Use legacy mode only for a diagnosed compatibility need. Do not use it unconditionally for new exports or disable integrity verification.",
      "zh": "仅在已确认的兼容场景使用旧版模式，不应对所有新导出无条件使用，也不要关闭完整性校验。"
    },
    "examples": [
      {
        "command": "openssl pkcs12 -info -in legacy.p12 -noout -legacy",
        "description": {
          "en": "For unsupported older ciphers such as RC2, check the executable version and provider installation. -legacy belongs to 3.x, not 1.1.1. Older Java runtimes can also reject newer P12 encryption/MAC algorithms; check the precise JDK update before choosing an export policy.",
          "zh": "旧 RC2 等算法不受支持时，检查可执行文件版本及 Provider 安装情况。-legacy 属于 3.x，不是 1.1.1 选项。旧 Java 运行时也可能拒绝较新 P12 加密或 MAC 算法，应先核对具体 JDK 更新版本再决定导出策略。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-info",
        "description": {
          "en": "Show PKCS#12 structure, encryption algorithms and iteration counts.",
          "zh": "显示 PKCS#12 结构、加密算法及迭代次数。"
        }
      },
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      },
      {
        "name": "-legacy",
        "description": {
          "en": "Load the OpenSSL 3.x Legacy Provider for a diagnosed compatibility need.",
          "zh": "为已确认的兼容场景加载 OpenSSL 3.x Legacy Provider。"
        }
      }
    ]
  },
  {
    "id": "openssl-x509-text",
    "category": "openssl",
    "name": {
      "en": "Inspect a complete X.509 certificate",
      "zh": "查看完整 X.509 证书"
    },
    "command": "openssl x509 -in certificate.pem -text -noout",
    "description": {
      "en": "Display certificate fields, extensions and signature details.",
      "zh": "显示证书字段、扩展及签名信息。"
    },
    "keywords": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "Inspect a complete X.509 certificate",
      "查看完整 X.509 证书"
    ],
    "tags": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl x509 -in certificate.pem -text -noout",
        "description": {
          "en": "The input is a PEM certificate, not a P12 container or private key. A .crt suffix alone does not identify PEM versus DER. Reading fields does not validate trust.",
          "zh": "输入为 PEM 证书，不是 P12 容器或私钥。.crt 后缀本身不能区分 PEM 与 DER，读取字段不等于验证信任。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-text",
        "description": {
          "en": "Display readable certificate fields and extensions.",
          "zh": "显示可读的证书字段及扩展。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      }
    ]
  },
  {
    "id": "openssl-x509-dates",
    "category": "openssl",
    "name": {
      "en": "Inspect certificate validity dates",
      "zh": "检查证书有效期"
    },
    "command": "openssl x509 -in certificate.pem -noout -dates",
    "description": {
      "en": "Print the Not Before and Not After timestamps.",
      "zh": "输出 Not Before 与 Not After 时间。"
    },
    "keywords": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "expiry",
      "expired",
      "证书已过期",
      "Inspect certificate validity dates",
      "检查证书有效期"
    ],
    "tags": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "expiry",
      "expired",
      "证书已过期"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl x509 -in certificate.pem -noout -dates",
        "description": {
          "en": "Compare both dates with the current system time: a certificate can be expired or not yet valid. Check dates on the intermediates too. This command only displays dates.",
          "zh": "同时比较两个时间与当前系统时间，证书可能已过期或尚未生效，也要检查中间证书有效期。本命令仅显示时间。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      },
      {
        "name": "-dates",
        "description": {
          "en": "Display notBefore and notAfter.",
          "zh": "显示 notBefore 与 notAfter。"
        }
      }
    ]
  },
  {
    "id": "openssl-x509-checkend",
    "category": "openssl",
    "name": {
      "en": "Check expiry within 30 days",
      "zh": "检查 30 天内是否过期"
    },
    "command": "openssl x509 -in certificate.pem -checkend 2592000 -noout",
    "description": {
      "en": "Return a nonzero status if the certificate expires within 30 days.",
      "zh": "证书将在 30 天内过期时返回非零状态。"
    },
    "keywords": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "expiry",
      "monitoring",
      "到期监控",
      "Check expiry within 30 days",
      "检查 30 天内是否过期"
    ],
    "tags": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "expiry",
      "monitoring",
      "到期监控"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl x509 -in certificate.pem -checkend 2592000 -noout",
        "description": {
          "en": "2592000 is 30 days in seconds. Zero means expiry is outside this window; nonzero can also indicate a processing error, so inspect diagnostics. Use the status in monitoring scripts, but do not infer valid Not Before, chain trust, hostname, purpose or revocation from this expiry-only check.",
          "zh": "2592000 为 30 天的秒数。零表示到期时间在窗口之外；非零也可能是处理错误，应结合诊断信息。可用于监控脚本判断，但仅检查到期时间，不能据此认定生效时间、证书链信任、域名、用途或吊销状态有效。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-checkend",
        "description": {
          "en": "Expiry window in seconds: 2592000 equals 30 days.",
          "zh": "到期检查窗口，单位秒，2592000 等于 30 天。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      }
    ]
  },
  {
    "id": "openssl-x509-identity",
    "category": "openssl",
    "name": {
      "en": "Inspect subject and issuer",
      "zh": "查看主体与颁发者"
    },
    "command": "openssl x509 -in certificate.pem -noout -subject -issuer",
    "description": {
      "en": "Display the certificate identity and issuer names.",
      "zh": "显示证书主体及颁发者名称。"
    },
    "keywords": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Inspect subject and issuer",
      "查看主体与颁发者"
    ],
    "tags": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl x509 -in certificate.pem -noout -subject -issuer",
        "description": {
          "en": "Matching issuer and subject names can suggest a chain relationship, but do not prove signatures or trust. Use openssl verify to validate the path.",
          "zh": "颁发者与主体名称对应只能提示链关系，不能证明签名或信任，请用 openssl verify 验证路径。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      },
      {
        "name": "-subject",
        "description": {
          "en": "Display the certificate subject.",
          "zh": "显示证书主体。"
        }
      },
      {
        "name": "-issuer",
        "description": {
          "en": "Display the certificate issuer.",
          "zh": "显示证书颁发者。"
        }
      }
    ]
  },
  {
    "id": "openssl-x509-san",
    "category": "openssl",
    "name": {
      "en": "Inspect Subject Alternative Names",
      "zh": "检查 SAN 域名"
    },
    "command": "openssl x509 -in certificate.pem -noout -ext subjectAltName",
    "description": {
      "en": "Display the SAN extension used for service identity matching.",
      "zh": "显示用于服务身份匹配的 SAN 扩展。"
    },
    "keywords": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "SAN",
      "hostname",
      "域名不匹配",
      "Inspect Subject Alternative Names",
      "检查 SAN 域名"
    ],
    "tags": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "SAN",
      "hostname",
      "域名不匹配"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl x509 -in certificate.pem -noout -ext subjectAltName",
        "description": {
          "en": "For hostname mismatches, check SAN DNS/IP entries, the requested hostname and SNI. -servername selects the virtual host; it does not itself validate the certificate name.",
          "zh": "域名不匹配时检查 SAN 的 DNS/IP 条目、请求域名及 SNI。-servername 选择虚拟主机，本身不验证证书名称。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      },
      {
        "name": "-ext",
        "description": {
          "en": "Comma-separated X.509 extension names to display.",
          "zh": "要显示的 X.509 扩展名，以逗号分隔。"
        }
      }
    ]
  },
  {
    "id": "openssl-x509-fingerprint",
    "category": "openssl",
    "name": {
      "en": "Inspect SHA-256 certificate fingerprint",
      "zh": "查看证书 SHA-256 指纹"
    },
    "command": "openssl x509 -in certificate.pem -noout -fingerprint -sha256",
    "description": {
      "en": "Calculate a SHA-256 fingerprint of the encoded certificate.",
      "zh": "计算证书编码的 SHA-256 指纹。"
    },
    "keywords": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "fingerprint",
      "指纹",
      "Inspect SHA-256 certificate fingerprint",
      "查看证书 SHA-256 指纹"
    ],
    "tags": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "fingerprint",
      "指纹"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl x509 -in certificate.pem -noout -fingerprint -sha256",
        "description": {
          "en": "Compare with an independently authenticated fingerprint. A match identifies the same certificate; it does not establish trust or prove possession of its private key.",
          "zh": "与经独立可信渠道获取的指纹比较。一致可确认同一证书，但不建立信任，也不证明持有私钥。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      },
      {
        "name": "-fingerprint",
        "description": {
          "en": "Display a digest of the encoded certificate, not a private-key matching check.",
          "zh": "显示证书编码摘要，不是私钥匹配检查。"
        }
      },
      {
        "name": "-sha256",
        "description": {
          "en": "Use the SHA-256 digest algorithm.",
          "zh": "使用 SHA-256 摘要算法。"
        }
      }
    ]
  },
  {
    "id": "openssl-x509-serial",
    "category": "openssl",
    "name": {
      "en": "Inspect certificate serial number",
      "zh": "查看证书序列号"
    },
    "command": "openssl x509 -in certificate.pem -noout -serial",
    "description": {
      "en": "Print the serial number assigned by the issuer.",
      "zh": "输出颁发者分配的证书序列号。"
    },
    "keywords": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "Inspect certificate serial number",
      "查看证书序列号"
    ],
    "tags": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl x509 -in certificate.pem -noout -serial",
        "description": {
          "en": "Use issuer identity together with the serial number when consulting CA or revocation records. Serial numbers are not globally unique.",
          "zh": "查询 CA 或吊销记录时结合颁发者身份及序列号，序列号并非全局唯一。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      },
      {
        "name": "-serial",
        "description": {
          "en": "Display the issuer-assigned certificate serial number.",
          "zh": "显示颁发者分配的证书序列号。"
        }
      }
    ]
  },
  {
    "id": "openssl-x509-constraints",
    "category": "openssl",
    "name": {
      "en": "Inspect CA constraints",
      "zh": "检查 CA 约束"
    },
    "command": "openssl x509 -in certificate.pem -noout -ext basicConstraints",
    "description": {
      "en": "Display CA status and path length constraints.",
      "zh": "显示 CA 标志及路径长度约束。"
    },
    "keywords": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Inspect CA constraints",
      "检查 CA 约束"
    ],
    "tags": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl x509 -in certificate.pem -noout -ext basicConstraints",
        "description": {
          "en": "CA:TRUE does not make a certificate a trusted root. Also check keyCertSign usage, signatures, path length and the independently selected trust anchor.",
          "zh": "CA:TRUE 不会使证书成为可信根，还应检查 keyCertSign 用途、签名、路径长度及独立选定的信任锚。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      },
      {
        "name": "-ext",
        "description": {
          "en": "Comma-separated X.509 extension names to display.",
          "zh": "要显示的 X.509 扩展名，以逗号分隔。"
        }
      }
    ]
  },
  {
    "id": "openssl-x509-usage",
    "category": "openssl",
    "name": {
      "en": "Inspect key and extended key usage",
      "zh": "检查 Key Usage 与 Extended Key Usage"
    },
    "command": "openssl x509 -in certificate.pem -noout -ext keyUsage,extendedKeyUsage",
    "description": {
      "en": "Display the keyUsage and extendedKeyUsage extensions.",
      "zh": "显示密钥用途与扩展密钥用途。"
    },
    "keywords": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "Key Usage",
      "Extended Key Usage",
      "EKU",
      "证书用途",
      "Inspect key and extended key usage",
      "检查 Key Usage 与 Extended Key Usage"
    ],
    "tags": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "Key Usage",
      "Extended Key Usage",
      "EKU",
      "证书用途"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl x509 -in certificate.pem -noout -ext keyUsage,extendedKeyUsage",
        "description": {
          "en": "When EKU is present, inspect serverAuth for HTTPS. Validate the chain with openssl verify -purpose sslserver; inspecting extensions alone is insufficient.",
          "zh": "若存在 EKU，应检查 HTTPS 所需的 serverAuth。结合证书链使用 openssl verify -purpose sslserver 验证，仅查看扩展并不足够。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      },
      {
        "name": "-ext",
        "description": {
          "en": "Comma-separated X.509 extension names to display.",
          "zh": "要显示的 X.509 扩展名，以逗号分隔。"
        }
      }
    ]
  },
  {
    "id": "openssl-x509-der-to-pem",
    "category": "openssl",
    "name": {
      "en": "Convert DER certificate to PEM",
      "zh": "将 DER 证书转换为 PEM"
    },
    "command": "openssl x509 -inform DER -in certificate.der -outform PEM -out certificate.pem",
    "description": {
      "en": "Convert binary DER X.509 encoding into PEM text.",
      "zh": "将二进制 DER X.509 编码转换为 PEM 文本。"
    },
    "keywords": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "DER",
      "format conversion",
      "Convert DER certificate to PEM",
      "将 DER 证书转换为 PEM"
    ],
    "tags": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "DER",
      "format conversion"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "May overwrite the local output file. Check the path and set appropriate file permissions.",
      "zh": "可能覆盖本地输出文件，请核对路径并设置适当文件权限。"
    },
    "examples": [
      {
        "command": "openssl x509 -inform DER -in certificate.der -outform PEM -out certificate.pem",
        "description": {
          "en": "This changes certificate encoding only. It does not convert a PKCS#12 container or export any private key.",
          "zh": "此操作仅改变证书编码，不转换 PKCS#12 容器，也不导出任何私钥。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-inform",
        "description": {
          "en": "Input encoding; explicitly DER for the binary certificate example.",
          "zh": "输入编码，二进制证书示例明确指定 DER。"
        }
      },
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-outform",
        "description": {
          "en": "Output encoding: PEM text or DER binary.",
          "zh": "输出编码，PEM 文本或 DER 二进制。"
        }
      },
      {
        "name": "-out",
        "description": {
          "en": "Output file; existing content may be overwritten.",
          "zh": "输出文件，可能覆盖已有内容。"
        }
      }
    ]
  },
  {
    "id": "openssl-x509-pem-to-der",
    "category": "openssl",
    "name": {
      "en": "Convert PEM certificate to DER",
      "zh": "将 PEM 证书转换为 DER"
    },
    "command": "openssl x509 -in certificate.pem -outform DER -out certificate.der",
    "description": {
      "en": "Convert PEM X.509 encoding into binary DER.",
      "zh": "将 PEM X.509 编码转换为二进制 DER。"
    },
    "keywords": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "DER",
      "format conversion",
      "Convert PEM certificate to DER",
      "将 PEM 证书转换为 DER"
    ],
    "tags": [
      "X.509",
      "PEM",
      "certificate",
      "证书检查",
      "DER",
      "format conversion"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "May overwrite the local output file. Check the path and set appropriate file permissions.",
      "zh": "可能覆盖本地输出文件，请核对路径并设置适当文件权限。"
    },
    "examples": [
      {
        "command": "openssl x509 -in certificate.pem -outform DER -out certificate.der",
        "description": {
          "en": "PEM and DER are encodings; PKCS12 and JKS are containers. Changing the file extension is not a format conversion.",
          "zh": "PEM 与 DER 表示编码方式，PKCS12 与 JKS 是容器格式，更改文件扩展名不等于格式转换。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-outform",
        "description": {
          "en": "Output encoding: PEM text or DER binary.",
          "zh": "输出编码，PEM 文本或 DER 二进制。"
        }
      },
      {
        "name": "-out",
        "description": {
          "en": "Output file; existing content may be overwritten.",
          "zh": "输出文件，可能覆盖已有内容。"
        }
      }
    ]
  },
  {
    "id": "openssl-verify-ca",
    "category": "openssl",
    "name": {
      "en": "Verify against a selected CA",
      "zh": "使用指定 CA 验证证书"
    },
    "command": "openssl verify -CAfile root-ca.pem certificate.pem",
    "description": {
      "en": "Validate a certificate using the provided CA trust file.",
      "zh": "使用给定 CA 信任文件验证证书。"
    },
    "keywords": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Verify against a selected CA",
      "使用指定 CA 验证证书"
    ],
    "tags": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl verify -CAfile root-ca.pem certificate.pem",
        "description": {
          "en": "root-ca.pem supplies chosen trust anchors, while certificate.pem is the leaf. Normal validation checks signatures, constraints and time; it does not automatically perform CRL/OCSP checks or hostname checks. Default CA paths may still apply, so this is not an isolated trust-store test.",
          "zh": "root-ca.pem 提供选定信任锚，certificate.pem 为叶子证书。通常会检查签名、约束及时间，不会自动执行 CRL/OCSP 或域名检查。默认 CA 路径仍可能参与，因此此示例不是隔离信任库测试。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-CAfile",
        "description": {
          "en": "PEM CA trust file. root-ca.pem supplies independently chosen trust anchors.",
          "zh": "PEM CA 信任文件，root-ca.pem 提供独立选定的信任锚。"
        }
      },
      {
        "name": "certificate.pem",
        "description": {
          "en": "Leaf certificate being validated, not the trust anchor.",
          "zh": "待验证的叶子证书，不是信任锚。"
        }
      }
    ]
  },
  {
    "id": "openssl-verify-intermediate",
    "category": "openssl",
    "name": {
      "en": "Build and verify a certificate chain",
      "zh": "构建并验证完整证书链"
    },
    "command": "openssl verify -CAfile root-ca.pem -untrusted intermediate.pem certificate.pem",
    "description": {
      "en": "Supply an intermediate certificate while validating a leaf.",
      "zh": "验证叶子证书时提供中间证书。"
    },
    "keywords": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Build and verify a certificate chain",
      "构建并验证完整证书链",
      "无法建立证书链",
      "missing intermediate",
      "unable to get local issuer certificate"
    ],
    "tags": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl verify -CAfile root-ca.pem -untrusted intermediate.pem certificate.pem",
        "description": {
          "en": "root-ca.pem is the trust anchor, intermediate.pem helps construct the path, and certificate.pem is the leaf. -untrusted does not grant trust. For unable to get local issuer certificate, check missing intermediates and the chosen root; matching issuer names alone is insufficient. Revocation needs a separate check.",
          "zh": "root-ca.pem 是信任锚，intermediate.pem 帮助构建路径，certificate.pem 是叶子证书。-untrusted 不赋予信任。遇到 unable to get local issuer certificate 时检查缺失中间证书及所选根，仅颁发者名称匹配并不充分。吊销状态须另行检查。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-CAfile",
        "description": {
          "en": "PEM CA trust file. root-ca.pem supplies independently chosen trust anchors.",
          "zh": "PEM CA 信任文件，root-ca.pem 提供独立选定的信任锚。"
        }
      },
      {
        "name": "-untrusted",
        "description": {
          "en": "PEM intermediate candidates used for chain construction, not trust anchors.",
          "zh": "用于构建链的 PEM 候选中间证书，不作为信任锚。"
        }
      },
      {
        "name": "certificate.pem",
        "description": {
          "en": "Leaf certificate being validated, not the trust anchor.",
          "zh": "待验证的叶子证书，不是信任锚。"
        }
      }
    ]
  },
  {
    "id": "openssl-verify-show-chain",
    "category": "openssl",
    "name": {
      "en": "Display the validated chain",
      "zh": "展示验证结果证书链"
    },
    "command": "openssl verify -show_chain -CAfile root-ca.pem -untrusted intermediate.pem certificate.pem",
    "description": {
      "en": "Print the path constructed during successful verification.",
      "zh": "输出成功验证时构建的证书路径。"
    },
    "keywords": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Display the validated chain",
      "展示验证结果证书链"
    ],
    "tags": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl verify -show_chain -CAfile root-ca.pem -untrusted intermediate.pem certificate.pem",
        "description": {
          "en": "Inspect each depth and the selected root. This is a locally built validation chain; s_client -showcerts only lists server-sent certificates and is not equivalent.",
          "zh": "检查各深度及所选根。这是本地构建并验证的链，s_client -showcerts 仅列出服务器发送的证书，两者不等价。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-show_chain",
        "description": {
          "en": "Display the chain constructed during successful verification.",
          "zh": "显示成功验证时构建的链。"
        }
      },
      {
        "name": "-CAfile",
        "description": {
          "en": "PEM CA trust file. root-ca.pem supplies independently chosen trust anchors.",
          "zh": "PEM CA 信任文件，root-ca.pem 提供独立选定的信任锚。"
        }
      },
      {
        "name": "-untrusted",
        "description": {
          "en": "PEM intermediate candidates used for chain construction, not trust anchors.",
          "zh": "用于构建链的 PEM 候选中间证书，不作为信任锚。"
        }
      },
      {
        "name": "certificate.pem",
        "description": {
          "en": "Leaf certificate being validated, not the trust anchor.",
          "zh": "待验证的叶子证书，不是信任锚。"
        }
      }
    ]
  },
  {
    "id": "openssl-verify-hostname",
    "category": "openssl",
    "name": {
      "en": "Validate chain, hostname and server purpose",
      "zh": "验证证书链、域名及服务器用途"
    },
    "command": "openssl verify -CAfile root-ca.pem -untrusted intermediate.pem -verify_hostname example.com -purpose sslserver certificate.pem",
    "description": {
      "en": "Combine CA trust validation with DNS hostname and TLS server purpose checks.",
      "zh": "组合检查 CA 信任、DNS 域名及 TLS 服务器用途。"
    },
    "keywords": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "SAN",
      "hostname",
      "浏览器不信任证书",
      "域名不匹配",
      "Validate chain, hostname and server purpose",
      "验证证书链、域名及服务器用途"
    ],
    "tags": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "SAN",
      "hostname",
      "浏览器不信任证书",
      "域名不匹配"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl verify -CAfile root-ca.pem -untrusted intermediate.pem -verify_hostname example.com -purpose sslserver certificate.pem",
        "description": {
          "en": "Chain construction, an accepted CA anchor, hostname matching, valid time and correct purpose are separate requirements requested together here. Revocation and browser-specific policy still require separate handling. Browser/OS anchors may differ from this CAfile, and other default OpenSSL trust sources may apply.",
          "zh": "证书链构建、CA 锚被信任、域名匹配、有效期内及用途正确是不同要求，此处组合请求这些检查。吊销状态及浏览器特有策略仍须另行处理。浏览器或系统的信任锚可能不同于此 CAfile，OpenSSL 的其他默认信任来源也可能参与。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-CAfile",
        "description": {
          "en": "PEM CA trust file. root-ca.pem supplies independently chosen trust anchors.",
          "zh": "PEM CA 信任文件，root-ca.pem 提供独立选定的信任锚。"
        }
      },
      {
        "name": "-untrusted",
        "description": {
          "en": "PEM intermediate candidates used for chain construction, not trust anchors.",
          "zh": "用于构建链的 PEM 候选中间证书，不作为信任锚。"
        }
      },
      {
        "name": "-verify_hostname",
        "description": {
          "en": "Check against the DNS hostname example.com.",
          "zh": "根据 DNS 域名 example.com 检查。"
        }
      },
      {
        "name": "-purpose",
        "description": {
          "en": "sslserver requests TLS server certificate purpose checks.",
          "zh": "sslserver 请求 TLS 服务器证书用途检查。"
        }
      },
      {
        "name": "certificate.pem",
        "description": {
          "en": "Leaf certificate being validated, not the trust anchor.",
          "zh": "待验证的叶子证书，不是信任锚。"
        }
      }
    ]
  },
  {
    "id": "openssl-verify-multiple-intermediates",
    "category": "openssl",
    "name": {
      "en": "Verify with multiple intermediate CAs",
      "zh": "使用多个中间 CA 验证"
    },
    "command": "openssl verify -CAfile root-ca.pem -untrusted intermediates.pem certificate.pem",
    "description": {
      "en": "Build a path from a PEM file containing several intermediate certificates.",
      "zh": "使用包含多张中间证书的 PEM 文件构建路径。"
    },
    "keywords": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Verify with multiple intermediate CAs",
      "使用多个中间 CA 验证"
    ],
    "tags": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl verify -CAfile root-ca.pem -untrusted intermediates.pem certificate.pem",
        "description": {
          "en": "intermediates.pem contains separate PEM certificate blocks for candidate intermediates. They aid chain construction without becoming trust anchors. Confirm the selected path reaches the intended trusted root.",
          "zh": "intermediates.pem 包含候选中间 CA 的多个独立 PEM 证书块。它们帮助构建链但不会成为信任锚，请确认所选路径到达预期可信根。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-CAfile",
        "description": {
          "en": "PEM CA trust file. root-ca.pem supplies independently chosen trust anchors.",
          "zh": "PEM CA 信任文件，root-ca.pem 提供独立选定的信任锚。"
        }
      },
      {
        "name": "-untrusted",
        "description": {
          "en": "PEM intermediate candidates used for chain construction, not trust anchors.",
          "zh": "用于构建链的 PEM 候选中间证书，不作为信任锚。"
        }
      },
      {
        "name": "certificate.pem",
        "description": {
          "en": "Leaf certificate being validated, not the trust anchor.",
          "zh": "待验证的叶子证书，不是信任锚。"
        }
      }
    ]
  },
  {
    "id": "openssl-verify-strict",
    "category": "openssl",
    "name": {
      "en": "Apply stricter X.509 validation",
      "zh": "执行更严格的 X.509 验证"
    },
    "command": "openssl verify -x509_strict -CAfile root-ca.pem -untrusted intermediates.pem certificate.pem",
    "description": {
      "en": "Disable compatibility workarounds for nonconforming certificates.",
      "zh": "禁用针对不规范证书的部分兼容处理。"
    },
    "keywords": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Apply stricter X.509 validation",
      "执行更严格的 X.509 验证"
    ],
    "tags": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl verify -x509_strict -CAfile root-ca.pem -untrusted intermediates.pem certificate.pem",
        "description": {
          "en": "Both OpenSSL 1.1.1 and 3.x offer -x509_strict, but checks evolve by release. Diagnose missing or invalid constraints instead of assuming identical results on every version. This does not enable revocation checking.",
          "zh": "OpenSSL 1.1.1 与 3.x 均有 -x509_strict，但检查规则随版本演进。应诊断缺失或无效约束，不应假设各版本结果一致。此选项不启用吊销检查。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-x509_strict",
        "description": {
          "en": "Apply stricter X.509 conformance checks; exact rules depend on the release.",
          "zh": "执行更严格的 X.509 合规检查，具体规则取决于版本。"
        }
      },
      {
        "name": "-CAfile",
        "description": {
          "en": "PEM CA trust file. root-ca.pem supplies independently chosen trust anchors.",
          "zh": "PEM CA 信任文件，root-ca.pem 提供独立选定的信任锚。"
        }
      },
      {
        "name": "-untrusted",
        "description": {
          "en": "PEM intermediate candidates used for chain construction, not trust anchors.",
          "zh": "用于构建链的 PEM 候选中间证书，不作为信任锚。"
        }
      },
      {
        "name": "certificate.pem",
        "description": {
          "en": "Leaf certificate being validated, not the trust anchor.",
          "zh": "待验证的叶子证书，不是信任锚。"
        }
      }
    ]
  },
  {
    "id": "openssl-verify-crl",
    "category": "openssl",
    "name": {
      "en": "Check leaf revocation using a CRL",
      "zh": "使用 CRL 检查叶子证书吊销状态"
    },
    "command": "openssl verify -CAfile root-ca.pem -untrusted intermediate.pem -CRLfile ca.crl -crl_check certificate.pem",
    "description": {
      "en": "Validate the chain and check the leaf against an applicable issuer CRL.",
      "zh": "验证链并根据适用的颁发者 CRL 检查叶子证书。"
    },
    "keywords": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "CRL",
      "OCSP",
      "revocation",
      "吊销",
      "Check leaf revocation using a CRL",
      "使用 CRL 检查叶子证书吊销状态"
    ],
    "tags": [
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "CRL",
      "OCSP",
      "revocation",
      "吊销"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl verify -CAfile root-ca.pem -untrusted intermediate.pem -CRLfile ca.crl -crl_check certificate.pem",
        "description": {
          "en": "Obtain a current, correctly signed CRL from the issuing CA; this example uses PEM. Check issuer, signature, scope and update times. -crl_check covers the leaf; -crl_check_all requires appropriate CRLs for the entire chain. No OCSP query or automatic retrieval of all needed CRLs is implied. Missing or stale CRLs cause failure.",
          "zh": "从颁发 CA 获取最新且签名正确的 CRL，此例为 PEM。检查颁发者、签名、覆盖范围及更新时间。-crl_check 检查叶子，-crl_check_all 需要整条链的相应 CRL。此操作不表示进行了 OCSP 查询或自动获取所有所需 CRL，缺失或过期会失败。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-CAfile",
        "description": {
          "en": "PEM CA trust file. root-ca.pem supplies independently chosen trust anchors.",
          "zh": "PEM CA 信任文件，root-ca.pem 提供独立选定的信任锚。"
        }
      },
      {
        "name": "-untrusted",
        "description": {
          "en": "PEM intermediate candidates used for chain construction, not trust anchors.",
          "zh": "用于构建链的 PEM 候选中间证书，不作为信任锚。"
        }
      },
      {
        "name": "-CRLfile",
        "description": {
          "en": "Issuer CRL file, PEM here; validate its signature, scope and update times.",
          "zh": "颁发者 CRL 文件，此处为 PEM，须检查签名、范围及更新时间。"
        }
      },
      {
        "name": "-crl_check",
        "description": {
          "en": "Check leaf revocation with a valid issuer CRL; this is not an OCSP query.",
          "zh": "使用有效颁发者 CRL 检查叶子吊销状态，不是 OCSP 查询。"
        }
      },
      {
        "name": "certificate.pem",
        "description": {
          "en": "Leaf certificate being validated, not the trust anchor.",
          "zh": "待验证的叶子证书，不是信任锚。"
        }
      }
    ]
  },
  {
    "id": "openssl-tls-connect",
    "category": "openssl",
    "name": {
      "en": "Inspect a live TLS connection",
      "zh": "检查线上 TLS 连接"
    },
    "command": "openssl s_client -connect example.com:443 -servername example.com",
    "description": {
      "en": "Connect to an HTTPS endpoint with explicit SNI.",
      "zh": "携带明确 SNI 连接 HTTPS 端点。"
    },
    "keywords": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "Inspect a live TLS connection",
      "检查线上 TLS 连接"
    ],
    "tags": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl s_client -connect example.com:443 -servername example.com",
        "description": {
          "en": "Inspect negotiated protocol, cipher and verification diagnostics. s_client is interactive; close input or interrupt when done. By default it can continue after certificate verification errors, so connection success does not prove trust.",
          "zh": "检查协商协议、加密套件及验证诊断。s_client 是交互式工具，完成后结束输入或中断。默认可能在证书验证错误后继续，因此连接成功不代表可信。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-connect",
        "description": {
          "en": "Remote host and TCP port; only connects when executed in your own terminal.",
          "zh": "远程主机及 TCP 端口，仅在您自己的终端执行时连接。"
        }
      },
      {
        "name": "-servername",
        "description": {
          "en": "SNI virtual-host selection, not certificate hostname validation.",
          "zh": "SNI 虚拟主机选择，不是证书域名验证。"
        }
      }
    ]
  },
  {
    "id": "openssl-tls-showcerts",
    "category": "openssl",
    "name": {
      "en": "Inspect the server-sent certificate list",
      "zh": "查看服务器实际发送的证书链"
    },
    "command": "openssl s_client -connect example.com:443 -servername example.com -showcerts",
    "description": {
      "en": "Print the certificates actually sent by the TLS server.",
      "zh": "输出 TLS 服务器实际发送的证书列表。"
    },
    "keywords": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Inspect the server-sent certificate list",
      "查看服务器实际发送的证书链",
      "服务端证书不完整",
      "missing intermediate"
    ],
    "tags": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl s_client -connect example.com:443 -servername example.com -showcerts",
        "description": {
          "en": "For an incomplete server chain, check whether the required intermediates were sent. This list is not a verified chain and normally need not include the root. Save certificates separately and validate them with openssl verify.",
          "zh": "服务端证书不完整时检查是否发送了必要的中间证书。此列表不是已验证的链，通常无需包含根证书。单独保存证书后用 openssl verify 验证。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-connect",
        "description": {
          "en": "Remote host and TCP port; only connects when executed in your own terminal.",
          "zh": "远程主机及 TCP 端口，仅在您自己的终端执行时连接。"
        }
      },
      {
        "name": "-servername",
        "description": {
          "en": "SNI virtual-host selection, not certificate hostname validation.",
          "zh": "SNI 虚拟主机选择，不是证书域名验证。"
        }
      },
      {
        "name": "-showcerts",
        "description": {
          "en": "Display the certificate list sent by the server, not a verified chain.",
          "zh": "显示服务器发送的证书列表，不是已验证的链。"
        }
      }
    ]
  },
  {
    "id": "openssl-tls-verify-hostname",
    "category": "openssl",
    "name": {
      "en": "Validate a live TLS identity",
      "zh": "验证线上 TLS 身份"
    },
    "command": "openssl s_client -connect example.com:443 -servername example.com -verify_hostname example.com -verify_return_error",
    "description": {
      "en": "Check hostname and abort on certificate verification errors.",
      "zh": "检查域名，并在证书验证错误时中止。"
    },
    "keywords": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "SAN",
      "域名不匹配",
      "Validate a live TLS identity",
      "验证线上 TLS 身份"
    ],
    "tags": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "SAN",
      "域名不匹配"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl s_client -connect example.com:443 -servername example.com -verify_hostname example.com -verify_return_error",
        "description": {
          "en": "Uses the local OpenSSL trust configuration, which can differ from browsers or Java. SNI selects a virtual host, -verify_hostname checks its name, and -verify_return_error makes certificate failures fatal. Revocation is not checked automatically.",
          "zh": "使用本地 OpenSSL 信任配置，可能与浏览器或 Java 不同。SNI 选择虚拟主机，-verify_hostname 检查域名，-verify_return_error 使证书错误中止连接。不会自动检查吊销状态。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-connect",
        "description": {
          "en": "Remote host and TCP port; only connects when executed in your own terminal.",
          "zh": "远程主机及 TCP 端口，仅在您自己的终端执行时连接。"
        }
      },
      {
        "name": "-servername",
        "description": {
          "en": "SNI virtual-host selection, not certificate hostname validation.",
          "zh": "SNI 虚拟主机选择，不是证书域名验证。"
        }
      },
      {
        "name": "-verify_hostname",
        "description": {
          "en": "Check against the DNS hostname example.com.",
          "zh": "根据 DNS 域名 example.com 检查。"
        }
      },
      {
        "name": "-verify_return_error",
        "description": {
          "en": "Abort the handshake on certificate verification errors.",
          "zh": "发生证书验证错误时中止握手。"
        }
      }
    ]
  },
  {
    "id": "openssl-tls-verify-ca",
    "category": "openssl",
    "name": {
      "en": "Validate TLS with a selected CA",
      "zh": "使用指定 CA 验证线上 TLS"
    },
    "command": "openssl s_client -connect example.com:443 -servername example.com -CAfile root-ca.pem -verify_hostname example.com -verify_return_error",
    "description": {
      "en": "Supply a CA trust file while checking the server hostname.",
      "zh": "检查服务器域名时提供 CA 信任文件。"
    },
    "keywords": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Validate TLS with a selected CA",
      "使用指定 CA 验证线上 TLS"
    ],
    "tags": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl s_client -connect example.com:443 -servername example.com -CAfile root-ca.pem -verify_hostname example.com -verify_return_error",
        "description": {
          "en": "Choose the CA independently, not by blindly accepting a root supplied by the endpoint. Review the verification result, purpose and time constraints. Other default trust sources may still participate; revocation remains separate.",
          "zh": "独立选择 CA，不要盲目信任端点提供的根证书。检查验证结果、用途及时间约束。其他默认信任来源仍可能参与，吊销检查需独立处理。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-connect",
        "description": {
          "en": "Remote host and TCP port; only connects when executed in your own terminal.",
          "zh": "远程主机及 TCP 端口，仅在您自己的终端执行时连接。"
        }
      },
      {
        "name": "-servername",
        "description": {
          "en": "SNI virtual-host selection, not certificate hostname validation.",
          "zh": "SNI 虚拟主机选择，不是证书域名验证。"
        }
      },
      {
        "name": "-CAfile",
        "description": {
          "en": "PEM CA trust file. root-ca.pem supplies independently chosen trust anchors.",
          "zh": "PEM CA 信任文件，root-ca.pem 提供独立选定的信任锚。"
        }
      },
      {
        "name": "-verify_hostname",
        "description": {
          "en": "Check against the DNS hostname example.com.",
          "zh": "根据 DNS 域名 example.com 检查。"
        }
      },
      {
        "name": "-verify_return_error",
        "description": {
          "en": "Abort the handshake on certificate verification errors.",
          "zh": "发生证书验证错误时中止握手。"
        }
      }
    ]
  },
  {
    "id": "openssl-tls-dates",
    "category": "openssl",
    "name": {
      "en": "Inspect deployed certificate dates",
      "zh": "查看已部署服务器证书有效期"
    },
    "command": "openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -dates",
    "description": {
      "en": "Extract the returned leaf certificate validity dates with a POSIX shell.",
      "zh": "使用 POSIX Shell 提取返回的叶子证书有效期。"
    },
    "keywords": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "expiry",
      "证书已过期",
      "Inspect deployed certificate dates",
      "查看已部署服务器证书有效期"
    ],
    "tags": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "expiry",
      "证书已过期"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -dates",
        "description": {
          "en": "POSIX redirection closes stdin and hides stderr. This only extracts the returned leaf and does not validate the full chain. The final pipeline status can mask a failed handshake; remove stderr suppression for diagnosis and use a separate validation command.",
          "zh": "POSIX 重定向关闭标准输入并隐藏标准错误。此操作仅提取返回的叶子证书，不是完整链校验。管道最终状态可能掩盖握手失败，诊断时取消错误隐藏，并另用验证命令。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-connect",
        "description": {
          "en": "Remote host and TCP port; only connects when executed in your own terminal.",
          "zh": "远程主机及 TCP 端口，仅在您自己的终端执行时连接。"
        }
      },
      {
        "name": "-servername",
        "description": {
          "en": "SNI virtual-host selection, not certificate hostname validation.",
          "zh": "SNI 虚拟主机选择，不是证书域名验证。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      },
      {
        "name": "-dates",
        "description": {
          "en": "Display notBefore and notAfter.",
          "zh": "显示 notBefore 与 notAfter。"
        }
      },
      {
        "name": "</dev/null 2>/dev/null |",
        "description": {
          "en": "POSIX shell: close stdin, hide stderr and pipe stdout to x509; not full chain validation.",
          "zh": "POSIX Shell：关闭标准输入、隐藏标准错误并将输出传给 x509，不是完整链验证。"
        }
      }
    ]
  },
  {
    "id": "openssl-tls-identity",
    "category": "openssl",
    "name": {
      "en": "Inspect deployed subject and issuer",
      "zh": "查看已部署证书主体与颁发者"
    },
    "command": "openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer",
    "description": {
      "en": "Extract identity fields from the live leaf certificate using POSIX redirection.",
      "zh": "使用 POSIX 重定向提取线上叶子证书身份字段。"
    },
    "keywords": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "Inspect deployed subject and issuer",
      "查看已部署证书主体与颁发者"
    ],
    "tags": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer",
        "description": {
          "en": "This inspects the returned leaf, not chain trust or hostname matching. The redirection is not Windows CMD/PowerShell syntax. Remove 2>/dev/null to see handshake diagnostics.",
          "zh": "此操作查看返回的叶子证书，不验证链信任或域名匹配。重定向写法不适用于 Windows CMD/PowerShell，移除 2>/dev/null 可查看握手诊断。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-connect",
        "description": {
          "en": "Remote host and TCP port; only connects when executed in your own terminal.",
          "zh": "远程主机及 TCP 端口，仅在您自己的终端执行时连接。"
        }
      },
      {
        "name": "-servername",
        "description": {
          "en": "SNI virtual-host selection, not certificate hostname validation.",
          "zh": "SNI 虚拟主机选择，不是证书域名验证。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      },
      {
        "name": "-subject",
        "description": {
          "en": "Display the certificate subject.",
          "zh": "显示证书主体。"
        }
      },
      {
        "name": "-issuer",
        "description": {
          "en": "Display the certificate issuer.",
          "zh": "显示证书颁发者。"
        }
      },
      {
        "name": "</dev/null 2>/dev/null |",
        "description": {
          "en": "POSIX shell: close stdin, hide stderr and pipe stdout to x509; not full chain validation.",
          "zh": "POSIX Shell：关闭标准输入、隐藏标准错误并将输出传给 x509，不是完整链验证。"
        }
      }
    ]
  },
  {
    "id": "openssl-tls-1-2",
    "category": "openssl",
    "name": {
      "en": "Probe TLS 1.2",
      "zh": "探测 TLS 1.2"
    },
    "command": "openssl s_client -connect example.com:443 -servername example.com -tls1_2",
    "description": {
      "en": "Attempt a handshake restricted to TLS 1.2.",
      "zh": "尝试仅使用 TLS 1.2 握手。"
    },
    "keywords": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "TLS 握手失败",
      "handshake",
      "cipher",
      "Probe TLS 1.2",
      "探测 TLS 1.2"
    ],
    "tags": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "TLS 握手失败",
      "handshake",
      "cipher"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl s_client -connect example.com:443 -servername example.com -tls1_2",
        "description": {
          "en": "Protocol support depends on the client OpenSSL build and server configuration. TLS 1.3 requires OpenSSL 1.1.1 or newer. Also inspect cipher policy, SNI and client-certificate requirements. Negotiating a protocol does not establish certificate validity.",
          "zh": "协议支持受客户端 OpenSSL 构建及服务端配置共同影响。TLS 1.3 需要 OpenSSL 1.1.1 以上。还须检查加密套件策略、SNI 及客户端证书要求。协议协商成功不代表证书有效。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-connect",
        "description": {
          "en": "Remote host and TCP port; only connects when executed in your own terminal.",
          "zh": "远程主机及 TCP 端口，仅在您自己的终端执行时连接。"
        }
      },
      {
        "name": "-servername",
        "description": {
          "en": "SNI virtual-host selection, not certificate hostname validation.",
          "zh": "SNI 虚拟主机选择，不是证书域名验证。"
        }
      },
      {
        "name": "-tls1_2",
        "description": {
          "en": "Attempt TLS 1.2 only.",
          "zh": "仅尝试 TLS 1.2。"
        }
      }
    ]
  },
  {
    "id": "openssl-tls-1-3",
    "category": "openssl",
    "name": {
      "en": "Probe TLS 1.3",
      "zh": "探测 TLS 1.3"
    },
    "command": "openssl s_client -connect example.com:443 -servername example.com -tls1_3",
    "description": {
      "en": "Attempt a handshake restricted to TLS 1.3.",
      "zh": "尝试仅使用 TLS 1.3 握手。"
    },
    "keywords": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "TLS 握手失败",
      "handshake",
      "cipher",
      "Probe TLS 1.3",
      "探测 TLS 1.3"
    ],
    "tags": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "TLS 握手失败",
      "handshake",
      "cipher"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl s_client -connect example.com:443 -servername example.com -tls1_3",
        "description": {
          "en": "Protocol support depends on the client OpenSSL build and server configuration. TLS 1.3 requires OpenSSL 1.1.1 or newer. Also inspect cipher policy, SNI and client-certificate requirements. Negotiating a protocol does not establish certificate validity.",
          "zh": "协议支持受客户端 OpenSSL 构建及服务端配置共同影响。TLS 1.3 需要 OpenSSL 1.1.1 以上。还须检查加密套件策略、SNI 及客户端证书要求。协议协商成功不代表证书有效。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-connect",
        "description": {
          "en": "Remote host and TCP port; only connects when executed in your own terminal.",
          "zh": "远程主机及 TCP 端口，仅在您自己的终端执行时连接。"
        }
      },
      {
        "name": "-servername",
        "description": {
          "en": "SNI virtual-host selection, not certificate hostname validation.",
          "zh": "SNI 虚拟主机选择，不是证书域名验证。"
        }
      },
      {
        "name": "-tls1_3",
        "description": {
          "en": "Attempt TLS 1.3 only; requires compatible client and server configurations.",
          "zh": "仅尝试 TLS 1.3，需要兼容的客户端及服务端配置。"
        }
      }
    ]
  },
  {
    "id": "openssl-tls-ocsp-stapling",
    "category": "openssl",
    "name": {
      "en": "Inspect OCSP stapling diagnostics",
      "zh": "检查 OCSP Stapling 诊断信息"
    },
    "command": "openssl s_client -connect example.com:443 -servername example.com -status",
    "description": {
      "en": "Request a stapled OCSP response from the TLS server.",
      "zh": "向 TLS 服务器请求装订的 OCSP 响应。"
    },
    "keywords": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "OCSP",
      "revocation",
      "吊销",
      "Inspect OCSP stapling diagnostics",
      "检查 OCSP Stapling 诊断信息"
    ],
    "tags": [
      "TLS Diagnostics",
      "HTTPS",
      "TLS",
      "SNI",
      "线上证书",
      "OCSP",
      "revocation",
      "吊销"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl s_client -connect example.com:443 -servername example.com -status",
        "description": {
          "en": "The server may not supply a response. Displaying one does not establish a verified, fresh revocation result: separately validate signature, responder authorization, certificate identity and update times using an appropriate OCSP verifier. CRL and OCSP are separate mechanisms.",
          "zh": "服务器可能不提供响应。显示响应不代表已获得经过验证且新鲜的吊销结果，仍需使用适当 OCSP 验证器检查签名、响应者授权、证书身份及更新时间。CRL 与 OCSP 是独立机制。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-connect",
        "description": {
          "en": "Remote host and TCP port; only connects when executed in your own terminal.",
          "zh": "远程主机及 TCP 端口，仅在您自己的终端执行时连接。"
        }
      },
      {
        "name": "-servername",
        "description": {
          "en": "SNI virtual-host selection, not certificate hostname validation.",
          "zh": "SNI 虚拟主机选择，不是证书域名验证。"
        }
      },
      {
        "name": "-status",
        "description": {
          "en": "Request an OCSP stapled response; display alone is not a revocation verdict.",
          "zh": "请求 OCSP 装订响应，仅显示不构成吊销结论。"
        }
      }
    ]
  },
  {
    "id": "openssl-cert-public-key",
    "category": "openssl",
    "name": {
      "en": "Extract the certificate public key",
      "zh": "提取证书公钥"
    },
    "command": "openssl x509 -in certificate.pem -pubkey -noout -out cert-public.pem",
    "description": {
      "en": "Export the certificate public key as PEM.",
      "zh": "以 PEM 导出证书公钥。"
    },
    "keywords": [
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性",
      "X.509",
      "Extract the certificate public key",
      "提取证书公钥"
    ],
    "tags": [
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性",
      "X.509"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "May overwrite the local output file. Check the path and set appropriate file permissions.",
      "zh": "可能覆盖本地输出文件，请核对路径并设置适当文件权限。"
    },
    "examples": [
      {
        "command": "openssl x509 -in certificate.pem -pubkey -noout -out cert-public.pem",
        "description": {
          "en": "Normalize this public key and the one derived from the private key to DER with openssl pkey before comparing their SHA-256 digests. Do not compare raw certificate and private-key file hashes.",
          "zh": "将此公钥及私钥导出的公钥分别用 openssl pkey 规范为 DER 后比较 SHA-256 摘要，不要比较证书文件与私钥文件的原始摘要。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-pubkey",
        "description": {
          "en": "Output the public key in the certificate.",
          "zh": "输出证书中的公钥。"
        }
      },
      {
        "name": "-noout",
        "description": {
          "en": "Suppress encoded credentials while retaining requested diagnostic fields.",
          "zh": "抑制凭据编码输出，保留请求的诊断字段。"
        }
      },
      {
        "name": "-out",
        "description": {
          "en": "Output file; existing content may be overwritten.",
          "zh": "输出文件，可能覆盖已有内容。"
        }
      }
    ]
  },
  {
    "id": "openssl-key-public-key",
    "category": "openssl",
    "name": {
      "en": "Derive the public key from a private key",
      "zh": "从私钥提取公钥"
    },
    "command": "openssl pkey -in private.key -pubout -out key-public.pem",
    "description": {
      "en": "Export only the public component of a private key.",
      "zh": "仅导出私钥中的公钥部分。"
    },
    "keywords": [
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性",
      "Derive the public key from a private key",
      "从私钥提取公钥"
    ],
    "tags": [
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "May overwrite the local output file. Check the path and set appropriate file permissions.",
      "zh": "可能覆盖本地输出文件，请核对路径并设置适当文件权限。"
    },
    "examples": [
      {
        "command": "openssl pkey -in private.key -pubout -out key-public.pem",
        "description": {
          "en": "The CLI reads the private key locally; the public output excludes private material. Enter a decryption passphrase interactively if prompted. This supports key types such as RSA and EC, unlike RSA-only modulus checks.",
          "zh": "CLI 在本地读取私钥，公钥输出不包含私钥材料。需要时交互输入解密口令。此方式适用于受支持的 RSA、EC 等类型，不限于 RSA 模数比较。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-pubout",
        "description": {
          "en": "Output only the public component of the key.",
          "zh": "仅输出密钥的公钥部分。"
        }
      },
      {
        "name": "-out",
        "description": {
          "en": "Output file; existing content may be overwritten.",
          "zh": "输出文件，可能覆盖已有内容。"
        }
      }
    ]
  },
  {
    "id": "openssl-public-digest-certificate",
    "category": "openssl",
    "name": {
      "en": "Hash certificate public key",
      "zh": "计算证书公钥指纹"
    },
    "command": "openssl pkey -pubin -in cert-public.pem -outform DER | openssl dgst -sha256",
    "description": {
      "en": "Hash the normalized DER public key for a certificate/key comparison.",
      "zh": "计算规范化 DER 公钥摘要，用于证书与私钥匹配比较。"
    },
    "keywords": [
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性",
      "SHA-256",
      "fingerprint",
      "Hash certificate public key",
      "计算证书公钥指纹"
    ],
    "tags": [
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性",
      "SHA-256",
      "fingerprint"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl pkey -pubin -in cert-public.pem -outform DER | openssl dgst -sha256",
        "description": {
          "en": "Run both public-key digest commands and ensure both pkey conversions succeed. Matching digests identify the same compared public key, not CA trust or private-key ownership. An upstream failure can yield a misleading hash of empty data. Never compare raw certificate-file and private-key-file hashes.",
          "zh": "分别执行两条公钥摘要命令，并确认两次 pkey 转换都成功。摘要一致表示所比较公钥一致，不证明 CA 信任或私钥所有权。上游失败可能产生误导性的空数据摘要。不要比较证书文件与私钥文件的原始摘要。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-pubin",
        "description": {
          "en": "Read the input as a public key rather than a private key.",
          "zh": "将输入读取为公钥而非私钥。"
        }
      },
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-outform",
        "description": {
          "en": "Output encoding: PEM text or DER binary.",
          "zh": "输出编码，PEM 文本或 DER 二进制。"
        }
      },
      {
        "name": "-sha256",
        "description": {
          "en": "Use the SHA-256 digest algorithm.",
          "zh": "使用 SHA-256 摘要算法。"
        }
      },
      {
        "name": "| openssl dgst -sha256",
        "description": {
          "en": "Hash DER public-key bytes from the upstream command; first confirm conversion succeeded.",
          "zh": "对上游命令输出的 DER 公钥字节取摘要，先确认转换成功。"
        }
      }
    ]
  },
  {
    "id": "openssl-public-digest-private",
    "category": "openssl",
    "name": {
      "en": "Hash derived public key",
      "zh": "计算私钥导出公钥指纹"
    },
    "command": "openssl pkey -pubin -in key-public.pem -outform DER | openssl dgst -sha256",
    "description": {
      "en": "Hash the normalized DER public key for a certificate/key comparison.",
      "zh": "计算规范化 DER 公钥摘要，用于证书与私钥匹配比较。"
    },
    "keywords": [
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性",
      "SHA-256",
      "fingerprint",
      "Hash derived public key",
      "计算私钥导出公钥指纹"
    ],
    "tags": [
      "Private Keys",
      "public key",
      "证书与私钥不匹配",
      "公钥一致性",
      "SHA-256",
      "fingerprint"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl pkey -pubin -in key-public.pem -outform DER | openssl dgst -sha256",
        "description": {
          "en": "Run both public-key digest commands and ensure both pkey conversions succeed. Matching digests identify the same compared public key, not CA trust or private-key ownership. An upstream failure can yield a misleading hash of empty data. Never compare raw certificate-file and private-key-file hashes.",
          "zh": "分别执行两条公钥摘要命令，并确认两次 pkey 转换都成功。摘要一致表示所比较公钥一致，不证明 CA 信任或私钥所有权。上游失败可能产生误导性的空数据摘要。不要比较证书文件与私钥文件的原始摘要。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-pubin",
        "description": {
          "en": "Read the input as a public key rather than a private key.",
          "zh": "将输入读取为公钥而非私钥。"
        }
      },
      {
        "name": "-in",
        "description": {
          "en": "Input file; its required format depends on the subcommand.",
          "zh": "输入文件，所需格式取决于子命令。"
        }
      },
      {
        "name": "-outform",
        "description": {
          "en": "Output encoding: PEM text or DER binary.",
          "zh": "输出编码，PEM 文本或 DER 二进制。"
        }
      },
      {
        "name": "-sha256",
        "description": {
          "en": "Use the SHA-256 digest algorithm.",
          "zh": "使用 SHA-256 摘要算法。"
        }
      },
      {
        "name": "| openssl dgst -sha256",
        "description": {
          "en": "Hash DER public-key bytes from the upstream command; first confirm conversion succeeded.",
          "zh": "对上游命令输出的 DER 公钥字节取摘要，先确认转换成功。"
        }
      }
    ]
  },
  {
    "id": "openssl-version",
    "category": "openssl",
    "name": {
      "en": "Inspect OpenSSL build information",
      "zh": "检查 OpenSSL 版本与构建"
    },
    "command": "openssl version -a",
    "description": {
      "en": "Display the executable version, build settings and installation paths.",
      "zh": "显示可执行文件版本、构建设置及安装路径。"
    },
    "keywords": [
      "OpenSSL",
      "version",
      "Legacy Provider",
      "P12 无法解析",
      "TLS 握手失败",
      "Inspect OpenSSL build information",
      "检查 OpenSSL 版本与构建"
    ],
    "tags": [
      "OpenSSL",
      "version",
      "Legacy Provider",
      "P12 无法解析",
      "TLS 握手失败"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "openssl version -a",
        "description": {
          "en": "Check the actual openssl executable, not just the OS version. macOS may supply LibreSSL; select an OpenSSL installation for OpenSSL-specific options. OpenSSL 1.1.1 has no 3.x provider architecture.",
          "zh": "检查实际 openssl 可执行文件，而非仅看系统版本。macOS 可能提供 LibreSSL，使用 OpenSSL 特有参数时应选用 OpenSSL 安装。1.1.1 不具备 3.x Provider 架构。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-a",
        "description": {
          "en": "Display all OpenSSL version and build information.",
          "zh": "显示全部 OpenSSL 版本及构建信息。"
        }
      }
    ]
  },
  {
    "id": "keytool-p12-list",
    "category": "keytool",
    "name": {
      "en": "Inspect PKCS12 entries and chains",
      "zh": "检查 P12 条目及证书链"
    },
    "command": "keytool -list -v -keystore certificate.p12 -storetype PKCS12",
    "description": {
      "en": "List aliases, entry types, stored chain lengths and validity dates.",
      "zh": "列出别名、条目类型、存储链长度及有效期。"
    },
    "keywords": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Inspect PKCS12 entries and chains",
      "检查 P12 条目及证书链"
    ],
    "tags": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "keytool -list -v -keystore certificate.p12 -storetype PKCS12",
        "description": {
          "en": "PrivateKeyEntry holds a private key and chain; trustedCertEntry is a trusted certificate entry; SecretKeyEntry holds a symmetric key and has no X.509 chain. Inspect Certificate chain length and every certificate validity period. Stored certificates do not prove a validated trust path. Replace certificate.p12 with server.p12 for the deployed bundle.",
          "zh": "PrivateKeyEntry 保存私钥及证书链；trustedCertEntry 是可信证书条目；SecretKeyEntry 保存对称密钥，不含 X.509 链。检查 Certificate chain length 及每张证书有效期。存储证书不等于信任路径已验证，部署包可将 certificate.p12 替换为 server.p12。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-list",
        "description": {
          "en": "List entries; listing is not trust-path validation.",
          "zh": "列出条目，列出不等于信任路径验证。"
        }
      },
      {
        "name": "-v",
        "description": {
          "en": "Display verbose entry and certificate information.",
          "zh": "显示详细条目及证书信息。"
        }
      },
      {
        "name": "-keystore",
        "description": {
          "en": "Keystore path; check that the application uses this exact store.",
          "zh": "证书库路径，请确认应用使用的确实是此库。"
        }
      },
      {
        "name": "-storetype",
        "description": {
          "en": "Explicit container format, PKCS12 in these examples.",
          "zh": "明确容器格式，这些示例使用 PKCS12。"
        }
      }
    ]
  },
  {
    "id": "keytool-p12-alias",
    "category": "keytool",
    "name": {
      "en": "Inspect a selected alias",
      "zh": "查看指定别名"
    },
    "command": "keytool -list -v -alias server -keystore server.p12 -storetype PKCS12",
    "description": {
      "en": "Show one entry and its stored certificate chain.",
      "zh": "查看单个条目及其存储的证书链。"
    },
    "keywords": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链",
      "Inspect a selected alias",
      "查看指定别名"
    ],
    "tags": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "Certificate Chain",
      "Certificate Validation",
      "certificate chain",
      "证书链",
      "CA",
      "信任链"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "keytool -list -v -alias server -keystore server.p12 -storetype PKCS12",
        "description": {
          "en": "Confirm the server alias exists and is a PrivateKeyEntry for server identity. Check the leaf, issuer order and chain length. A trustedCertEntry alone cannot provide a server private key.",
          "zh": "确认 server 别名存在，服务器身份条目应为 PrivateKeyEntry。检查叶子证书、颁发者顺序及链长度，仅 trustedCertEntry 不能提供服务器私钥。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-list",
        "description": {
          "en": "List entries; listing is not trust-path validation.",
          "zh": "列出条目，列出不等于信任路径验证。"
        }
      },
      {
        "name": "-v",
        "description": {
          "en": "Display verbose entry and certificate information.",
          "zh": "显示详细条目及证书信息。"
        }
      },
      {
        "name": "-alias",
        "description": {
          "en": "Select or create the named entry.",
          "zh": "选择或创建指定名称的条目。"
        }
      },
      {
        "name": "-keystore",
        "description": {
          "en": "Keystore path; check that the application uses this exact store.",
          "zh": "证书库路径，请确认应用使用的确实是此库。"
        }
      },
      {
        "name": "-storetype",
        "description": {
          "en": "Explicit container format, PKCS12 in these examples.",
          "zh": "明确容器格式，这些示例使用 PKCS12。"
        }
      }
    ]
  },
  {
    "id": "keytool-jks-to-p12",
    "category": "keytool",
    "name": {
      "en": "Convert JKS to PKCS12",
      "zh": "将 JKS 转换为 P12"
    },
    "command": "keytool -importkeystore -srckeystore server.jks -srcstoretype JKS -destkeystore server.p12 -deststoretype PKCS12",
    "description": {
      "en": "Import JKS entries into a PKCS12 keystore.",
      "zh": "将 JKS 条目导入 PKCS12 证书库。"
    },
    "keywords": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "JKS",
      "conversion",
      "Convert JKS to PKCS12",
      "将 JKS 转换为 P12"
    ],
    "tags": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "JKS",
      "conversion"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "Writes sensitive keystore data and may replace entries. Back up both files and protect the resulting store.",
      "zh": "写入敏感证书库数据且可能替换条目，请备份两个文件并保护输出库。"
    },
    "examples": [
      {
        "command": "keytool -importkeystore -srckeystore server.jks -srcstoretype JKS -destkeystore server.p12 -deststoretype PKCS12",
        "description": {
          "en": "Back up source and destination first. After conversion, list the output to inspect aliases, private-key entries and complete chains. Alias collisions can overwrite entries. JKS cannot represent all PKCS12 entry types, including SecretKeyEntry; review import errors. Enter passwords interactively and check the target JDK can read the resulting algorithms.",
          "zh": "先备份源与目标。转换后列出输出，检查别名、私钥条目及完整链，别名冲突可能覆盖条目。JKS 无法表示所有 PKCS12 条目类型，例如 SecretKeyEntry，请检查导入错误。交互输入密码，并确认目标 JDK 能读取输出所用算法。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-importkeystore",
        "description": {
          "en": "Import entries into a destination store; alias collisions can replace data.",
          "zh": "将条目导入目标库，别名冲突可能替换数据。"
        }
      },
      {
        "name": "-srckeystore",
        "description": {
          "en": "Source keystore file; back up before conversion.",
          "zh": "源证书库文件，转换前备份。"
        }
      },
      {
        "name": "-srcstoretype",
        "description": {
          "en": "Source container format, JKS or PKCS12.",
          "zh": "源容器格式，JKS 或 PKCS12。"
        }
      },
      {
        "name": "-destkeystore",
        "description": {
          "en": "Destination store file; back up existing content.",
          "zh": "目标证书库文件，请先备份已有内容。"
        }
      },
      {
        "name": "-deststoretype",
        "description": {
          "en": "Destination container format, JKS or PKCS12.",
          "zh": "目标容器格式，JKS 或 PKCS12。"
        }
      }
    ]
  },
  {
    "id": "keytool-p12-to-jks",
    "category": "keytool",
    "name": {
      "en": "Convert PKCS12 to JKS",
      "zh": "将 P12 转换为 JKS"
    },
    "command": "keytool -importkeystore -srckeystore server.p12 -srcstoretype PKCS12 -destkeystore server.jks -deststoretype JKS",
    "description": {
      "en": "Import compatible PKCS12 entries into a JKS keystore.",
      "zh": "将兼容的 PKCS12 条目导入 JKS 证书库。"
    },
    "keywords": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "JKS",
      "conversion",
      "Convert PKCS12 to JKS",
      "将 P12 转换为 JKS"
    ],
    "tags": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "JKS",
      "conversion"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "Back up before conversion and verify every imported alias and chain. Unsupported entries can fail to import; command completion does not prove every entry was preserved.",
      "zh": "转换前备份并核查每个导入别名及链。不支持的条目可能导入失败，命令结束不代表所有条目都已保留。"
    },
    "examples": [
      {
        "command": "keytool -importkeystore -srckeystore server.p12 -srcstoretype PKCS12 -destkeystore server.jks -deststoretype JKS",
        "description": {
          "en": "Back up source and destination first. After conversion, list the output to inspect aliases, private-key entries and complete chains. Alias collisions can overwrite entries. JKS cannot represent all PKCS12 entry types, including SecretKeyEntry; review import errors. Enter passwords interactively and check the target JDK can read the resulting algorithms.",
          "zh": "先备份源与目标。转换后列出输出，检查别名、私钥条目及完整链，别名冲突可能覆盖条目。JKS 无法表示所有 PKCS12 条目类型，例如 SecretKeyEntry，请检查导入错误。交互输入密码，并确认目标 JDK 能读取输出所用算法。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-importkeystore",
        "description": {
          "en": "Import entries into a destination store; alias collisions can replace data.",
          "zh": "将条目导入目标库，别名冲突可能替换数据。"
        }
      },
      {
        "name": "-srckeystore",
        "description": {
          "en": "Source keystore file; back up before conversion.",
          "zh": "源证书库文件，转换前备份。"
        }
      },
      {
        "name": "-srcstoretype",
        "description": {
          "en": "Source container format, JKS or PKCS12.",
          "zh": "源容器格式，JKS 或 PKCS12。"
        }
      },
      {
        "name": "-destkeystore",
        "description": {
          "en": "Destination store file; back up existing content.",
          "zh": "目标证书库文件，请先备份已有内容。"
        }
      },
      {
        "name": "-deststoretype",
        "description": {
          "en": "Destination container format, JKS or PKCS12.",
          "zh": "目标容器格式，JKS 或 PKCS12。"
        }
      }
    ]
  },
  {
    "id": "keytool-default-cacerts",
    "category": "keytool",
    "name": {
      "en": "Inspect Java default trust anchors",
      "zh": "检查 Java 默认信任库"
    },
    "command": "keytool -list -cacerts",
    "description": {
      "en": "List certificates in the selected JDK runtime cacerts.",
      "zh": "列出所选 JDK 运行时 cacerts 中的证书。"
    },
    "keywords": [
      "TrustStore",
      "truststore",
      "PKIX",
      "Java PKIX path building failed",
      "CA",
      "信任库",
      "Inspect Java default trust anchors",
      "检查 Java 默认信任库"
    ],
    "tags": [
      "TrustStore",
      "truststore",
      "PKIX",
      "Java PKIX path building failed",
      "CA",
      "信任库"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "keytool -list -cacerts",
        "description": {
          "en": "Use on modern JDKs such as 11/17/21; confirm availability with the installed keytool -help. Older JDK 8 builds may require -keystore with the actual runtime cacerts path. PKIX failures depend on the application JVM and its javax.net.ssl.trustStore configuration, not necessarily this default store.",
          "zh": "用于 JDK 11/17/21 等现代版本，先用已安装的 keytool -help 确认支持。旧 JDK 8 构建可能需要通过 -keystore 指定实际运行时 cacerts 路径。PKIX 故障取决于应用 JVM 及 javax.net.ssl.trustStore 配置，不一定使用该默认库。"
        }
      },
      {
        "command": "keytool -list -keystore \"java-runtime/lib/security/cacerts\"",
        "description": {
          "en": "Older JDK 8 fallback: replace this fictional path with the actual java.home/lib/security/cacerts path, often inside the JDK jre directory. Enter the configured password interactively.",
          "zh": "旧 JDK 8 替代写法：将此虚构路径替换为实际 java.home/lib/security/cacerts 路径，通常位于 JDK 的 jre 目录下，交互输入已配置密码。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-list",
        "description": {
          "en": "List entries; listing is not trust-path validation.",
          "zh": "列出条目，列出不等于信任路径验证。"
        }
      },
      {
        "name": "-cacerts",
        "description": {
          "en": "Access the selected Java runtime cacerts store; do not combine with -keystore or -storetype.",
          "zh": "访问所选 Java 运行时 cacerts，不与 -keystore 或 -storetype 同用。"
        }
      }
    ]
  },
  {
    "id": "keytool-import-ca",
    "category": "keytool",
    "name": {
      "en": "Import a verified CA into a custom TrustStore",
      "zh": "向自定义 TrustStore 导入已核实 CA"
    },
    "command": "keytool -importcert -trustcacerts -alias internal-ca -file root-ca.pem -keystore truststore.p12 -storetype PKCS12",
    "description": {
      "en": "Add a CA to an application trust store only after independent verification.",
      "zh": "独立验证后才向应用信任库添加 CA。"
    },
    "keywords": [
      "TrustStore",
      "truststore",
      "PKIX",
      "Java PKIX path building failed",
      "CA",
      "信任库",
      "Certificate Import / Export",
      "Import a verified CA into a custom TrustStore",
      "向自定义 TrustStore 导入已核实 CA"
    ],
    "tags": [
      "TrustStore",
      "truststore",
      "PKIX",
      "Java PKIX path building failed",
      "CA",
      "信任库",
      "Certificate Import / Export"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "danger",
    "warning": {
      "en": "Changes application trust and can cause certificates issued by this CA to be accepted. Verify CA provenance and fingerprint, back up the TrustStore and check the alias. Never blindly trust unknown certificates.",
      "zh": "修改应用信任范围，可能使此 CA 签发的证书被接受。核实 CA 来源及指纹，备份 TrustStore 并核对别名，切勿盲目信任未知证书。"
    },
    "examples": [
      {
        "command": "keytool -importcert -trustcacerts -alias internal-ca -file root-ca.pem -keystore truststore.p12 -storetype PKCS12",
        "description": {
          "en": "Keep the confirmation prompt. -trustcacerts consults cacerts while building trust; it does not authenticate an unknown CA. Independently check the source and SHA-256 fingerprint before accepting. For Java PKIX path building failed, inspect the actual application store and missing server intermediates; do not blindly import the server leaf or disable validation.",
          "zh": "保留确认提示。-trustcacerts 在构建信任时参考 cacerts，但不会认证未知 CA。接受前独立检查来源及 SHA-256 指纹。遇到 Java PKIX path building failed 时检查应用实际信任库及服务端缺失中间证书，不要盲目导入服务器叶子或关闭验证。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-importcert",
        "description": {
          "en": "Import a certificate after independent verification and confirmation.",
          "zh": "独立验证并确认后导入证书。"
        }
      },
      {
        "name": "-trustcacerts",
        "description": {
          "en": "Consult cacerts while establishing trust; does not authenticate unknown input.",
          "zh": "建立信任时参考 cacerts，不会认证未知输入。"
        }
      },
      {
        "name": "-alias",
        "description": {
          "en": "Select or create the named entry.",
          "zh": "选择或创建指定名称的条目。"
        }
      },
      {
        "name": "-file",
        "description": {
          "en": "Input certificate for import/print, or output certificate for export.",
          "zh": "导入或查看时为输入证书，导出时为输出证书。"
        }
      },
      {
        "name": "-keystore",
        "description": {
          "en": "Keystore path; check that the application uses this exact store.",
          "zh": "证书库路径，请确认应用使用的确实是此库。"
        }
      },
      {
        "name": "-storetype",
        "description": {
          "en": "Explicit container format, PKCS12 in these examples.",
          "zh": "明确容器格式，这些示例使用 PKCS12。"
        }
      }
    ]
  },
  {
    "id": "keytool-remote-certificate",
    "category": "keytool",
    "name": {
      "en": "Inspect a remote certificate with Java",
      "zh": "使用 Java 查看远程服务器证书"
    },
    "command": "keytool -printcert -sslserver example.com:443",
    "description": {
      "en": "Display certificates obtained from a remote TLS endpoint.",
      "zh": "显示从远程 TLS 端点取得的证书。"
    },
    "keywords": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "Java TLS",
      "TLS Diagnostics",
      "Inspect a remote certificate with Java",
      "使用 Java 查看远程服务器证书"
    ],
    "tags": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "Java TLS",
      "TLS Diagnostics"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "keytool -printcert -sslserver example.com:443",
        "description": {
          "en": "Available in JDK 8/11/17/21, subject to enabled protocols and security policies. Printing certificates does not prove application TrustStore acceptance or hostname validation. Compare with OpenSSL hostname checks and the application JVM configuration.",
          "zh": "JDK 8/11/17/21 可用，受启用协议及安全策略限制。显示证书不证明应用 TrustStore 接受服务器，也不证明域名验证成功。请结合 OpenSSL 域名检查及应用 JVM 配置排查。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-printcert",
        "description": {
          "en": "Display certificate information without changing a store.",
          "zh": "显示证书信息，不修改证书库。"
        }
      },
      {
        "name": "-sslserver",
        "description": {
          "en": "Remote TLS hostname and port for certificate inspection.",
          "zh": "用于检查证书的远程 TLS 主机名及端口。"
        }
      }
    ]
  },
  {
    "id": "keytool-truststore-list",
    "category": "keytool",
    "name": {
      "en": "Inspect a custom Java TrustStore",
      "zh": "检查自定义 Java TrustStore"
    },
    "command": "keytool -list -v -keystore truststore.p12 -storetype PKCS12",
    "description": {
      "en": "Inspect aliases, fingerprints and dates in the configured trust store.",
      "zh": "检查指定信任库中的别名、指纹及日期。"
    },
    "keywords": [
      "TrustStore",
      "truststore",
      "PKIX",
      "Java PKIX path building failed",
      "CA",
      "信任库",
      "Inspect a custom Java TrustStore",
      "检查自定义 Java TrustStore"
    ],
    "tags": [
      "TrustStore",
      "truststore",
      "PKIX",
      "Java PKIX path building failed",
      "CA",
      "信任库"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "keytool -list -v -keystore truststore.p12 -storetype PKCS12",
        "description": {
          "en": "Use the path actually configured for the application JVM. Check trustedCertEntry CA entries, expiry and fingerprints. Whether a KeyStore acts as a TrustStore is determined by configuration, not its filename. Listing entries does not perform Java PKIX validation.",
          "zh": "使用应用 JVM 实际配置的路径，检查 trustedCertEntry CA 条目、有效期及指纹。KeyStore 是否用作 TrustStore 由配置决定，不由文件名决定。列出条目不执行 Java PKIX 验证。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-list",
        "description": {
          "en": "List entries; listing is not trust-path validation.",
          "zh": "列出条目，列出不等于信任路径验证。"
        }
      },
      {
        "name": "-v",
        "description": {
          "en": "Display verbose entry and certificate information.",
          "zh": "显示详细条目及证书信息。"
        }
      },
      {
        "name": "-keystore",
        "description": {
          "en": "Keystore path; check that the application uses this exact store.",
          "zh": "证书库路径，请确认应用使用的确实是此库。"
        }
      },
      {
        "name": "-storetype",
        "description": {
          "en": "Explicit container format, PKCS12 in these examples.",
          "zh": "明确容器格式，这些示例使用 PKCS12。"
        }
      }
    ]
  },
  {
    "id": "keytool-export-certificate",
    "category": "keytool",
    "name": {
      "en": "Export an alias certificate as PEM",
      "zh": "以 PEM 导出别名证书"
    },
    "command": "keytool -exportcert -rfc -alias server -keystore server.p12 -storetype PKCS12 -file certificate.pem",
    "description": {
      "en": "Export the certificate for an alias without its private key.",
      "zh": "导出别名对应证书，不包含私钥。"
    },
    "keywords": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "Certificate Import / Export",
      "PEM",
      "Export an alias certificate as PEM",
      "以 PEM 导出别名证书"
    ],
    "tags": [
      "KeyStore",
      "PKCS12",
      "p12",
      "pfx",
      "Java",
      "证书库",
      "Certificate Import / Export",
      "PEM"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "warning": {
      "en": "May overwrite the local output file. Check the path and set appropriate file permissions.",
      "zh": "可能覆盖本地输出文件，请核对路径并设置适当文件权限。"
    },
    "examples": [
      {
        "command": "keytool -exportcert -rfc -alias server -keystore server.p12 -storetype PKCS12 -file certificate.pem",
        "description": {
          "en": "-rfc outputs PEM text; without it, export defaults to binary DER. For a PrivateKeyEntry, only the first certificate is exported, not the complete chain. Inspect the stored chain with -list -v.",
          "zh": "-rfc 输出 PEM 文本，不加此参数默认导出二进制 DER。对于 PrivateKeyEntry，仅导出第一张证书而非完整链。用 -list -v 检查存储链。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-exportcert",
        "description": {
          "en": "Export an alias certificate, excluding its private key and full chain.",
          "zh": "导出别名证书，不包含私钥或完整链。"
        }
      },
      {
        "name": "-rfc",
        "description": {
          "en": "Output PEM certificate text instead of the default binary DER.",
          "zh": "输出 PEM 证书文本而非默认二进制 DER。"
        }
      },
      {
        "name": "-alias",
        "description": {
          "en": "Select or create the named entry.",
          "zh": "选择或创建指定名称的条目。"
        }
      },
      {
        "name": "-keystore",
        "description": {
          "en": "Keystore path; check that the application uses this exact store.",
          "zh": "证书库路径，请确认应用使用的确实是此库。"
        }
      },
      {
        "name": "-storetype",
        "description": {
          "en": "Explicit container format, PKCS12 in these examples.",
          "zh": "明确容器格式，这些示例使用 PKCS12。"
        }
      },
      {
        "name": "-file",
        "description": {
          "en": "Input certificate for import/print, or output certificate for export.",
          "zh": "导入或查看时为输入证书，导出时为输出证书。"
        }
      }
    ]
  },
  {
    "id": "keytool-print-file",
    "category": "keytool",
    "name": {
      "en": "Inspect a CA before importing",
      "zh": "导入前检查 CA 证书"
    },
    "command": "keytool -printcert -v -file root-ca.pem",
    "description": {
      "en": "Display certificate fields and fingerprints without modifying any store.",
      "zh": "显示证书字段及指纹，不修改证书库。"
    },
    "keywords": [
      "TrustStore",
      "truststore",
      "PKIX",
      "Java PKIX path building failed",
      "CA",
      "信任库",
      "Certificate Import / Export",
      "fingerprint",
      "Inspect a CA before importing",
      "导入前检查 CA 证书"
    ],
    "tags": [
      "TrustStore",
      "truststore",
      "PKIX",
      "Java PKIX path building failed",
      "CA",
      "信任库",
      "Certificate Import / Export",
      "fingerprint"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "examples": [
      {
        "command": "keytool -printcert -v -file root-ca.pem",
        "description": {
          "en": "JDK 8/11/17/21 can read PEM or DER certificate files here. Compare the SHA-256 fingerprint with an independently authenticated CA source. Viewing certificate data does not establish trust.",
          "zh": "JDK 8/11/17/21 此处可读取 PEM 或 DER 证书。与经独立可信渠道获得的 CA SHA-256 指纹比较，仅查看证书数据不建立信任。"
        }
      }
    ],
    "parameters": [
      {
        "name": "-printcert",
        "description": {
          "en": "Display certificate information without changing a store.",
          "zh": "显示证书信息，不修改证书库。"
        }
      },
      {
        "name": "-v",
        "description": {
          "en": "Display verbose entry and certificate information.",
          "zh": "显示详细条目及证书信息。"
        }
      },
      {
        "name": "-file",
        "description": {
          "en": "Input certificate for import/print, or output certificate for export.",
          "zh": "导入或查看时为输入证书，导出时为输出证书。"
        }
      }
    ]
  }
];

