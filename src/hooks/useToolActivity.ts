import { useEffect, useState } from "react";
const FAVORITES = "web-box:favorites";
const RECENT = "web-box:recent-tools";
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
function save(key: string, ids: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    /* Preserve in-memory controls when storage is unavailable. */
  }
  window.dispatchEvent(new window.Event("web-box:tool-activity"));
}
export function useToolActivity(id: string, visited = false) {
  const [favorites, setFavorites] = useState(() => readToolIds(FAVORITES));
  const [recent, setRecent] = useState(() => readToolIds(RECENT));
  useEffect(() => {
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
