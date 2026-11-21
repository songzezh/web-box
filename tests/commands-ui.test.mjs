import { before, after, test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createServer } from "vite";
import { createElement, act, StrictMode } from "react";
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
  // jsdom does not implement the browser's native dialog top layer.
  dom.window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  dom.window.HTMLDialogElement.prototype.close = function () {
    const wasOpen = this.open;
    this.open = false;
    // Match native close(): the close event is queued, not dispatched inline.
    if (wasOpen) queueMicrotask(() => this.dispatchEvent(new dom.window.Event("close")));
  };
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
      createElement(StrictMode, null, createElement(
        MemoryRouter,
        { initialEntries: ["/tools/command-cheatsheet"] },
        createElement(App),
      )),
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
  assert.equal(rows().length, 22);
  assert.match(document.title, /Command Cheat Sheet/);
  assert.ok(document.querySelector('.breadcrumbs a[href="/dev-test"]'));
  assert.deepEqual(JSON.parse(localStorage.getItem("web-box:recent-tools")), [
    "command-cheatsheet",
  ]);
  assert.ok(document.querySelector('.desktop-nav a[aria-current="location"]'));
});
test("live filtering, clear, empty state and shortcut work together", async () => {
  await chooseCategory(0);
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
  assert.equal(document.querySelector("details"), null);
  assert.equal(document.querySelectorAll(".command-details-trigger").length, 22);
  await click(document.querySelector(".command-details-trigger"));
  assert.equal(document.querySelector(".command-dialog").open, true);
  assert.equal(document.querySelector("#command-dialog-title").textContent, "Initialize repository");
  assert.equal(document.querySelector("#command-parameters-title"), null);
  assert.equal(document.querySelector("#command-examples-title"), null);
  await click(document.querySelector(".command-dialog-close"));
  assert.equal(document.querySelector(".command-dialog"), null);
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
  assert.equal(rows().length, 22);
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
  assert.equal(buttons.length, 10);
  assert.equal(document.querySelector('option[value="all"]'), null);
  assert.doesNotMatch(sidebar.textContent, /All commands/);
  assert.equal(buttons[0].getAttribute("aria-pressed"), "true");
  document.body.style.overflow = "scroll";
  await search("verify");
  await chooseCategory(8); // OpenSSL, generated from the catalog.
  assert.equal(document.querySelector("#command-search").value, "verify");
  assert.equal(buttons[8].getAttribute("aria-pressed"), "true");
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
  assert.equal(buttons[9].getAttribute("aria-pressed"), "true");
  assert.ok(rows().length > 0);
  assert.ok([...document.querySelectorAll(".command-code code")].every(code => code.textContent.startsWith("keytool ")));
  assert.match(document.querySelector(".command-code button").getAttribute("aria-label"), /复制命令/);
  assert.ok([...document.querySelectorAll(".command-code button")].every(button => button.textContent.trim() === ""));
  await act(async () => i18n.changeLanguage("en"));
  assert.equal(select.value, "keytool");
  assert.equal(document.querySelector(".command-sidebar h2").textContent, "Categories");
  assert.match(select.options[0].textContent, /Git/);
  await chooseCategory(0);
  assert.equal(select.value, "git");
  await search("");
  assert.equal(rows().length, 22);
});

test("details dialog preserves filtering, restores focus and scroll, and copies command/examples independently", async () => {
  await chooseCategory(0);
  await search("git switch -c");
  const trigger = document.querySelector(".command-details-trigger");
  document.body.style.overflow = "scroll";
  const scrollPosition = window.scrollY;
  let copied = [];
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: async value => copied.push(value) }, configurable: true,
  });
  trigger.focus();
  await click(trigger);
  const dialog = document.querySelector(".command-dialog");
  assert.equal(document.querySelectorAll("dialog").length, 1);
  assert.equal(dialog.getAttribute("aria-modal"), "true");
  const terminal = dialog.querySelector(".terminal-card");
  assert.equal(dialog.querySelectorAll(".terminal-card").length, 1);
  assert.equal(terminal.querySelectorAll(".terminal-dot").length, 3);
  assert.equal(terminal.querySelector(".terminal-dots").getAttribute("aria-hidden"), "true");
  assert.equal(terminal.querySelector(".terminal-dots button"), null);
  assert.equal(terminal.querySelector(".terminal-shell").textContent, "bash");
  assert.equal(terminal.querySelector(".terminal-prompt").textContent, "$ ");
  assert.equal(terminal.querySelector("code").textContent, "git switch -c <branch-name>");
  assert.equal(dialog.querySelector(".command-example .terminal-prompt"), null);
  assert.equal(document.activeElement.id, "command-dialog-title");
  assert.equal(document.body.style.overflow, "hidden");
  assert.match(document.querySelector("#command-parameters-title").textContent, /Parameters/);
  assert.match(dialog.textContent, /<branch-name>/);
  assert.match(document.querySelector("#command-examples-title").textContent, /Examples/);
  assert.match(dialog.textContent, /feature\/login/);
  assert.deepEqual(copied, []); // Details does not copy.
  await click(dialog.querySelector(".command-copy"));
  await click(dialog.querySelector(".command-example .command-copy"));
  assert.deepEqual(copied, ["git switch -c <branch-name>", "git switch -c feature/login"]);
  assert.ok(copied.every(value => !value.startsWith("$")));
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: async () => { throw Error("denied"); } }, configurable: true,
  });
  await click(terminal.querySelector(".command-copy"));
  assert.match(terminal.querySelector('[role="alert"]').textContent, /Copy failed/);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: async value => copied.push(value) }, configurable: true,
  });
  await click(terminal.querySelector(".command-copy"));
  await act(async () => dialog.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "/", bubbles: true })));
  assert.notEqual(document.activeElement.id, "command-search");
  await act(async () => i18n.changeLanguage("zh-CN"));
  assert.match(document.querySelector("#command-parameters-title").textContent, /参数说明/);
  assert.equal(document.querySelector(".command-dialog-close").getAttribute("aria-label"), "关闭");
  assert.match(dialog.querySelector(".command-copy").getAttribute("aria-label"), /已复制/);
  await act(async () => dialog.dispatchEvent(new dom.window.Event("cancel", { cancelable: true })));
  assert.equal(document.querySelector(".command-dialog"), null);
  assert.equal(document.body.style.overflow, "scroll");
  assert.equal(document.activeElement, trigger);
  assert.equal(window.scrollY, scrollPosition);
  assert.equal(document.querySelector("#command-search").value, "git switch -c");
  assert.equal(document.querySelector("#command-category-select").value, "git");
  await click(trigger);
  const reopened = document.querySelector(".command-dialog");
  await act(async () => reopened.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true, clientX: -1, clientY: -1 })));
  assert.equal(document.querySelector(".command-dialog"), null);
  assert.equal(document.activeElement, trigger);
  await search("git reset --hard");
  await click(document.querySelector(".command-details-trigger"));
  assert.match(document.querySelector(".command-dialog .command-warning").textContent, /永久丢弃/);
  await click(document.querySelector(".command-dialog-close"));
  await act(async () => i18n.changeLanguage("en"));
  await search("");
  await chooseCategory(0);
  document.body.style.overflow = "";
});

test("StrictMode and delayed native close events do not dismiss an open details modal", async () => {
  const trigger = document.querySelector(".command-details-trigger");
  await click(trigger);
  const dialog = document.querySelector(".command-dialog");
  assert.ok(dialog?.open);
  assert.equal(document.activeElement.id, "command-dialog-title");
  await act(async () => dialog.dispatchEvent(new dom.window.Event("close")));
  assert.equal(document.querySelector(".command-dialog"), dialog);
  assert.equal(document.body.style.overflow, "hidden");
  // A genuine native close must still synchronize the page selection state.
  await act(async () => dialog.close());
  assert.equal(document.querySelector(".command-dialog"), null);
  assert.equal(document.activeElement, trigger);
  assert.notEqual(document.body.style.overflow, "hidden");
  await click(trigger);
  assert.ok(document.querySelector(".command-dialog")?.open);
  await click(document.querySelector(".command-dialog-close"));
  assert.equal(document.querySelector(".command-dialog"), null);
});
