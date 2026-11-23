/** 工具活动记录：通过 localStorage 保存收藏与最近使用，并用窗口事件同步各 Hook 实例。 */
import { useEffect, useState } from "react";
const FAVORITES = "web-box:favorites";
const RECENT = "web-box:recent-tools";
/**
 * 读取去重后的工具 ID，保留原始顺序；仅检查字符串类型，不验证 ID 是否存在于 registry。
 * @param key - 收藏或最近使用的 localStorage 键
 * @returns 有效字符串数组；解析失败或存储不可访问时返回空数组
 */
export function readToolIds(key: string): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === "string"))]
      : [];
  } catch {
    return [];
  }
}
/**
 * 尝试持久化 ID 列表，并在当前窗口广播同步事件；写入失败也会发送事件。
 */
function save(key: string, ids: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    /* Preserve in-memory controls when storage is unavailable. */
  }
  window.dispatchEvent(new window.Event("web-box:tool-activity"));
}
/**
 * 读取指定工具的收藏和最近访问状态。
 * @param id - 工具 registry ID
 * @param visited - 默认 false；为 true 时在副作用执行时将工具移到最近列表首位，最多保留 20 项
 * @returns 收藏状态、是否存在最近记录及收藏切换函数
 */
export function useToolActivity(id: string, visited = false) {
  const [favorites, setFavorites] = useState(() => readToolIds(FAVORITES));
  const [recent, setRecent] = useState(() => readToolIds(RECENT));
  // storage 处理其他文档的变更，自定义事件处理同一窗口内的变更；依赖变化时重新订阅并清理旧监听。
  useEffect(() => {
    // 同步时重新读取存储；若存储不可用，则列表回退为空，无法保证其他 Hook 实例保留内存状态。
    const sync = () => {
      setFavorites(readToolIds(FAVORITES));
      setRecent(readToolIds(RECENT));
    };
    window.addEventListener("storage", sync);
    window.addEventListener("web-box:tool-activity", sync);
    if (visited)
      save(
        RECENT,
        [id, ...readToolIds(RECENT).filter((value) => value !== id)].slice(
          0,
          20,
        ),
      );
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("web-box:tool-activity", sync);
    };
  }, [id, visited]);
  const toggleFavorite = () => {
    const next = favorites.includes(id)
      ? favorites.filter((value) => value !== id)
      : [...favorites, id];
    save(FAVORITES, next);
    setFavorites(next);
  };
  return {
    favorite: favorites.includes(id),
    recent: recent.includes(id),
    toggleFavorite,
  };
}
