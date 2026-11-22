import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createServer } from "vite";
import { createElement, act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";

let server, root, dom, ToolCard, registry, i18n;
let renderKey = 0;
function RouteProbe() {
  return createElement("output", { "data-route": true }, useLocation().pathname);
}
before(async () => {
  dom = new JSDOM('<div id="root"></div>', { url: "https://example.com/" });
  for (const key of [
    "window",
    "document",
    "Node",
    "HTMLElement",
    "localStorage",
  ])
    globalThis[key] = dom.window[key];
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  server = await createServer({
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: "custom",
  });
  ToolCard = (await server.ssrLoadModule("/src/components/Tools.tsx")).ToolCard;
  registry = await server.ssrLoadModule("/src/registry/index.ts");
  i18n = (await server.ssrLoadModule("/src/i18n/index.ts")).default;
  root = createRoot(document.getElementById("root"));
});
after(async () => {
  await act(async () => root.unmount());
  await server.close();
  dom.window.close();
});
const render = async (tool = registry.tools[0], copies = 1) => {
  await act(async () =>
    root.render(
      createElement(
        MemoryRouter,
        { key: ++renderKey },
        createElement(RouteProbe),
        Array.from({ length: copies }, (_, index) =>
          createElement(ToolCard, {
            key: index,
            tool,
          }),
        ),
      ),
    ),
  );
};
test("whole cards contain only icon, title and description, and leave favorites intact", async () => {
  const favorites = JSON.stringify([registry.tools[0].id]);
  localStorage.setItem("web-box:favorites", favorites);
  await render(registry.tools[0], 2);
  for (const card of document.querySelectorAll(".wb-tool-card")) {
    assert.equal(card.tagName, "A");
    assert.equal(card.getAttribute("href"), registry.tools[0].path);
    assert.equal(card.getAttribute("aria-label"), registry.tools[0].name);
    assert.ok(card.querySelector(".wb-tool-card__title-row > .wb-tool-card__icon"));
    assert.ok(card.querySelector(".wb-tool-card__title-row > h3"));
    assert.ok(card.querySelector(".wb-tool-card__content > p"));
    assert.equal(card.querySelector("footer, button, a, .tag, [aria-pressed]"), null);
    assert.equal(card.querySelector(".wb-tool-card__expansion-circle").getAttribute("aria-hidden"), "true");
    assert.equal(card.querySelector("h3").textContent, registry.tools[0].name);
  }
  assert.equal(localStorage.getItem("web-box:favorites"), favorites);
});
test("language updates titles and descriptions immediately without changing the route; planned tools retain their route", async () => {
  await render();
  const path = document.querySelector("[data-route]").textContent;
  await act(async () => i18n.changeLanguage("zh-CN"));
  const card = document.querySelector(".wb-tool-card");
  assert.equal(card.getAttribute("aria-label"), i18n.t("tools:keyboard-shortcuts.name"));
  assert.equal(card.querySelector("h3").textContent, i18n.t("tools:keyboard-shortcuts.name"));
  assert.equal(card.querySelector("p").textContent, i18n.t("tools:keyboard-shortcuts.description"));
  assert.equal(document.querySelector("[data-route]").textContent, path);
  const planned = registry.tools.find(tool => tool.status === "coming-soon");
  await render(planned);
  assert.equal(document.querySelector(".wb-tool-card").getAttribute("href"), planned.path);
  assert.equal(document.querySelector(".wb-tool-card button"), null);
  await act(async () => i18n.changeLanguage("en"));
});
test("icon, title, description and card whitespace all navigate through React Router", async () => {
  for (const selector of [".wb-tool-card__icon", ".wb-tool-card__title", ".wb-tool-card__description", ".wb-tool-card"]) {
    await render();
    const card = document.querySelector(".wb-tool-card");
    await act(async () => card.focus());
    assert.equal(document.activeElement, card);
    await act(async () => document.querySelector(selector).dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true, button: 0 })));
    assert.equal(document.querySelector("[data-route]").textContent, registry.tools[0].path);
  }
});
