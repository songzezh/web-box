import type { CommandEntry } from './types'

export const commandCategories = [
  {
    "id": "git",
    "name": {
      "en": "Git",
      "zh": "Git 版本控制"
    }
  },
  {
    "id": "docker",
    "name": {
      "en": "Docker",
      "zh": "Docker 容器"
    }
  },
  {
    "id": "linux",
    "name": {
      "en": "Linux / Shell",
      "zh": "Linux / Shell"
    }
  },
  {
    "id": "npm",
    "name": {
      "en": "npm",
      "zh": "npm 包管理"
    }
  },
  {
    "id": "pnpm",
    "name": {
      "en": "pnpm",
      "zh": "pnpm 包管理"
    }
  },
  {
    "id": "nodejs",
    "name": {
      "en": "Node.js",
      "zh": "Node.js"
    }
  },
  {
    "id": "network",
    "name": {
      "en": "Networking",
      "zh": "网络诊断"
    }
  },
  {
    "id": "system",
    "name": {
      "en": "System & Processes",
      "zh": "系统与进程"
    }
  }
] as const

export const commands: CommandEntry[] = [
  {
    "id": "git-init",
    "category": "git",
    "name": {
      "en": "Initialize repository",
      "zh": "初始化仓库"
    },
    "command": "git init",
    "description": {
      "en": "Create an empty Git repository.",
      "zh": "创建空 Git 仓库。"
    },
    "keywords": [
      "git",
      "init",
      "Initialize repository",
      "初始化仓库"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "git-clone",
    "category": "git",
    "name": {
      "en": "Clone repository",
      "zh": "克隆仓库"
    },
    "command": "git clone <repository-url>",
    "description": {
      "en": "Download a repository and its history.",
      "zh": "下载仓库及其历史。"
    },
    "keywords": [
      "git",
      "clone",
      "Clone repository",
      "克隆仓库"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<repository-url>",
        "description": {
          "en": "Repository URL",
          "zh": "仓库地址"
        }
      }
    ],
    "examples": [
      {
        "command": "git clone https://example.com/team/project.git",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "git-status",
    "category": "git",
    "name": {
      "en": "Working tree status",
      "zh": "查看工作区状态"
    },
    "command": "git status",
    "description": {
      "en": "Show changed and staged files.",
      "zh": "显示已修改和已暂存的文件。"
    },
    "keywords": [
      "git",
      "status",
      "Working tree status",
      "查看工作区状态"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "git-diff",
    "category": "git",
    "name": {
      "en": "Unstaged changes",
      "zh": "查看未暂存差异"
    },
    "command": "git diff",
    "description": {
      "en": "Compare working files with the index.",
      "zh": "比较工作区与暂存区。"
    },
    "keywords": [
      "git",
      "diff",
      "Unstaged changes",
      "查看未暂存差异"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "git-staged",
    "category": "git",
    "name": {
      "en": "Staged changes",
      "zh": "查看暂存差异"
    },
    "command": "git diff --staged",
    "description": {
      "en": "Compare the index with the last commit.",
      "zh": "比较暂存区与上次提交。"
    },
    "keywords": [
      "git",
      "staged",
      "Staged changes",
      "查看暂存差异"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "--staged",
        "description": {
          "en": "Compare staged changes against HEAD.",
          "zh": "比较暂存区与 HEAD 的差异。"
        }
      }
    ],
    "examples": [
      {
        "command": "git diff --staged",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "git-add",
    "category": "git",
    "name": {
      "en": "Stage file",
      "zh": "暂存文件"
    },
    "command": "git add <file>",
    "description": {
      "en": "Add a file to the index.",
      "zh": "将文件添加至暂存区。"
    },
    "keywords": [
      "git",
      "add",
      "Stage file",
      "暂存文件"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "git add app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "git-commit",
    "category": "git",
    "name": {
      "en": "Commit changes",
      "zh": "提交更改"
    },
    "command": "git commit -m \"<message>\"",
    "description": {
      "en": "Record staged changes with a message.",
      "zh": "记录暂存更改并附带提交信息。"
    },
    "keywords": [
      "git",
      "commit",
      "Commit changes",
      "提交更改"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-m",
        "description": {
          "en": "Use the following text as the commit message.",
          "zh": "使用后面的文本作为提交信息。"
        }
      },
      {
        "name": "<message>",
        "description": {
          "en": "Commit or stash message",
          "zh": "提交或暂存信息"
        }
      }
    ],
    "examples": [
      {
        "command": "git commit -m \"update documentation\"",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "git-branch",
    "category": "git",
    "name": {
      "en": "List branches",
      "zh": "列出分支"
    },
    "command": "git branch",
    "description": {
      "en": "List local branches.",
      "zh": "列出本地分支。"
    },
    "keywords": [
      "git",
      "branch",
      "List branches",
      "列出分支"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "git-switch-create",
    "category": "git",
    "name": {
      "en": "Create and switch branch",
      "zh": "创建并切换分支"
    },
    "command": "git switch -c <branch-name>",
    "description": {
      "en": "Create a new branch from HEAD and switch to it.",
      "zh": "从 HEAD 创建新分支并切换。"
    },
    "keywords": [
      "git",
      "switch-create",
      "Create and switch branch",
      "创建并切换分支"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-c",
        "description": {
          "en": "Create a new branch before switching. Requires Git 2.23+.",
          "zh": "先创建新分支再切换，需要 Git 2.23 以上。"
        }
      },
      {
        "name": "<branch-name>",
        "description": {
          "en": "Target branch name",
          "zh": "目标分支名称"
        }
      }
    ],
    "examples": [
      {
        "command": "git switch -c feature/login",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "git-switch",
    "category": "git",
    "name": {
      "en": "Switch branch",
      "zh": "切换分支"
    },
    "command": "git switch <branch-name>",
    "description": {
      "en": "Switch to an existing local branch.",
      "zh": "切换至已有本地分支。"
    },
    "keywords": [
      "git",
      "switch",
      "Switch branch",
      "切换分支"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<branch-name>",
        "description": {
          "en": "Target branch name",
          "zh": "目标分支名称"
        }
      }
    ],
    "examples": [
      {
        "command": "git switch feature/login",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "git-merge",
    "category": "git",
    "name": {
      "en": "Merge branch",
      "zh": "合并分支"
    },
    "command": "git merge <branch-name>",
    "description": {
      "en": "Merge another branch into the current branch.",
      "zh": "将另一分支合并至当前分支。"
    },
    "keywords": [
      "git",
      "merge",
      "Merge branch",
      "合并分支"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<branch-name>",
        "description": {
          "en": "Target branch name",
          "zh": "目标分支名称"
        }
      }
    ],
    "examples": [
      {
        "command": "git merge feature/login",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "git-remote",
    "category": "git",
    "name": {
      "en": "List remotes",
      "zh": "查看远程仓库"
    },
    "command": "git remote -v",
    "description": {
      "en": "Show remote names and URLs.",
      "zh": "显示远程仓库名称及地址。"
    },
    "keywords": [
      "git",
      "remote",
      "List remotes",
      "查看远程仓库"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "git-fetch",
    "category": "git",
    "name": {
      "en": "Fetch remote",
      "zh": "获取远程更新"
    },
    "command": "git fetch origin",
    "description": {
      "en": "Download objects without merging.",
      "zh": "下载对象但不合并。"
    },
    "keywords": [
      "git",
      "fetch",
      "Fetch remote",
      "获取远程更新"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "git-pull",
    "category": "git",
    "name": {
      "en": "Fast-forward pull",
      "zh": "快进拉取"
    },
    "command": "git pull --ff-only",
    "description": {
      "en": "Fetch and update only if a fast-forward is possible.",
      "zh": "仅在可快进时获取并更新。"
    },
    "keywords": [
      "git",
      "pull",
      "Fast-forward pull",
      "快进拉取"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "--ff-only",
        "description": {
          "en": "Refuse to merge when histories have diverged.",
          "zh": "历史发生分叉时拒绝合并。"
        }
      }
    ],
    "examples": [
      {
        "command": "git pull --ff-only",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "git-push",
    "category": "git",
    "name": {
      "en": "Push branch",
      "zh": "推送分支"
    },
    "command": "git push -u origin <branch-name>",
    "description": {
      "en": "Push a branch and set its upstream.",
      "zh": "推送分支并设置上游。"
    },
    "keywords": [
      "git",
      "push",
      "Push branch",
      "推送分支"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-u",
        "description": {
          "en": "Set the upstream branch for future pulls and pushes.",
          "zh": "设置后续拉取与推送使用的上游分支。"
        }
      },
      {
        "name": "<branch-name>",
        "description": {
          "en": "Target branch name",
          "zh": "目标分支名称"
        }
      }
    ],
    "examples": [
      {
        "command": "git push -u origin feature/login",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "git-restore",
    "category": "git",
    "name": {
      "en": "Discard file changes",
      "zh": "丢弃文件修改"
    },
    "command": "git restore <file>",
    "description": {
      "en": "Restore a working file from the index.",
      "zh": "使用暂存区恢复工作区文件。"
    },
    "keywords": [
      "git",
      "restore",
      "Discard file changes",
      "丢弃文件修改"
    ],
    "tags": [
      "caution"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "parameters": [
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "git restore app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ],
    "warning": {
      "en": "Discards unstaged tracked changes in this file. Recovery may be impossible.",
      "zh": "丢弃该文件未暂存的修改，可能无法恢复。"
    }
  },
  {
    "id": "git-unstage",
    "category": "git",
    "name": {
      "en": "Unstage file",
      "zh": "取消暂存"
    },
    "command": "git restore --staged <file>",
    "description": {
      "en": "Restore the index entry from HEAD.",
      "zh": "从 HEAD 恢复暂存区条目。"
    },
    "keywords": [
      "git",
      "unstage",
      "Unstage file",
      "取消暂存"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "--staged",
        "description": {
          "en": "Restore only the index; keep working files unchanged.",
          "zh": "仅恢复暂存区，保留工作区文件。"
        }
      },
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "git restore --staged app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "git-stash",
    "category": "git",
    "name": {
      "en": "Stash changes",
      "zh": "暂存工作进度"
    },
    "command": "git stash push -m \"<message>\"",
    "description": {
      "en": "Save tracked changes in a stash.",
      "zh": "将已跟踪文件的修改存入 stash。"
    },
    "keywords": [
      "git",
      "stash",
      "Stash changes",
      "暂存工作进度"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-m",
        "description": {
          "en": "Attach a message to the stash entry.",
          "zh": "为 stash 记录附加说明。"
        }
      },
      {
        "name": "<message>",
        "description": {
          "en": "Commit or stash message",
          "zh": "提交或暂存信息"
        }
      }
    ],
    "examples": [
      {
        "command": "git stash push -m \"update documentation\"",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "git-stash-pop",
    "category": "git",
    "name": {
      "en": "Apply latest stash",
      "zh": "恢复工作进度"
    },
    "command": "git stash pop",
    "description": {
      "en": "Apply the latest stash and remove it on success.",
      "zh": "应用最新 stash，成功后删除该记录。"
    },
    "keywords": [
      "git",
      "stash-pop",
      "Apply latest stash",
      "恢复工作进度"
    ],
    "tags": [
      "caution"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution"
  },
  {
    "id": "git-rebase",
    "category": "git",
    "name": {
      "en": "Rebase branch",
      "zh": "变基分支"
    },
    "command": "git rebase <branch-name>",
    "description": {
      "en": "Replay local commits onto another branch.",
      "zh": "在另一分支上重放本地提交。"
    },
    "keywords": [
      "git",
      "rebase",
      "Rebase branch",
      "变基分支"
    ],
    "tags": [
      "caution"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "parameters": [
      {
        "name": "<branch-name>",
        "description": {
          "en": "Target branch name",
          "zh": "目标分支名称"
        }
      }
    ],
    "examples": [
      {
        "command": "git rebase feature/login",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ],
    "warning": {
      "en": "Rewrites commit history and may cause conflicts. Avoid rebasing shared commits.",
      "zh": "重写提交历史且可能产生冲突，避免对已共享的提交变基。"
    }
  },
  {
    "id": "git-log",
    "category": "git",
    "name": {
      "en": "Compact history",
      "zh": "简洁提交历史"
    },
    "command": "git log --oneline",
    "description": {
      "en": "Show one line per commit.",
      "zh": "每个提交显示一行。"
    },
    "keywords": [
      "git",
      "log",
      "Compact history",
      "简洁提交历史"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "--oneline",
        "description": {
          "en": "Show abbreviated commit IDs and one-line messages.",
          "zh": "显示缩短的提交 ID 与单行提交信息。"
        }
      }
    ],
    "examples": [
      {
        "command": "git log --oneline",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "git-reset",
    "category": "git",
    "name": {
      "en": "Reset working tree",
      "zh": "硬重置工作区"
    },
    "command": "git reset --hard HEAD",
    "description": {
      "en": "Reset tracked files and index to HEAD.",
      "zh": "将已跟踪文件与暂存区重置至 HEAD。"
    },
    "keywords": [
      "git",
      "reset",
      "Reset working tree",
      "硬重置工作区"
    ],
    "tags": [
      "danger"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "danger",
    "warning": {
      "en": "Permanently discards tracked working tree and staged changes; may also delete obstructing untracked files. Back up first.",
      "zh": "永久丢弃已跟踪文件的工作区及暂存修改，也可能删除阻碍重置的未跟踪文件，请先备份。"
    },
    "parameters": [
      {
        "name": "--hard",
        "description": {
          "en": "Reset the index and tracked working files, discarding changes.",
          "zh": "重置暂存区及已跟踪的工作区文件并丢弃修改。"
        }
      }
    ],
    "examples": [
      {
        "command": "git reset --hard HEAD",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "docker-images",
    "category": "docker",
    "name": {
      "en": "List images",
      "zh": "列出镜像"
    },
    "command": "docker image ls",
    "description": {
      "en": "Show locally stored images.",
      "zh": "显示本地镜像。"
    },
    "keywords": [
      "docker",
      "images",
      "List images",
      "列出镜像"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "docker-search",
    "category": "docker",
    "name": {
      "en": "Search images",
      "zh": "搜索镜像"
    },
    "command": "docker search <image>",
    "description": {
      "en": "Search Docker Hub for images.",
      "zh": "在 Docker Hub 搜索镜像。"
    },
    "keywords": [
      "docker",
      "search",
      "Search images",
      "搜索镜像"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<image>",
        "description": {
          "en": "Image name and optional tag",
          "zh": "镜像名称及可选标签"
        }
      }
    ],
    "examples": [
      {
        "command": "docker search nginx:alpine",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "docker-pull",
    "category": "docker",
    "name": {
      "en": "Pull image",
      "zh": "拉取镜像"
    },
    "command": "docker pull <image>",
    "description": {
      "en": "Download an image from a registry.",
      "zh": "从镜像仓库下载镜像。"
    },
    "keywords": [
      "docker",
      "pull",
      "Pull image",
      "拉取镜像"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<image>",
        "description": {
          "en": "Image name and optional tag",
          "zh": "镜像名称及可选标签"
        }
      }
    ],
    "examples": [
      {
        "command": "docker pull nginx:alpine",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "docker-run",
    "category": "docker",
    "name": {
      "en": "Create container",
      "zh": "创建容器"
    },
    "command": "docker run -d --name <container> <image>",
    "description": {
      "en": "Create and run a container in the background.",
      "zh": "创建容器并在后台运行。"
    },
    "keywords": [
      "docker",
      "run",
      "Create container",
      "创建容器"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-d",
        "description": {
          "en": "Run detached in the background.",
          "zh": "在后台运行。"
        }
      },
      {
        "name": "--name",
        "description": {
          "en": "Assign a unique container name.",
          "zh": "指定唯一的容器名称。"
        }
      },
      {
        "name": "<container>",
        "description": {
          "en": "Container name or ID",
          "zh": "容器名称或 ID"
        }
      },
      {
        "name": "<image>",
        "description": {
          "en": "Image name and optional tag",
          "zh": "镜像名称及可选标签"
        }
      }
    ],
    "examples": [
      {
        "command": "docker run -d --name web nginx:alpine",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "docker-ps",
    "category": "docker",
    "name": {
      "en": "List containers",
      "zh": "列出容器"
    },
    "command": "docker ps -a",
    "description": {
      "en": "Show running and stopped containers.",
      "zh": "显示运行及已停止的容器。"
    },
    "keywords": [
      "docker",
      "ps",
      "List containers",
      "列出容器"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-a",
        "description": {
          "en": "Include stopped containers.",
          "zh": "包含已停止的容器。"
        }
      }
    ],
    "examples": [
      {
        "command": "docker ps -a",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "docker-start",
    "category": "docker",
    "name": {
      "en": "Start container",
      "zh": "启动容器"
    },
    "command": "docker start <container>",
    "description": {
      "en": "Start an existing stopped container.",
      "zh": "启动已停止的容器。"
    },
    "keywords": [
      "docker",
      "start",
      "Start container",
      "启动容器"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<container>",
        "description": {
          "en": "Container name or ID",
          "zh": "容器名称或 ID"
        }
      }
    ],
    "examples": [
      {
        "command": "docker start web",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "docker-stop",
    "category": "docker",
    "name": {
      "en": "Stop container",
      "zh": "停止容器"
    },
    "command": "docker stop <container>",
    "description": {
      "en": "Request a graceful container shutdown.",
      "zh": "请求容器正常停止。"
    },
    "keywords": [
      "docker",
      "stop",
      "Stop container",
      "停止容器"
    ],
    "tags": [
      "caution"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "parameters": [
      {
        "name": "<container>",
        "description": {
          "en": "Container name or ID",
          "zh": "容器名称或 ID"
        }
      }
    ],
    "examples": [
      {
        "command": "docker stop web",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "docker-logs",
    "category": "docker",
    "name": {
      "en": "Container logs",
      "zh": "查看容器日志"
    },
    "command": "docker logs --tail 100 <container>",
    "description": {
      "en": "Show the last 100 log lines.",
      "zh": "显示最后 100 行日志。"
    },
    "keywords": [
      "docker",
      "logs",
      "Container logs",
      "查看容器日志"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "--tail 100",
        "description": {
          "en": "Show only the last 100 lines.",
          "zh": "仅显示最后 100 行。"
        }
      },
      {
        "name": "<container>",
        "description": {
          "en": "Container name or ID",
          "zh": "容器名称或 ID"
        }
      }
    ],
    "examples": [
      {
        "command": "docker logs --tail 100 web",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "docker-exec",
    "category": "docker",
    "name": {
      "en": "Open container shell",
      "zh": "进入容器"
    },
    "command": "docker exec -it <container> sh",
    "description": {
      "en": "Open sh in a running container that has sh installed.",
      "zh": "在装有 sh 的运行中容器内打开 shell。"
    },
    "keywords": [
      "docker",
      "exec",
      "Open container shell",
      "进入容器"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-it",
        "description": {
          "en": "Keep stdin open and allocate a pseudo-terminal.",
          "zh": "保持标准输入开启并分配伪终端。"
        }
      },
      {
        "name": "<container>",
        "description": {
          "en": "Container name or ID",
          "zh": "容器名称或 ID"
        }
      }
    ],
    "examples": [
      {
        "command": "docker exec -it web sh",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "docker-build",
    "category": "docker",
    "name": {
      "en": "Build image",
      "zh": "构建镜像"
    },
    "command": "docker build -t <image> .",
    "description": {
      "en": "Build an image using the current directory as context.",
      "zh": "以当前目录为上下文构建镜像。"
    },
    "keywords": [
      "docker",
      "build",
      "Build image",
      "构建镜像"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-t",
        "description": {
          "en": "Assign an image name and optional tag.",
          "zh": "指定镜像名称及可选标签。"
        }
      },
      {
        "name": ".",
        "description": {
          "en": "Use the current directory as the build context.",
          "zh": "以当前目录作为构建上下文。"
        }
      },
      {
        "name": "<image>",
        "description": {
          "en": "Image name and optional tag",
          "zh": "镜像名称及可选标签"
        }
      }
    ],
    "examples": [
      {
        "command": "docker build -t nginx:alpine .",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "docker-compose-up",
    "category": "docker",
    "name": {
      "en": "Start Compose services",
      "zh": "启动 Compose 服务"
    },
    "command": "docker compose up -d",
    "description": {
      "en": "Create and start services from the Compose file.",
      "zh": "根据 Compose 文件创建并启动服务。"
    },
    "keywords": [
      "docker",
      "compose-up",
      "Start Compose services",
      "启动 Compose 服务"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-d",
        "description": {
          "en": "Run services in the background; requires Compose v2.",
          "zh": "在后台运行服务，需要 Compose v2。"
        }
      }
    ],
    "examples": [
      {
        "command": "docker compose up -d",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "docker-compose-down",
    "category": "docker",
    "name": {
      "en": "Remove Compose services",
      "zh": "移除 Compose 服务"
    },
    "command": "docker compose down",
    "description": {
      "en": "Stop and remove service containers and networks.",
      "zh": "停止并移除服务容器及网络。"
    },
    "keywords": [
      "docker",
      "compose-down",
      "Remove Compose services",
      "移除 Compose 服务"
    ],
    "tags": [
      "danger"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "danger",
    "warning": {
      "en": "Removes service containers and their writable-layer data. Named volumes remain unless -v is added.",
      "zh": "移除服务容器及其可写层数据；除非添加 -v，否则保留命名卷。"
    },
    "examples": [
      {
        "command": "docker compose down",
        "description": {
          "en": "Destructive example: back up container data first. Requires Docker Compose v2 for compose commands.",
          "zh": "破坏性操作示例，请先备份容器数据；compose 命令需要 Docker Compose v2。"
        }
      }
    ]
  },
  {
    "id": "docker-prune",
    "category": "docker",
    "name": {
      "en": "Clean unused resources",
      "zh": "清理闲置资源"
    },
    "command": "docker system prune",
    "description": {
      "en": "Remove stopped containers, unused networks, dangling images and build cache.",
      "zh": "移除停止的容器、闲置网络、悬空镜像及构建缓存。"
    },
    "keywords": [
      "docker",
      "prune",
      "Clean unused resources",
      "清理闲置资源"
    ],
    "tags": [
      "danger"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "danger",
    "warning": {
      "en": "Deletes unused resources and stopped container data irreversibly. Volumes are excluded unless --volumes is added.",
      "zh": "不可恢复地删除闲置资源及停止容器内的数据；默认不删除卷，除非添加 --volumes。"
    },
    "examples": [
      {
        "command": "docker system prune",
        "description": {
          "en": "Destructive example: back up container data first. Requires Docker Compose v2 for compose commands.",
          "zh": "破坏性操作示例，请先备份容器数据；compose 命令需要 Docker Compose v2。"
        }
      }
    ]
  },
  {
    "id": "linux-pwd",
    "category": "linux",
    "name": {
      "en": "Current directory",
      "zh": "查看当前目录"
    },
    "command": "pwd",
    "description": {
      "en": "Print the working directory.",
      "zh": "输出当前工作目录。"
    },
    "keywords": [
      "linux",
      "pwd",
      "Current directory",
      "查看当前目录"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe"
  },
  {
    "id": "linux-ls",
    "category": "linux",
    "name": {
      "en": "List files",
      "zh": "列出文件"
    },
    "command": "ls -lah",
    "description": {
      "en": "Show hidden files and readable sizes.",
      "zh": "显示隐藏文件及可读文件大小。"
    },
    "keywords": [
      "linux",
      "ls",
      "List files",
      "列出文件"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-lah",
        "description": {
          "en": "Long format, include hidden files, human-readable sizes.",
          "zh": "长格式显示，包含隐藏文件并使用可读大小。"
        }
      }
    ],
    "examples": [
      {
        "command": "ls -lah",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "linux-cd",
    "category": "linux",
    "name": {
      "en": "Change directory",
      "zh": "切换目录"
    },
    "command": "cd <directory>",
    "description": {
      "en": "Change the current shell directory.",
      "zh": "切换当前 shell 的工作目录。"
    },
    "keywords": [
      "linux",
      "cd",
      "Change directory",
      "切换目录"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<directory>",
        "description": {
          "en": "Directory path",
          "zh": "目录路径"
        }
      }
    ],
    "examples": [
      {
        "command": "cd ./logs",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "linux-mkdir",
    "category": "linux",
    "name": {
      "en": "Create directories",
      "zh": "创建目录"
    },
    "command": "mkdir -p <directory>",
    "description": {
      "en": "Create a directory and missing parents.",
      "zh": "创建目录及缺少的父目录。"
    },
    "keywords": [
      "linux",
      "mkdir",
      "Create directories",
      "创建目录"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-p",
        "description": {
          "en": "Create missing parents; tolerate existing directories.",
          "zh": "创建缺少的父目录，允许目录已存在。"
        }
      },
      {
        "name": "<directory>",
        "description": {
          "en": "Directory path",
          "zh": "目录路径"
        }
      }
    ],
    "examples": [
      {
        "command": "mkdir -p ./logs",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "linux-cp",
    "category": "linux",
    "name": {
      "en": "Copy directory",
      "zh": "复制目录"
    },
    "command": "cp -R <source> <destination>",
    "description": {
      "en": "Recursively copy a directory.",
      "zh": "递归复制目录。"
    },
    "keywords": [
      "linux",
      "cp",
      "Copy directory",
      "复制目录"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "caution",
    "parameters": [
      {
        "name": "-R",
        "description": {
          "en": "Recursively copy directory contents. Existing files may be overwritten.",
          "zh": "递归复制目录内容，可能覆盖已有文件。"
        }
      },
      {
        "name": "<source>",
        "description": {
          "en": "Source path",
          "zh": "源路径"
        }
      },
      {
        "name": "<destination>",
        "description": {
          "en": "Destination path; existing files may be overwritten",
          "zh": "目标路径，可能覆盖已有文件"
        }
      }
    ],
    "examples": [
      {
        "command": "cp -R ./source ./backup",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "linux-mv",
    "category": "linux",
    "name": {
      "en": "Move file",
      "zh": "移动文件"
    },
    "command": "mv <source> <destination>",
    "description": {
      "en": "Move or rename a file.",
      "zh": "移动文件或重命名。"
    },
    "keywords": [
      "linux",
      "mv",
      "Move file",
      "移动文件"
    ],
    "tags": [
      "caution"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "caution",
    "parameters": [
      {
        "name": "<source>",
        "description": {
          "en": "Source path",
          "zh": "源路径"
        }
      },
      {
        "name": "<destination>",
        "description": {
          "en": "Destination path; existing files may be overwritten",
          "zh": "目标路径，可能覆盖已有文件"
        }
      }
    ],
    "examples": [
      {
        "command": "mv ./source ./backup",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "linux-cat",
    "category": "linux",
    "name": {
      "en": "Read file",
      "zh": "查看文件"
    },
    "command": "cat <file>",
    "description": {
      "en": "Print the complete file content.",
      "zh": "输出完整文件内容。"
    },
    "keywords": [
      "linux",
      "cat",
      "Read file",
      "查看文件"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "cat app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "linux-less",
    "category": "linux",
    "name": {
      "en": "Page through file",
      "zh": "分页查看文件"
    },
    "command": "less <file>",
    "description": {
      "en": "Read a file interactively; press q to quit.",
      "zh": "交互式阅读文件，按 q 退出。"
    },
    "keywords": [
      "linux",
      "less",
      "Page through file",
      "分页查看文件"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "less app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "linux-tail",
    "category": "linux",
    "name": {
      "en": "Last lines",
      "zh": "查看末尾内容"
    },
    "command": "tail -n 50 <file>",
    "description": {
      "en": "Print the last 50 lines.",
      "zh": "输出最后 50 行。"
    },
    "keywords": [
      "linux",
      "tail",
      "Last lines",
      "查看末尾内容"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-n 50",
        "description": {
          "en": "Print the last 50 lines.",
          "zh": "输出最后 50 行。"
        }
      },
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "tail -n 50 app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "linux-find",
    "category": "linux",
    "name": {
      "en": "Find log files",
      "zh": "查找日志文件"
    },
    "command": "find . -name \"*.log\"",
    "description": {
      "en": "Find files named with the .log suffix.",
      "zh": "查找以 .log 结尾的文件。"
    },
    "keywords": [
      "linux",
      "find",
      "Find log files",
      "查找日志文件"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe"
  },
  {
    "id": "linux-grep",
    "category": "linux",
    "name": {
      "en": "Search text",
      "zh": "搜索文本"
    },
    "command": "grep -rn -- \"<pattern>\" <directory>",
    "description": {
      "en": "Recursively search for a regular expression with line numbers.",
      "zh": "递归搜索正则表达式并显示行号。"
    },
    "keywords": [
      "linux",
      "grep",
      "Search text",
      "搜索文本"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-rn",
        "description": {
          "en": "Search recursively and display line numbers.",
          "zh": "递归搜索并显示行号。"
        }
      },
      {
        "name": "--",
        "description": {
          "en": "End option parsing before the pattern.",
          "zh": "结束选项解析，后面是搜索模式。"
        }
      },
      {
        "name": "<pattern>",
        "description": {
          "en": "Regular expression to search for",
          "zh": "要搜索的正则表达式"
        }
      },
      {
        "name": "<directory>",
        "description": {
          "en": "Directory path",
          "zh": "目录路径"
        }
      }
    ],
    "examples": [
      {
        "command": "grep -rn -- \"error\" ./logs",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "linux-chmod",
    "category": "linux",
    "name": {
      "en": "Make executable",
      "zh": "添加执行权限"
    },
    "command": "chmod u+x <file>",
    "description": {
      "en": "Give the file owner execute permission.",
      "zh": "为文件所有者添加执行权限。"
    },
    "keywords": [
      "linux",
      "chmod",
      "Make executable",
      "添加执行权限"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "u+x",
        "description": {
          "en": "Add execute permission for the owner only.",
          "zh": "仅为文件所有者添加执行权限。"
        }
      },
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "chmod u+x app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "linux-archive",
    "category": "linux",
    "name": {
      "en": "Create gzip archive",
      "zh": "创建 gzip 归档"
    },
    "command": "tar -czf <archive> <directory>",
    "description": {
      "en": "Create a gzip compressed tar archive.",
      "zh": "创建 gzip 压缩的 tar 归档。"
    },
    "keywords": [
      "linux",
      "archive",
      "Create gzip archive",
      "创建 gzip 归档"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-czf",
        "description": {
          "en": "Create an archive, compress with gzip, then specify its filename.",
          "zh": "创建归档，使用 gzip 压缩并指定归档文件名。"
        }
      },
      {
        "name": "<archive>",
        "description": {
          "en": "Archive file path",
          "zh": "归档文件路径"
        }
      },
      {
        "name": "<directory>",
        "description": {
          "en": "Directory path",
          "zh": "目录路径"
        }
      }
    ],
    "examples": [
      {
        "command": "tar -czf backup.tar.gz ./logs",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "linux-extract",
    "category": "linux",
    "name": {
      "en": "Extract gzip archive",
      "zh": "解压 gzip 归档"
    },
    "command": "tar -xzf <archive>",
    "description": {
      "en": "Extract an archive in the current directory.",
      "zh": "将归档解压至当前目录。"
    },
    "keywords": [
      "linux",
      "extract",
      "Extract gzip archive",
      "解压 gzip 归档"
    ],
    "tags": [
      "caution"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "caution",
    "parameters": [
      {
        "name": "-xzf",
        "description": {
          "en": "Extract a gzip archive from the specified file. Existing files may be overwritten.",
          "zh": "从指定文件解压 gzip 归档，可能覆盖已有文件。"
        }
      },
      {
        "name": "<archive>",
        "description": {
          "en": "Archive file path",
          "zh": "归档文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "tar -xzf backup.tar.gz",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "linux-disk",
    "category": "linux",
    "name": {
      "en": "Disk space",
      "zh": "查看磁盘空间"
    },
    "command": "df -h",
    "description": {
      "en": "Show filesystem usage in readable units.",
      "zh": "以可读单位显示文件系统使用情况。"
    },
    "keywords": [
      "linux",
      "disk",
      "Disk space",
      "查看磁盘空间"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-h",
        "description": {
          "en": "Display sizes in human-readable units.",
          "zh": "以可读单位显示大小。"
        }
      }
    ],
    "examples": [
      {
        "command": "df -h",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "linux-remove",
    "category": "linux",
    "name": {
      "en": "Remove directory tree",
      "zh": "递归删除目录"
    },
    "command": "rm -rf -- <directory>",
    "description": {
      "en": "Force removal of a directory and its contents.",
      "zh": "强制删除目录及其内容。"
    },
    "keywords": [
      "linux",
      "remove",
      "Remove directory tree",
      "递归删除目录"
    ],
    "tags": [
      "danger"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "danger",
    "parameters": [
      {
        "name": "-rf",
        "description": {
          "en": "Remove recursively and suppress confirmation.",
          "zh": "递归删除且不经确认。"
        }
      },
      {
        "name": "--",
        "description": {
          "en": "End option parsing.",
          "zh": "结束选项解析。"
        }
      },
      {
        "name": "<directory>",
        "description": {
          "en": "Directory path",
          "zh": "目录路径"
        }
      }
    ],
    "examples": [
      {
        "command": "rm -rf -- ./logs",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ],
    "warning": {
      "en": "Recursively deletes the target without confirmation or a recycle bin. Verify the path and back up first.",
      "zh": "递归删除目标，不经确认且不进入回收站，请先核对路径并备份。"
    }
  },
  {
    "id": "npm-init",
    "category": "npm",
    "name": {
      "en": "Initialize package",
      "zh": "初始化包"
    },
    "command": "npm init -y",
    "description": {
      "en": "Create package.json with default answers.",
      "zh": "使用默认回答创建 package.json。"
    },
    "keywords": [
      "npm",
      "init",
      "Initialize package",
      "初始化包"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-y",
        "description": {
          "en": "Accept default answers.",
          "zh": "接受默认回答。"
        }
      }
    ],
    "examples": [
      {
        "command": "npm init -y",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "npm-install",
    "category": "npm",
    "name": {
      "en": "Install dependencies",
      "zh": "安装依赖"
    },
    "command": "npm install",
    "description": {
      "en": "Install dependencies from package.json.",
      "zh": "安装 package.json 中的依赖。"
    },
    "keywords": [
      "npm",
      "install",
      "Install dependencies",
      "安装依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "npm-add",
    "category": "npm",
    "name": {
      "en": "Add dependency",
      "zh": "添加依赖"
    },
    "command": "npm install <package>",
    "description": {
      "en": "Install and save a production dependency.",
      "zh": "安装并保存生产依赖。"
    },
    "keywords": [
      "npm",
      "add",
      "Add dependency",
      "添加依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<package>",
        "description": {
          "en": "Package name",
          "zh": "包名称"
        }
      }
    ],
    "examples": [
      {
        "command": "npm install typescript",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "npm-dev",
    "category": "npm",
    "name": {
      "en": "Add dev dependency",
      "zh": "添加开发依赖"
    },
    "command": "npm install -D <package>",
    "description": {
      "en": "Install and save a development dependency.",
      "zh": "安装并保存开发依赖。"
    },
    "keywords": [
      "npm",
      "dev",
      "Add dev dependency",
      "添加开发依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-D",
        "description": {
          "en": "Save under devDependencies.",
          "zh": "保存至 devDependencies。"
        }
      },
      {
        "name": "<package>",
        "description": {
          "en": "Package name",
          "zh": "包名称"
        }
      }
    ],
    "examples": [
      {
        "command": "npm install -D typescript",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "npm-remove",
    "category": "npm",
    "name": {
      "en": "Remove dependency",
      "zh": "删除依赖"
    },
    "command": "npm uninstall <package>",
    "description": {
      "en": "Remove a package and update the manifest.",
      "zh": "删除依赖并更新清单。"
    },
    "keywords": [
      "npm",
      "remove",
      "Remove dependency",
      "删除依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<package>",
        "description": {
          "en": "Package name",
          "zh": "包名称"
        }
      }
    ],
    "examples": [
      {
        "command": "npm uninstall typescript",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "npm-run",
    "category": "npm",
    "name": {
      "en": "Run script",
      "zh": "执行脚本"
    },
    "command": "npm run <script>",
    "description": {
      "en": "Run a script defined in package.json.",
      "zh": "执行 package.json 定义的脚本。"
    },
    "keywords": [
      "npm",
      "run",
      "Run script",
      "执行脚本"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<script>",
        "description": {
          "en": "Script name in package.json",
          "zh": "package.json 中的脚本名称"
        }
      }
    ],
    "examples": [
      {
        "command": "npm run build",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "npm-update",
    "category": "npm",
    "name": {
      "en": "Update dependencies",
      "zh": "更新依赖"
    },
    "command": "npm update",
    "description": {
      "en": "Update within declared version ranges.",
      "zh": "在声明的版本范围内更新依赖。"
    },
    "keywords": [
      "npm",
      "update",
      "Update dependencies",
      "更新依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "npm-list",
    "category": "npm",
    "name": {
      "en": "List dependencies",
      "zh": "查看依赖"
    },
    "command": "npm ls --depth=0",
    "description": {
      "en": "List direct installed dependencies.",
      "zh": "列出已安装的直接依赖。"
    },
    "keywords": [
      "npm",
      "list",
      "List dependencies",
      "查看依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "--depth=0",
        "description": {
          "en": "Show only direct dependencies.",
          "zh": "仅显示直接依赖。"
        }
      }
    ],
    "examples": [
      {
        "command": "npm ls --depth=0",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "npm-cache",
    "category": "npm",
    "name": {
      "en": "Verify cache",
      "zh": "验证缓存"
    },
    "command": "npm cache verify",
    "description": {
      "en": "Verify cached data and reclaim unnecessary space.",
      "zh": "验证缓存数据并回收多余空间。"
    },
    "keywords": [
      "npm",
      "cache",
      "Verify cache",
      "验证缓存"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "pnpm-init",
    "category": "pnpm",
    "name": {
      "en": "Initialize package",
      "zh": "初始化包"
    },
    "command": "pnpm init",
    "description": {
      "en": "Create a package.json file.",
      "zh": "创建 package.json 文件。"
    },
    "keywords": [
      "pnpm",
      "init",
      "Initialize package",
      "初始化包"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "pnpm-install",
    "category": "pnpm",
    "name": {
      "en": "Install dependencies",
      "zh": "安装依赖"
    },
    "command": "pnpm install",
    "description": {
      "en": "Install project dependencies.",
      "zh": "安装项目依赖。"
    },
    "keywords": [
      "pnpm",
      "install",
      "Install dependencies",
      "安装依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "pnpm-add",
    "category": "pnpm",
    "name": {
      "en": "Add dependency",
      "zh": "添加依赖"
    },
    "command": "pnpm add <package>",
    "description": {
      "en": "Add a production dependency.",
      "zh": "添加生产依赖。"
    },
    "keywords": [
      "pnpm",
      "add",
      "Add dependency",
      "添加依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<package>",
        "description": {
          "en": "Package name",
          "zh": "包名称"
        }
      }
    ],
    "examples": [
      {
        "command": "pnpm add typescript",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "pnpm-dev",
    "category": "pnpm",
    "name": {
      "en": "Add dev dependency",
      "zh": "添加开发依赖"
    },
    "command": "pnpm add -D <package>",
    "description": {
      "en": "Add a development dependency.",
      "zh": "添加开发依赖。"
    },
    "keywords": [
      "pnpm",
      "dev",
      "Add dev dependency",
      "添加开发依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-D",
        "description": {
          "en": "Save under devDependencies.",
          "zh": "保存至 devDependencies。"
        }
      },
      {
        "name": "<package>",
        "description": {
          "en": "Package name",
          "zh": "包名称"
        }
      }
    ],
    "examples": [
      {
        "command": "pnpm add -D typescript",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "pnpm-remove",
    "category": "pnpm",
    "name": {
      "en": "Remove dependency",
      "zh": "删除依赖"
    },
    "command": "pnpm remove <package>",
    "description": {
      "en": "Remove a project dependency.",
      "zh": "删除项目依赖。"
    },
    "keywords": [
      "pnpm",
      "remove",
      "Remove dependency",
      "删除依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<package>",
        "description": {
          "en": "Package name",
          "zh": "包名称"
        }
      }
    ],
    "examples": [
      {
        "command": "pnpm remove typescript",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "pnpm-run",
    "category": "pnpm",
    "name": {
      "en": "Run script",
      "zh": "执行脚本"
    },
    "command": "pnpm run <script>",
    "description": {
      "en": "Run a package script.",
      "zh": "执行包脚本。"
    },
    "keywords": [
      "pnpm",
      "run",
      "Run script",
      "执行脚本"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<script>",
        "description": {
          "en": "Script name in package.json",
          "zh": "package.json 中的脚本名称"
        }
      }
    ],
    "examples": [
      {
        "command": "pnpm run build",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "pnpm-update",
    "category": "pnpm",
    "name": {
      "en": "Update dependencies",
      "zh": "更新依赖"
    },
    "command": "pnpm update",
    "description": {
      "en": "Update within declared version ranges.",
      "zh": "在声明的版本范围内更新依赖。"
    },
    "keywords": [
      "pnpm",
      "update",
      "Update dependencies",
      "更新依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "pnpm-list",
    "category": "pnpm",
    "name": {
      "en": "List dependencies",
      "zh": "查看依赖"
    },
    "command": "pnpm list --depth 0",
    "description": {
      "en": "List direct dependencies.",
      "zh": "列出直接依赖。"
    },
    "keywords": [
      "pnpm",
      "list",
      "List dependencies",
      "查看依赖"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "--depth 0",
        "description": {
          "en": "Show only direct dependencies.",
          "zh": "仅显示直接依赖。"
        }
      }
    ],
    "examples": [
      {
        "command": "pnpm list --depth 0",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "pnpm-store",
    "category": "pnpm",
    "name": {
      "en": "Prune store",
      "zh": "清理存储"
    },
    "command": "pnpm store prune",
    "description": {
      "en": "Remove unreferenced packages from the store.",
      "zh": "删除存储中未被引用的包。"
    },
    "keywords": [
      "pnpm",
      "store",
      "Prune store",
      "清理存储"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "nodejs-version",
    "category": "nodejs",
    "name": {
      "en": "Node version",
      "zh": "查看 Node 版本"
    },
    "command": "node --version",
    "description": {
      "en": "Print the installed Node.js version.",
      "zh": "输出已安装的 Node.js 版本。"
    },
    "keywords": [
      "nodejs",
      "version",
      "Node version",
      "查看 Node 版本"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "nodejs-run",
    "category": "nodejs",
    "name": {
      "en": "Run JavaScript",
      "zh": "运行 JavaScript"
    },
    "command": "node <file>",
    "description": {
      "en": "Execute a JavaScript file.",
      "zh": "执行 JavaScript 文件。"
    },
    "keywords": [
      "nodejs",
      "run",
      "Run JavaScript",
      "运行 JavaScript"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "node app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "nodejs-eval",
    "category": "nodejs",
    "name": {
      "en": "Evaluate code",
      "zh": "执行代码片段"
    },
    "command": "node -e \"console.log(process.platform)\"",
    "description": {
      "en": "Print the operating system platform.",
      "zh": "输出操作系统平台。"
    },
    "keywords": [
      "nodejs",
      "eval",
      "Evaluate code",
      "执行代码片段"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-e",
        "description": {
          "en": "Evaluate the following JavaScript string.",
          "zh": "执行后面的 JavaScript 字符串。"
        }
      }
    ],
    "examples": [
      {
        "command": "node -e \"console.log(process.platform)\"",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "nodejs-env",
    "category": "nodejs",
    "name": {
      "en": "Load environment file",
      "zh": "加载环境变量文件"
    },
    "command": "node --env-file=.env <file>",
    "description": {
      "en": "Load .env before running a script; requires Node 20.6+.",
      "zh": "运行脚本前加载 .env，需要 Node 20.6 以上。"
    },
    "keywords": [
      "nodejs",
      "env",
      "Load environment file",
      "加载环境变量文件"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "--env-file=.env",
        "description": {
          "en": "Read environment variables from .env; existing environment values take priority.",
          "zh": "从 .env 读取环境变量，已有环境变量优先。"
        }
      },
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "node --env-file=.env app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "nodejs-inspect",
    "category": "nodejs",
    "name": {
      "en": "Debug script",
      "zh": "调试脚本"
    },
    "command": "node --inspect <file>",
    "description": {
      "en": "Enable the inspector on the default loopback address.",
      "zh": "在默认回环地址开启调试器。"
    },
    "keywords": [
      "nodejs",
      "inspect",
      "Debug script",
      "调试脚本"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "caution",
    "parameters": [
      {
        "name": "--inspect",
        "description": {
          "en": "Enable debugging on 127.0.0.1:9229. Do not expose the inspector to untrusted networks.",
          "zh": "在 127.0.0.1:9229 开启调试，请勿将调试器暴露至不可信网络。"
        }
      },
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "node --inspect app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "nodejs-check",
    "category": "nodejs",
    "name": {
      "en": "Check syntax",
      "zh": "检查语法"
    },
    "command": "node --check <file>",
    "description": {
      "en": "Check syntax without executing the script.",
      "zh": "检查语法而不执行脚本。"
    },
    "keywords": [
      "nodejs",
      "check",
      "Check syntax",
      "检查语法"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "--check",
        "description": {
          "en": "Parse the file without running it.",
          "zh": "解析文件而不运行。"
        }
      },
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "node --check app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "nodejs-watch",
    "category": "nodejs",
    "name": {
      "en": "Watch script",
      "zh": "监听脚本"
    },
    "command": "node --watch <file>",
    "description": {
      "en": "Restart on changes; stable in Node 20.13+ and 22+.",
      "zh": "文件变化时重启，在 Node 20.13 以上及 22 以上稳定可用。"
    },
    "keywords": [
      "nodejs",
      "watch",
      "Watch script",
      "监听脚本"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "--watch",
        "description": {
          "en": "Restart when the entry file or imported modules change.",
          "zh": "入口文件或导入模块变化时重启。"
        }
      },
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "node --watch app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "nodejs-memory",
    "category": "nodejs",
    "name": {
      "en": "Set heap limit",
      "zh": "设置堆内存上限"
    },
    "command": "node --max-old-space-size=4096 <file>",
    "description": {
      "en": "Set V8 old-space memory limit to 4096 MiB.",
      "zh": "将 V8 老生代内存上限设为 4096 MiB。"
    },
    "keywords": [
      "nodejs",
      "memory",
      "Set heap limit",
      "设置堆内存上限"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "--max-old-space-size=4096",
        "description": {
          "en": "Set the V8 old-space limit in MiB; total process memory may be higher.",
          "zh": "以 MiB 设置 V8 老生代上限，进程总内存可能更高。"
        }
      },
      {
        "name": "<file>",
        "description": {
          "en": "File path",
          "zh": "文件路径"
        }
      }
    ],
    "examples": [
      {
        "command": "node --max-old-space-size=4096 app.js",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "network-ping",
    "category": "network",
    "name": {
      "en": "Ping host",
      "zh": "探测主机"
    },
    "command": "ping -c 4 <host>",
    "description": {
      "en": "Send four ICMP echo requests.",
      "zh": "发送四次 ICMP 回显请求。"
    },
    "keywords": [
      "network",
      "ping",
      "Ping host",
      "探测主机"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-c 4",
        "description": {
          "en": "Stop after four requests on Linux/macOS.",
          "zh": "在 Linux/macOS 发送四次请求后停止。"
        }
      },
      {
        "name": "<host>",
        "description": {
          "en": "Hostname or IP address",
          "zh": "主机名或 IP 地址"
        }
      }
    ],
    "examples": [
      {
        "command": "ping -c 4 example.com",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "network-curl",
    "category": "network",
    "name": {
      "en": "HTTP headers",
      "zh": "查看 HTTP 响应头"
    },
    "command": "curl -I https://example.com",
    "description": {
      "en": "Send an HTTP HEAD request.",
      "zh": "发送 HTTP HEAD 请求。"
    },
    "keywords": [
      "network",
      "curl",
      "HTTP headers",
      "查看 HTTP 响应头"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-I",
        "description": {
          "en": "Send HEAD and show response headers. On Windows PowerShell 5.1 use curl.exe to avoid the curl alias.",
          "zh": "发送 HEAD 并显示响应头，Windows PowerShell 5.1 请使用 curl.exe 避开 curl 别名。"
        }
      }
    ],
    "examples": [
      {
        "command": "curl -I https://example.com",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "network-get",
    "category": "network",
    "name": {
      "en": "Follow redirects",
      "zh": "跟随重定向"
    },
    "command": "curl -L https://example.com",
    "description": {
      "en": "Fetch a URL and follow redirects.",
      "zh": "获取 URL 并跟随重定向。"
    },
    "keywords": [
      "network",
      "get",
      "Follow redirects",
      "跟随重定向"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-L",
        "description": {
          "en": "Follow HTTP redirects. On Windows PowerShell 5.1 use curl.exe.",
          "zh": "跟随 HTTP 重定向，Windows PowerShell 5.1 请使用 curl.exe。"
        }
      }
    ],
    "examples": [
      {
        "command": "curl -L https://example.com",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "network-post",
    "category": "network",
    "name": {
      "en": "POST JSON",
      "zh": "发送 JSON"
    },
    "command": "curl -X POST -H \"Content-Type: application/json\" -d '{}' https://example.com",
    "description": {
      "en": "Send an empty JSON object as a POST body.",
      "zh": "通过 POST 发送空 JSON 对象。"
    },
    "keywords": [
      "network",
      "post",
      "POST JSON",
      "发送 JSON"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-X POST",
        "description": {
          "en": "Use the POST HTTP method.",
          "zh": "使用 POST 方法。"
        }
      },
      {
        "name": "-H",
        "description": {
          "en": "Set a request header.",
          "zh": "设置请求头。"
        }
      },
      {
        "name": "-d",
        "description": {
          "en": "Send the following string as the body. Requires a POSIX shell for this quoting.",
          "zh": "将后面的字符串作为请求体，此引号写法需要 POSIX shell。"
        }
      }
    ],
    "examples": [
      {
        "command": "curl -X POST -H \"Content-Type: application/json\" -d '{}' https://example.com",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "network-dns",
    "category": "network",
    "name": {
      "en": "DNS lookup",
      "zh": "查询 DNS"
    },
    "command": "nslookup <host>",
    "description": {
      "en": "Query the default DNS server for a host.",
      "zh": "向默认 DNS 服务器查询主机。"
    },
    "keywords": [
      "network",
      "dns",
      "DNS lookup",
      "查询 DNS"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos",
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<host>",
        "description": {
          "en": "Hostname or IP address",
          "zh": "主机名或 IP 地址"
        }
      }
    ],
    "examples": [
      {
        "command": "nslookup example.com",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "network-dig",
    "category": "network",
    "name": {
      "en": "DNS A records",
      "zh": "查询 A 记录"
    },
    "command": "dig <host> A",
    "description": {
      "en": "Query IPv4 address records with dig.",
      "zh": "使用 dig 查询 IPv4 地址记录。"
    },
    "keywords": [
      "network",
      "dig",
      "DNS A records",
      "查询 A 记录"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<host>",
        "description": {
          "en": "Hostname or IP address",
          "zh": "主机名或 IP 地址"
        }
      }
    ],
    "examples": [
      {
        "command": "dig example.com A",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "network-trace",
    "category": "network",
    "name": {
      "en": "Trace route",
      "zh": "跟踪路由"
    },
    "command": "traceroute <host>",
    "description": {
      "en": "Show network hops; may require an extra package.",
      "zh": "显示网络跳数，可能需要额外安装软件包。"
    },
    "keywords": [
      "network",
      "trace",
      "Trace route",
      "跟踪路由"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<host>",
        "description": {
          "en": "Hostname or IP address",
          "zh": "主机名或 IP 地址"
        }
      }
    ],
    "examples": [
      {
        "command": "traceroute example.com",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "network-port",
    "category": "network",
    "name": {
      "en": "Check TCP port",
      "zh": "检查 TCP 端口"
    },
    "command": "nc -vz <host> <port>",
    "description": {
      "en": "Check TCP connectivity using OpenBSD-compatible netcat.",
      "zh": "使用兼容 OpenBSD 的 netcat 检查 TCP 连接。"
    },
    "keywords": [
      "network",
      "port",
      "Check TCP port",
      "检查 TCP 端口"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-vz",
        "description": {
          "en": "Verbose connectivity check without sending data; netcat variants differ.",
          "zh": "显示详细连接结果且不发送数据，不同 netcat 版本参数可能不同。"
        }
      },
      {
        "name": "<host>",
        "description": {
          "en": "Hostname or IP address",
          "zh": "主机名或 IP 地址"
        }
      },
      {
        "name": "<port>",
        "description": {
          "en": "Port number",
          "zh": "端口号"
        }
      }
    ],
    "examples": [
      {
        "command": "nc -vz example.com 443",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "network-ping-win",
    "category": "network",
    "name": {
      "en": "Ping host on Windows",
      "zh": "Windows 主机探测"
    },
    "command": "ping -n 4 <host>",
    "description": {
      "en": "Send four ICMP echo requests on Windows.",
      "zh": "在 Windows 发送四次 ICMP 回显请求。"
    },
    "keywords": [
      "network",
      "ping-win",
      "Ping host on Windows",
      "Windows 主机探测"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-n 4",
        "description": {
          "en": "Stop after four requests on Windows.",
          "zh": "在 Windows 发送四次请求后停止。"
        }
      },
      {
        "name": "<host>",
        "description": {
          "en": "Hostname or IP address",
          "zh": "主机名或 IP 地址"
        }
      }
    ],
    "examples": [
      {
        "command": "ping -n 4 example.com",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "network-trace-win",
    "category": "network",
    "name": {
      "en": "Trace Windows route",
      "zh": "Windows 路由跟踪"
    },
    "command": "tracert <host>",
    "description": {
      "en": "Show network hops on Windows.",
      "zh": "显示 Windows 网络跳数。"
    },
    "keywords": [
      "network",
      "trace-win",
      "Trace Windows route",
      "Windows 路由跟踪"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "windows"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "<host>",
        "description": {
          "en": "Hostname or IP address",
          "zh": "主机名或 IP 地址"
        }
      }
    ],
    "examples": [
      {
        "command": "tracert example.com",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "system-ps",
    "category": "system",
    "name": {
      "en": "List processes",
      "zh": "查看进程"
    },
    "command": "ps aux",
    "description": {
      "en": "Show processes for all users.",
      "zh": "显示所有用户的进程。"
    },
    "keywords": [
      "system",
      "ps",
      "List processes",
      "查看进程"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "aux",
        "description": {
          "en": "Include all users, user-oriented format and processes without terminals.",
          "zh": "显示所有用户，采用用户格式并包含无终端进程。"
        }
      }
    ],
    "examples": [
      {
        "command": "ps aux",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "system-top",
    "category": "system",
    "name": {
      "en": "Monitor processes",
      "zh": "监控进程"
    },
    "command": "top",
    "description": {
      "en": "Show live CPU and memory usage; press q to quit.",
      "zh": "实时显示 CPU 与内存使用，按 q 退出。"
    },
    "keywords": [
      "system",
      "top",
      "Monitor processes",
      "监控进程"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe"
  },
  {
    "id": "system-kill",
    "category": "system",
    "name": {
      "en": "Terminate process",
      "zh": "结束进程"
    },
    "command": "kill -TERM <pid>",
    "description": {
      "en": "Request process termination with SIGTERM.",
      "zh": "发送 SIGTERM 请求进程终止。"
    },
    "keywords": [
      "system",
      "kill",
      "Terminate process",
      "结束进程"
    ],
    "tags": [
      "caution"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "caution",
    "parameters": [
      {
        "name": "-TERM",
        "description": {
          "en": "Request graceful termination; the process can handle or ignore it.",
          "zh": "请求正常终止，进程可以处理或忽略此信号。"
        }
      },
      {
        "name": "<pid>",
        "description": {
          "en": "Target process ID; verify before stopping",
          "zh": "目标进程 ID，停止前请核对"
        }
      }
    ],
    "examples": [
      {
        "command": "kill -TERM 1234",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "system-uname",
    "category": "system",
    "name": {
      "en": "System information",
      "zh": "系统信息"
    },
    "command": "uname -a",
    "description": {
      "en": "Print kernel and system information.",
      "zh": "输出内核及系统信息。"
    },
    "keywords": [
      "system",
      "uname",
      "System information",
      "系统信息"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-a",
        "description": {
          "en": "Print all available system information.",
          "zh": "输出所有可用系统信息。"
        }
      }
    ],
    "examples": [
      {
        "command": "uname -a",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "system-memory",
    "category": "system",
    "name": {
      "en": "Memory usage",
      "zh": "查看内存"
    },
    "command": "free -h",
    "description": {
      "en": "Show Linux memory and swap usage.",
      "zh": "显示 Linux 内存与交换空间使用情况。"
    },
    "keywords": [
      "system",
      "memory",
      "Memory usage",
      "查看内存"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-h",
        "description": {
          "en": "Use human-readable memory units.",
          "zh": "使用可读内存单位。"
        }
      }
    ],
    "examples": [
      {
        "command": "free -h",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "system-ports",
    "category": "system",
    "name": {
      "en": "Listening TCP ports",
      "zh": "查看监听端口"
    },
    "command": "ss -ltnp",
    "description": {
      "en": "Show Linux TCP listeners and process information where permitted.",
      "zh": "显示 Linux TCP 监听端口及有权限查看的进程信息。"
    },
    "keywords": [
      "system",
      "ports",
      "Listening TCP ports",
      "查看监听端口"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-ltnp",
        "description": {
          "en": "Listening TCP sockets, numeric addresses, process information.",
          "zh": "显示 TCP 监听套接字、数字地址及进程信息。"
        }
      }
    ],
    "examples": [
      {
        "command": "ss -ltnp",
        "description": {
          "en": "Example invocation; review its effects before use.",
          "zh": "调用示例，使用前请核对操作影响。"
        }
      }
    ]
  },
  {
    "id": "system-lsof",
    "category": "system",
    "name": {
      "en": "Port owner",
      "zh": "查看端口占用"
    },
    "command": "lsof -i :<port>",
    "description": {
      "en": "List processes using the port; may require elevated permissions.",
      "zh": "列出使用端口的进程，可能需要更高权限。"
    },
    "keywords": [
      "system",
      "lsof",
      "Port owner",
      "查看端口占用"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "linux",
      "macos"
    ],
    "risk": "safe",
    "parameters": [
      {
        "name": "-i :<port>",
        "description": {
          "en": "Select Internet connections using this port.",
          "zh": "选择使用此端口的网络连接。"
        }
      },
      {
        "name": "<port>",
        "description": {
          "en": "Port number",
          "zh": "端口号"
        }
      }
    ],
    "examples": [
      {
        "command": "lsof -i :443",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "system-tasks",
    "category": "system",
    "name": {
      "en": "Windows processes",
      "zh": "Windows 进程列表"
    },
    "command": "tasklist",
    "description": {
      "en": "List running Windows processes.",
      "zh": "列出运行中的 Windows 进程。"
    },
    "keywords": [
      "system",
      "tasks",
      "Windows processes",
      "Windows 进程列表"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "windows"
    ],
    "risk": "safe"
  },
  {
    "id": "system-stop-win",
    "category": "system",
    "name": {
      "en": "Stop PowerShell process",
      "zh": "PowerShell 结束进程"
    },
    "command": "Stop-Process -Id <pid>",
    "description": {
      "en": "Stop a process by ID in PowerShell.",
      "zh": "在 PowerShell 中按 ID 停止进程。"
    },
    "keywords": [
      "system",
      "stop-win",
      "Stop PowerShell process",
      "PowerShell 结束进程"
    ],
    "tags": [
      "caution"
    ],
    "platforms": [
      "windows"
    ],
    "risk": "caution",
    "parameters": [
      {
        "name": "-Id",
        "description": {
          "en": "Select a process by numeric ID; requires PowerShell.",
          "zh": "以数字 ID 选择进程，需要 PowerShell。"
        }
      },
      {
        "name": "<pid>",
        "description": {
          "en": "Target process ID; verify before stopping",
          "zh": "目标进程 ID，停止前请核对"
        }
      }
    ],
    "examples": [
      {
        "command": "Stop-Process -Id 1234",
        "description": {
          "en": "Example values; review the target before use.",
          "zh": "示例值，使用前请核对目标。"
        }
      }
    ]
  },
  {
    "id": "system-info-win",
    "category": "system",
    "name": {
      "en": "Windows system information",
      "zh": "Windows 系统信息"
    },
    "command": "systeminfo",
    "description": {
      "en": "Show Windows operating system and hardware information.",
      "zh": "显示 Windows 操作系统与硬件信息。"
    },
    "keywords": [
      "system",
      "info-win",
      "Windows system information",
      "Windows 系统信息"
    ],
    "tags": [
      "safe"
    ],
    "platforms": [
      "windows"
    ],
    "risk": "safe"
  }
]
