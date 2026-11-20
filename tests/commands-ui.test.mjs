import { before, after, test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createServer } from "vite";
import { createElement, act } from "react";
import { MemoryRouter } from "react-router-dom";
let server, dom, root, App, i18n;
before(async () => {
  dom = new JSDOM(
    '<html><head></head><body><div id="root"></div></body></html>',
    { url: "https://example.com/" },
  );
  for (const key of [
    "window",
    "document",
    "Node",
    "Element",
    "HTMLElement",
    "localStorage",
  ])
    globalThis[key] = dom.window[key];
  Object.defineProperty(globalThis, "navigator", {
    value: dom.window.navigator,
    configurable: true,
  });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.matchMedia = () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  });
  window.scrollTo = () => {};
  server = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });
  App = (await server.ssrLoadModule("/src/App.tsx")).default;
  i18n = (await server.ssrLoadModule("/src/i18n/index.ts")).default;
  const { createRoot } = await import("react-dom/client");
  root = createRoot(document.getElementById("root"));
  await act(async () =>
    root.render(
      createElement(
        MemoryRouter,
        { initialEntries: ["/tools/command-cheatsheet"] },
        createElement(App),
      ),
    ),
  );
});
after(async () => {
  await act(async () => root?.unmount());
  await server?.close();
  dom?.window.close();
});
const click = (element) => act(async () => element.click());
const rows = () => document.querySelectorAll(".command-row");
const chooseCategory = async index => {
  await click(document.querySelectorAll(".command-category-list button")[index]);
};
const search = async (value) =>
  act(async () => {
    const input = document.querySelector("#command-search");
    Object.getOwnPropertyDescriptor(
      dom.window.HTMLInputElement.prototype,
      "value",
    ).set.call(input, value);
    input.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  });
test("registered route renders all commands, category navigation, metadata and local recent visit", () => {
  assert.equal(rows().length, 147);
  assert.match(document.title, /Command Cheat Sheet/);
  assert.ok(document.querySelector('.breadcrumbs a[href="/dev-test"]'));
  assert.deepEqual(JSON.parse(localStorage.getItem("web-box:recent-tools")), [
    "command-cheatsheet",
  ]);
  assert.ok(document.querySelector('.desktop-nav a[aria-current="location"]'));
});
test("live filtering, clear, empty state and shortcut work together", async () => {
  await chooseCategory(1);
  assert.equal(rows().length, 22);
  await search("工作区状态");
  assert.equal(rows().length, 1);
  await search("no-result-123");
  assert.equal(rows().length, 0);
  assert.match(
    document.querySelector(".empty-state").textContent,
    /No matching/,
  );
  await click(document.querySelector(".command-search button"));
  assert.equal(rows().length, 22);
  document.querySelector("h1").focus();
  await act(async () =>
    document.dispatchEvent(
      new dom.window.KeyboardEvent("keydown", { key: "/", bubbles: true }),
    ),
  );
  assert.equal(document.activeElement.id, "command-search");
  const editable = document.createElement("textarea");
  document.body.append(editable);
  editable.focus();
  await act(async () =>
    editable.dispatchEvent(
      new dom.window.KeyboardEvent("keydown", { key: "/", bubbles: true }),
    ),
  );
  assert.equal(document.activeElement, editable);
  editable.remove();
  await chooseCategory(0);
});
test("copy success, denied and unavailable feedback; details and dangerous warnings", async () => {
  let copied;
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: async (value) => {
        copied = value;
      },
    },
    configurable: true,
  });
  await click(document.querySelector(".command-code button"));
  assert.equal(copied, "git init");
  assert.equal(document.querySelector(".command-code button").textContent.trim(), "");
  assert.match(document.querySelector(".command-code button").getAttribute("aria-label"), /Copied/);
  assert.ok(document.querySelector(".command-code button .lucide-check"));
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: async () => {
        throw Error("denied");
      },
    },
    configurable: true,
  });
  await click(document.querySelector(".command-code button"));
  assert.match(
    document.querySelector('[role="alert"]').textContent,
    /Copy failed/,
  );
  Object.defineProperty(navigator, "clipboard", {
    value: undefined,
    configurable: true,
  });
  await click(document.querySelector(".command-code button"));
  assert.ok(document.querySelector('[role="alert"]'));
  const details = document.querySelector("details");
  await click(details.querySelector("summary"));
  assert.equal(details.open, true);
  await click(details.querySelector("summary"));
  assert.equal(details.open, false);
  assert.match(
    document.querySelector(".command-sheet").textContent,
    /Permanently discards/,
  );
});
test("favorite persists and global language switch updates UI without changing command syntax", async () => {
  await click(document.querySelector(".command-favorite"));
  assert.deepEqual(JSON.parse(localStorage.getItem("web-box:favorites")), [
    "command-cheatsheet",
  ]);
  assert.equal(
    document
      .querySelector(".command-favorite")
      .getAttribute("aria-pressed"),
    "true",
  );
  await act(async () => i18n.changeLanguage("zh-CN"));
  assert.equal(document.querySelector("h1").textContent, "常用命令速查");
  assert.match(document.querySelector(".command-favorite").getAttribute("aria-label"), /取消收藏/);
  assert.equal(
    document.querySelector(".command-code code").textContent,
    "git init",
  );
  assert.match(
    document.querySelector(".command-category-list").textContent,
    /Git 版本控制/,
  );
  assert.match(
    document.querySelector(".command-sheet").textContent,
    /永久丢弃/,
  );
  await click(document.querySelector(".command-favorite"));
  assert.deepEqual(JSON.parse(localStorage.getItem("web-box:favorites")), []);
});

test("existing theme control switches themes while command content stays mounted", async () => {
  const beforeTheme = document.documentElement.dataset.theme;
  await click(document.querySelector(".theme-toggle:not(.language-toggle)"));
  assert.notEqual(document.documentElement.dataset.theme, beforeTheme);
  assert.equal(rows().length, 147);
  assert.equal(
    document.querySelector(".command-code code").textContent,
    "git init",
  );
  await click(document.querySelector(".theme-toggle:not(.language-toggle)"));
});

test("persistent categories filter without a drawer or background scroll lock", async () => {
  await act(async () => i18n.changeLanguage("en"));
  assert.equal(document.querySelector("dialog"), null);
  assert.equal(document.querySelector(".command-category-trigger"), null);
  const sidebar = document.querySelector(".command-sidebar");
  assert.ok(sidebar);
  assert.equal(document.querySelector(".command-content").parentElement, sidebar.parentElement);
  const buttons = sidebar.querySelectorAll("button");
  assert.equal(buttons.length, 11);
  assert.equal(buttons[0].getAttribute("aria-pressed"), "true");
  document.body.style.overflow = "scroll";
  await search("verify");
  await chooseCategory(9); // OpenSSL, generated from the catalog.
  assert.equal(document.querySelector("#command-search").value, "verify");
  assert.equal(buttons[9].getAttribute("aria-pressed"), "true");
  assert.equal(buttons[0].getAttribute("aria-pressed"), "false");
  assert.equal(document.querySelector("#command-category-select").value, "openssl");
  assert.equal(document.body.style.overflow, "scroll");
  assert.ok(rows().length > 0 && rows().length < 40);
  assert.ok([...document.querySelectorAll(".command-code code")].every(code => code.textContent.startsWith("openssl ")));
  await chooseCategory(0);
  await search("");
  document.body.style.overflow = "";
});

test("mobile selection shares category state, search and translated names with the sidebar", async () => {
  await act(async () => i18n.changeLanguage("zh-CN"));
  const select = document.querySelector("#command-category-select");
  assert.equal(document.querySelector("label[for=command-category-select]").textContent, "分类");
  assert.equal(document.querySelector(".command-sidebar h2").textContent, "分类");
  const buttons = document.querySelectorAll(".command-category-list button");
  assert.equal(select.options.length, buttons.length);
  for (const [index, option] of [...select.options].entries()) {
    assert.ok(buttons[index].textContent.includes(option.textContent.replace(/ \(\d+\)$/, "")));
  }
  await search("p12");
  select.focus();
  await act(async () => select.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "/", bubbles: true })));
  assert.equal(document.activeElement, select);
  await act(async () => {
    select.value = "keytool";
    select.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
  });
  assert.equal(document.querySelector("#command-search").value, "p12");
  assert.equal(buttons[10].getAttribute("aria-pressed"), "true");
  assert.ok(rows().length > 0);
  assert.ok([...document.querySelectorAll(".command-code code")].every(code => code.textContent.startsWith("keytool ")));
  assert.match(document.querySelector(".command-code button").getAttribute("aria-label"), /复制命令/);
  assert.ok([...document.querySelectorAll(".command-code button")].every(button => button.textContent.trim() === ""));
  await act(async () => i18n.changeLanguage("en"));
  assert.equal(select.value, "keytool");
  assert.equal(document.querySelector(".command-sidebar h2").textContent, "Categories");
  assert.match(select.options[0].textContent, /All commands/);
  await chooseCategory(0);
  assert.equal(select.value, "all");
  await search("");
  assert.equal(rows().length, 147);
});
