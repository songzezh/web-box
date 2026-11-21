import type { Shortcut } from './shortcut-model'

export const vimShortcuts: Shortcut[] = [
  {
    "id": "vim-1",
    "keys": "i",
    "category": "modes",
    "name": {
      "en": "Insert before cursor",
      "zh-CN": "在光标前进入插入模式"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord",
    "targetMode": "Insert"
  },
  {
    "id": "vim-2",
    "keys": "I",
    "category": "modes",
    "name": {
      "en": "Insert at first non-blank",
      "zh-CN": "在行首非空字符前插入"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord",
    "targetMode": "Insert"
  },
  {
    "id": "vim-3",
    "keys": "a",
    "category": "modes",
    "name": {
      "en": "Append after cursor",
      "zh-CN": "在光标后进入插入模式"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord",
    "targetMode": "Insert"
  },
  {
    "id": "vim-4",
    "keys": "A",
    "category": "modes",
    "name": {
      "en": "Append at end of line",
      "zh-CN": "在行尾进入插入模式"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord",
    "targetMode": "Insert"
  },
  {
    "id": "vim-5",
    "keys": "o",
    "category": "modes",
    "name": {
      "en": "Open line below",
      "zh-CN": "在下方新建一行并插入"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord",
    "targetMode": "Insert"
  },
  {
    "id": "vim-6",
    "keys": "O",
    "category": "modes",
    "name": {
      "en": "Open line above",
      "zh-CN": "在上方新建一行并插入"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord",
    "targetMode": "Insert"
  },
  {
    "id": "vim-7",
    "keys": "Esc",
    "category": "modes",
    "name": {
      "en": "Return to Normal mode",
      "zh-CN": "返回普通模式"
    },
    "modes": [
      "Insert",
      "Visual",
      "Visual Block",
      "Replace",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "chord",
    "targetMode": "Normal"
  },
  {
    "id": "vim-8",
    "keys": "v",
    "category": "modes",
    "name": {
      "en": "Characterwise Visual mode",
      "zh-CN": "进入字符可视模式"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "chord",
    "targetMode": "Visual"
  },
  {
    "id": "vim-9",
    "keys": "V",
    "category": "modes",
    "name": {
      "en": "Linewise Visual mode",
      "zh-CN": "进入行可视模式"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "chord",
    "targetMode": "Visual"
  },
  {
    "id": "vim-10",
    "keys": "Ctrl+v",
    "category": "modes",
    "name": {
      "en": "Visual Block mode",
      "zh-CN": "进入块可视模式（Vim）"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "chord",
    "targetMode": "Visual Block"
  },
  {
    "id": "vim-11",
    "keys": "R",
    "category": "modes",
    "name": {
      "en": "Replace mode",
      "zh-CN": "进入替换模式"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord",
    "targetMode": "Replace"
  },
  {
    "id": "vim-12",
    "keys": "h",
    "category": "navigation",
    "name": {
      "en": "Move left",
      "zh-CN": "向左移动"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-13",
    "keys": "j",
    "category": "navigation",
    "name": {
      "en": "Move down",
      "zh-CN": "向下移动"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-14",
    "keys": "k",
    "category": "navigation",
    "name": {
      "en": "Move up",
      "zh-CN": "向上移动"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-15",
    "keys": "l",
    "category": "navigation",
    "name": {
      "en": "Move right",
      "zh-CN": "向右移动"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-16",
    "keys": "w",
    "category": "navigation",
    "name": {
      "en": "Next word",
      "zh-CN": "移动到下一个单词开头"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-17",
    "keys": "W",
    "category": "navigation",
    "name": {
      "en": "Next WORD",
      "zh-CN": "移动到下一个 WORD 开头"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-18",
    "keys": "b",
    "category": "navigation",
    "name": {
      "en": "Previous word",
      "zh-CN": "移动到上一个单词开头"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-19",
    "keys": "e",
    "category": "navigation",
    "name": {
      "en": "End of word",
      "zh-CN": "移动到当前或下一个单词结尾"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-20",
    "keys": "0",
    "category": "navigation",
    "name": {
      "en": "Start of line",
      "zh-CN": "移动到行首"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-21",
    "keys": "^",
    "category": "navigation",
    "name": {
      "en": "First non-blank character",
      "zh-CN": "移动到行首非空字符"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-22",
    "keys": "$",
    "category": "navigation",
    "name": {
      "en": "End of line",
      "zh-CN": "移动到行尾"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-23",
    "keys": "gg",
    "category": "navigation",
    "name": {
      "en": "First line",
      "zh-CN": "移动到文件第一行（Vim）"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-24",
    "keys": "G",
    "category": "navigation",
    "name": {
      "en": "Last line",
      "zh-CN": "移动到文件最后一行"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-25",
    "keys": "{",
    "category": "navigation",
    "name": {
      "en": "Previous paragraph",
      "zh-CN": "移动到上一段落"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-26",
    "keys": "}",
    "category": "navigation",
    "name": {
      "en": "Next paragraph",
      "zh-CN": "移动到下一段落"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-27",
    "keys": "%",
    "category": "navigation",
    "name": {
      "en": "Matching bracket",
      "zh-CN": "跳转到匹配的括号"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-28",
    "keys": "Ctrl+f",
    "category": "navigation",
    "name": {
      "en": "Page down",
      "zh-CN": "向下翻页"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-29",
    "keys": "Ctrl+b",
    "category": "navigation",
    "name": {
      "en": "Page up",
      "zh-CN": "向上翻页"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-30",
    "keys": "Ctrl+d",
    "category": "navigation",
    "name": {
      "en": "Half-page down",
      "zh-CN": "向下滚动半页"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-31",
    "keys": "Ctrl+u",
    "category": "navigation",
    "name": {
      "en": "Half-page up",
      "zh-CN": "向上滚动半页"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-32",
    "keys": "H",
    "category": "navigation",
    "name": {
      "en": "Screen top",
      "zh-CN": "跳转到屏幕顶部"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-33",
    "keys": "M",
    "category": "navigation",
    "name": {
      "en": "Screen middle",
      "zh-CN": "跳转到屏幕中间"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-34",
    "keys": "L",
    "category": "navigation",
    "name": {
      "en": "Screen bottom",
      "zh-CN": "跳转到屏幕底部"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-35",
    "keys": "x",
    "category": "editing",
    "name": {
      "en": "Delete character",
      "zh-CN": "删除光标处字符"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-36",
    "keys": "X",
    "category": "editing",
    "name": {
      "en": "Delete previous character",
      "zh-CN": "删除光标前字符"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-37",
    "keys": "dd",
    "relatedCategories": [
      "clipboard"
    ],
    "category": "editing",
    "name": {
      "en": "Delete line (cut into register)",
      "zh-CN": "删除当前行（剪切到寄存器）"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-38",
    "keys": "D",
    "category": "editing",
    "name": {
      "en": "Delete to end of line",
      "zh-CN": "删除到行尾"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-39",
    "keys": "dw",
    "category": "editing",
    "name": {
      "en": "Delete to next word",
      "zh-CN": "删除到下一个单词开头"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-40",
    "keys": "diw",
    "category": "editing",
    "name": {
      "en": "Delete inner word",
      "zh-CN": "删除当前单词"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-41",
    "keys": "d$",
    "category": "editing",
    "name": {
      "en": "Delete to end of line",
      "zh-CN": "删除到行尾"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-42",
    "keys": "cc",
    "category": "editing",
    "name": {
      "en": "Change line",
      "zh-CN": "修改当前行"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence",
    "targetMode": "Insert"
  },
  {
    "id": "vim-43",
    "keys": "cw",
    "category": "editing",
    "name": {
      "en": "Change to end of word",
      "zh-CN": "修改到单词结尾"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence",
    "targetMode": "Insert"
  },
  {
    "id": "vim-44",
    "keys": "ciw",
    "category": "editing",
    "name": {
      "en": "Change inner word",
      "zh-CN": "修改当前单词"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence",
    "targetMode": "Insert"
  },
  {
    "id": "vim-45",
    "keys": "C",
    "category": "editing",
    "name": {
      "en": "Change to end of line",
      "zh-CN": "修改到行尾"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord",
    "targetMode": "Insert"
  },
  {
    "id": "vim-46",
    "keys": "r",
    "category": "editing",
    "name": {
      "en": "Replace one character",
      "zh-CN": "替换单个字符"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-47",
    "keys": "s",
    "category": "editing",
    "name": {
      "en": "Substitute character",
      "zh-CN": "删除字符并进入插入模式"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord",
    "targetMode": "Insert"
  },
  {
    "id": "vim-48",
    "keys": "J",
    "category": "editing",
    "name": {
      "en": "Join lines",
      "zh-CN": "合并当前行与下一行"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-49",
    "keys": "u",
    "category": "editing",
    "name": {
      "en": "Undo",
      "zh-CN": "撤销"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-50",
    "keys": "Ctrl+r",
    "category": "editing",
    "name": {
      "en": "Redo",
      "zh-CN": "重做"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "chord"
  },
  {
    "id": "vim-51",
    "keys": ".",
    "category": "editing",
    "name": {
      "en": "Repeat last change",
      "zh-CN": "重复上一次修改"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-52",
    "keys": "~",
    "category": "editing",
    "name": {
      "en": "Toggle character case",
      "zh-CN": "切换字符大小写"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-53",
    "keys": "yy",
    "category": "clipboard",
    "name": {
      "en": "Yank line",
      "zh-CN": "复制当前行"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-54",
    "keys": "yw",
    "category": "clipboard",
    "name": {
      "en": "Yank to next word",
      "zh-CN": "复制到下一个单词开头"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-55",
    "keys": "yiw",
    "category": "clipboard",
    "name": {
      "en": "Yank inner word",
      "zh-CN": "复制当前单词"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-56",
    "keys": "y$",
    "category": "clipboard",
    "name": {
      "en": "Yank to end of line",
      "zh-CN": "复制到行尾"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-57",
    "keys": "p",
    "category": "clipboard",
    "name": {
      "en": "Paste after",
      "zh-CN": "在光标后粘贴"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-58",
    "keys": "P",
    "category": "clipboard",
    "name": {
      "en": "Paste before",
      "zh-CN": "在光标前粘贴"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-59",
    "keys": "\"+y",
    "category": "clipboard",
    "name": {
      "en": "Yank to system clipboard",
      "zh-CN": "复制到系统剪贴板（Vim，需支持 clipboard）"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "conditional",
    "kind": "sequence"
  },
  {
    "id": "vim-60",
    "keys": "\"+p",
    "category": "clipboard",
    "name": {
      "en": "Paste from system clipboard",
      "zh-CN": "从系统剪贴板粘贴（Vim，需支持 clipboard）"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "conditional",
    "kind": "sequence"
  },
  {
    "id": "vim-61",
    "keys": "/text",
    "category": "search",
    "name": {
      "en": "Search forward",
      "zh-CN": "向前搜索文本"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "command"
  },
  {
    "id": "vim-62",
    "keys": "?text",
    "category": "search",
    "name": {
      "en": "Search backward",
      "zh-CN": "向后搜索文本"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "command"
  },
  {
    "id": "vim-63",
    "keys": "n",
    "category": "search",
    "name": {
      "en": "Next match in search direction",
      "zh-CN": "沿搜索方向跳转到下一匹配项"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-64",
    "keys": "N",
    "category": "search",
    "name": {
      "en": "Next match opposite search direction",
      "zh-CN": "逆搜索方向跳转匹配项"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "chord"
  },
  {
    "id": "vim-65",
    "keys": "*",
    "category": "search",
    "name": {
      "en": "Search word forward",
      "zh-CN": "向前搜索光标所在单词"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "chord"
  },
  {
    "id": "vim-66",
    "keys": "#",
    "category": "search",
    "name": {
      "en": "Search word backward",
      "zh-CN": "向后搜索光标所在单词"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "chord"
  },
  {
    "id": "vim-67",
    "keys": ":%s/old/new/g",
    "category": "search",
    "name": {
      "en": "Replace all occurrences",
      "zh-CN": "全文件替换"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "command"
  },
  {
    "id": "vim-68",
    "keys": ":%s/old/new/gc",
    "category": "search",
    "name": {
      "en": "Replace with confirmation",
      "zh-CN": "全文件替换并逐项确认"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "command"
  },
  {
    "id": "vim-69",
    "keys": ":noh",
    "category": "search",
    "name": {
      "en": "Clear search highlighting",
      "zh-CN": "取消搜索高亮（Vim）"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vim",
    "kind": "command"
  },
  {
    "id": "vim-70",
    "keys": ":w",
    "category": "files",
    "name": {
      "en": "Save file",
      "zh-CN": "保存文件"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "command"
  },
  {
    "id": "vim-71",
    "keys": ":q",
    "category": "files",
    "name": {
      "en": "Quit",
      "zh-CN": "退出"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "command"
  },
  {
    "id": "vim-72",
    "keys": ":wq",
    "category": "files",
    "name": {
      "en": "Save and quit",
      "zh-CN": "保存并退出"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "command"
  },
  {
    "id": "vim-73",
    "keys": ":x",
    "category": "files",
    "name": {
      "en": "Write if changed and quit",
      "zh-CN": "保存修改并退出"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "command"
  },
  {
    "id": "vim-74",
    "keys": "ZZ",
    "category": "files",
    "name": {
      "en": "Save if changed and quit",
      "zh-CN": "保存修改并退出"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-75",
    "keys": ":q!",
    "category": "files",
    "name": {
      "en": "Quit without saving",
      "zh-CN": "强制退出并放弃修改"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "command"
  },
  {
    "id": "vim-76",
    "keys": "ZQ",
    "category": "files",
    "name": {
      "en": "Quit without saving",
      "zh-CN": "不保存直接退出（Vim）"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-77",
    "keys": ":e filename",
    "category": "files",
    "name": {
      "en": "Edit file",
      "zh-CN": "打开指定文件"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "command"
  },
  {
    "id": "vim-78",
    "keys": ":w filename",
    "category": "files",
    "name": {
      "en": "Write to file",
      "zh-CN": "写入指定文件"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vi-vim",
    "kind": "command"
  },
  {
    "id": "vim-79",
    "keys": ":saveas filename",
    "category": "files",
    "name": {
      "en": "Save as",
      "zh-CN": "另存为（Vim）"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vim",
    "kind": "command"
  },
  {
    "id": "vim-80",
    "keys": ":split",
    "category": "windows",
    "name": {
      "en": "Horizontal split",
      "zh-CN": "水平分割窗口"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vim",
    "kind": "command"
  },
  {
    "id": "vim-81",
    "keys": ":vsplit",
    "category": "windows",
    "name": {
      "en": "Vertical split",
      "zh-CN": "垂直分割窗口"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vim",
    "kind": "command"
  },
  {
    "id": "vim-82",
    "keys": "Ctrl+w h",
    "category": "windows",
    "name": {
      "en": "Focus left window",
      "zh-CN": "切换到左侧窗口"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-83",
    "keys": "Ctrl+w j",
    "category": "windows",
    "name": {
      "en": "Focus lower window",
      "zh-CN": "切换到下方窗口"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-84",
    "keys": "Ctrl+w k",
    "category": "windows",
    "name": {
      "en": "Focus upper window",
      "zh-CN": "切换到上方窗口"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-85",
    "keys": "Ctrl+w l",
    "category": "windows",
    "name": {
      "en": "Focus right window",
      "zh-CN": "切换到右侧窗口"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-86",
    "keys": "Ctrl+w w",
    "category": "windows",
    "name": {
      "en": "Cycle windows",
      "zh-CN": "切换到下一个窗口"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-87",
    "keys": "Ctrl+w q",
    "category": "windows",
    "name": {
      "en": "Close current window",
      "zh-CN": "关闭当前窗口"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-88",
    "keys": ":bn",
    "category": "windows",
    "name": {
      "en": "Next buffer",
      "zh-CN": "切换到下一个缓冲区"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vim",
    "kind": "command"
  },
  {
    "id": "vim-89",
    "keys": ":bp",
    "category": "windows",
    "name": {
      "en": "Previous buffer",
      "zh-CN": "切换到上一个缓冲区"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vim",
    "kind": "command"
  },
  {
    "id": "vim-90",
    "keys": ":ls",
    "category": "windows",
    "name": {
      "en": "List buffers",
      "zh-CN": "查看缓冲区列表"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vim",
    "kind": "command"
  },
  {
    "id": "vim-91",
    "keys": ":bd",
    "category": "windows",
    "name": {
      "en": "Delete buffer",
      "zh-CN": "删除当前缓冲区"
    },
    "modes": [
      "Normal",
      "Command-line"
    ],
    "compatibility": "vim",
    "kind": "command"
  },
  {
    "id": "vim-92",
    "keys": ">>",
    "category": "formatting",
    "name": {
      "en": "Indent line",
      "zh-CN": "当前行右缩进"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-93",
    "keys": "<<",
    "category": "formatting",
    "name": {
      "en": "Unindent line",
      "zh-CN": "当前行左缩进"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-94",
    "keys": "==",
    "category": "formatting",
    "name": {
      "en": "Auto-indent line",
      "zh-CN": "自动缩进当前行"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-95",
    "keys": "gg=G",
    "category": "formatting",
    "name": {
      "en": "Reindent entire file",
      "zh-CN": "自动缩进整个文件（Vim）"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-96",
    "keys": "gqap",
    "category": "formatting",
    "name": {
      "en": "Format paragraph",
      "zh-CN": "格式化当前段落（Vim）"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "sequence"
  },
  {
    "id": "vim-97",
    "keys": ">",
    "category": "formatting",
    "name": {
      "en": "Indent selection",
      "zh-CN": "可视模式下增加缩进"
    },
    "modes": [
      "Visual",
      "Visual Block"
    ],
    "compatibility": "vim",
    "kind": "chord"
  },
  {
    "id": "vim-98",
    "keys": "<",
    "category": "formatting",
    "name": {
      "en": "Unindent selection",
      "zh-CN": "可视模式下减少缩进"
    },
    "modes": [
      "Visual",
      "Visual Block"
    ],
    "compatibility": "vim",
    "kind": "chord"
  },
  {
    "id": "vim-99",
    "keys": "ma",
    "category": "marks",
    "name": {
      "en": "Set mark a",
      "zh-CN": "在当前位置设置标记 a"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-100",
    "keys": "'a",
    "category": "marks",
    "name": {
      "en": "Jump to mark line",
      "zh-CN": "跳转到标记 a 所在行"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-101",
    "keys": "`a",
    "category": "marks",
    "name": {
      "en": "Jump to exact mark",
      "zh-CN": "精确跳转到标记 a"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-102",
    "keys": "''",
    "category": "marks",
    "name": {
      "en": "Previous jump line",
      "zh-CN": "返回上次跳转前所在行"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-103",
    "keys": "``",
    "category": "marks",
    "name": {
      "en": "Previous jump position",
      "zh-CN": "返回上次跳转前的精确位置"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vi-vim",
    "kind": "sequence"
  },
  {
    "id": "vim-104",
    "keys": "Ctrl+o",
    "category": "marks",
    "name": {
      "en": "Jump backward",
      "zh-CN": "返回跳转列表中的上一位置"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "chord"
  },
  {
    "id": "vim-105",
    "keys": "Ctrl+i",
    "category": "marks",
    "name": {
      "en": "Jump forward",
      "zh-CN": "前进到跳转列表中的下一位置"
    },
    "modes": [
      "Normal"
    ],
    "compatibility": "vim",
    "kind": "chord"
  }
]
