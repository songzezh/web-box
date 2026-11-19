import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  createMemoryRouter,
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

let server;
let HomePage;
let CategoryPage;
let ToolCard;
let registry;
before(async () => {
  server = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });
  HomePage = (await server.ssrLoadModule("/src/pages/HomePage.tsx")).default;
  CategoryPage = (await server.ssrLoadModule("/src/pages/CategoryPage.tsx"))
    .default;
  ToolCard = (await server.ssrLoadModule("/src/components/Tools.tsx")).ToolCard;
  registry = await server.ssrLoadModule("/src/registry/index.ts");
});
after(async () => {
  await server?.close();
});
function renderPage(component, path, pattern) {
  return renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: [path] },
      createElement(
        Routes,
        null,
        createElement(Route, {
          path: pattern,
          element: createElement(component),
        }),
      ),
    ),
  );
}

test("home renders seven category destinations and no individual tool cards", () => {
  const html = renderPage(HomePage, "/", "/");
  assert.equal((html.match(/class="category-card"/g) ?? []).length, 7);
  for (const category of registry.categories) {
    assert.ok(html.includes(`href="${registry.getCategoryPath(category.id)}"`));
    assert.ok(html.includes(`${category.plannedToolCount} planned tools`));
  }
  assert.ok(!html.includes('class="tool-card'));
  assert.ok(!html.includes('href="/tools/'));
  assert.ok(!html.includes("category-nav"));
  assert.ok(html.includes('href="/resources"'));
  assert.ok(html.includes("<dt>Planned Tools</dt><dd>60</dd>"));
  assert.ok(html.includes("<dt>Available Tools</dt><dd>1</dd>"));
});
test("category routes show only their associated tools and Coming soon has no link", () => {
  for (const category of registry.categories) {
    const html = renderPage(
      CategoryPage,
      registry.getCategoryPath(category.id),
      "/:categoryId",
    );
    for (const tool of registry.tools)
      assert.equal(html.includes(tool.name), tool.categoryId === category.id);
    assert.ok(html.includes("Coming soon"));
    assert.equal(
      html.includes('href="/tools/command-cheatsheet"'),
      category.id === "dev-test",
    );
  }
});
test("unknown category renders not found and a real empty category renders an empty state", () => {
  const missing = renderPage(CategoryPage, "/missing", "/:categoryId");
  assert.ok(missing.includes("Page not found."));
  const removed = registry.tools.splice(0);
  try {
    const empty = renderPage(CategoryPage, "/text-content", "/:categoryId");
    assert.ok(empty.includes("No tools registered yet."));
    assert.ok(!empty.includes('class="tool-card'));
  } finally {
    registry.tools.push(...removed);
  }
});
test("available tool cards expose their registered destination", () => {
  const tool = { ...registry.tools[0], status: "available" };
  const html = renderToStaticMarkup(
    createElement(
      MemoryRouter,
      null,
      createElement(ToolCard, { tool, category: "Test category" }),
    ),
  );
  assert.ok(html.includes(`href="${tool.path}"`));
  assert.ok(html.includes("Open tool"));
});

test("breadcrumbs show the category level and return a not-found label for unknown categories", async () => {
  const Breadcrumbs = (
    await server.ssrLoadModule("/src/components/Breadcrumbs.tsx")
  ).default;
  const category = renderPage(Breadcrumbs, "/text-content", "*");
  assert.match(category, /<a[^>]+href="\/"[^>]*>Home<\/a>/);
  assert.ok(category.includes('aria-current="page">Text &amp; Content'));
  assert.ok(!category.includes('href="/category/'));
  const tool = renderPage(Breadcrumbs, "/tools/text-statistics", "*");
  assert.ok(tool.includes('href="/text-content"'));
  assert.ok(tool.includes('aria-current="page">Text statistics'));
  assert.ok(
    renderPage(Breadcrumbs, "/missing", "*").includes(
      'aria-current="page">Not found',
    ),
  );
  assert.equal(renderPage(Breadcrumbs, "/", "*"), "");
});
test("router history supports category entry, back and forward navigation", async () => {
  const router = createMemoryRouter(
    [
      { path: "/", element: createElement(HomePage) },
      { path: "/:categoryId", element: createElement(CategoryPage) },
    ],
    { initialEntries: ["/"] },
  );
  try {
    await router.navigate("/data-format");
    assert.ok(
      renderToStaticMarkup(createElement(RouterProvider, { router })).includes(
        "JSON formatter",
      ),
    );
    await router.navigate(-1);
    assert.equal(router.state.location.pathname, "/");
    assert.ok(
      renderToStaticMarkup(createElement(RouterProvider, { router })).includes(
        'class="category-card"',
      ),
    );
    await router.navigate(1);
    assert.equal(router.state.location.pathname, "/data-format");
    assert.ok(
      renderToStaticMarkup(createElement(RouterProvider, { router })).includes(
        "JSON formatter",
      ),
    );
  } finally {
    router.dispose();
  }
});

test("global navigation has the requested order and shares category-card destinations", async () => {
  const GlobalNavigation = (
    await server.ssrLoadModule("/src/components/GlobalNavigation.tsx")
  ).default;
  const html = renderPage(
    () => createElement(GlobalNavigation, { className: "desktop-nav" }),
    "/",
    "*",
  );
  const links = [
    ...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g),
  ];
  assert.deepEqual(
    links.map((link) => link[2]),
    [
      "Home",
      "Text",
      "Data",
      "Encode",
      "Security",
      "Time",
      "Dev",
      "Image",
      "Resources",
    ],
  );
  assert.deepEqual(
    links.map((link) => link[1]),
    [
      "/",
      ...registry.categories.map((category) =>
        registry.getCategoryPath(category.id),
      ),
      "/resources",
    ],
  );
});
test("active navigation follows category routes, tool metadata, auxiliary pages and fresh loads", async () => {
  const GlobalNavigation = (
    await server.ssrLoadModule("/src/components/GlobalNavigation.tsx")
  ).default;
  const { getActiveNavigationPath } =
    await server.ssrLoadModule("/src/navigation.ts");
  const navigation = () =>
    createElement(GlobalNavigation, { className: "desktop-nav" });
  for (const category of registry.categories) {
    const path = registry.getCategoryPath(category.id);
    const html = renderPage(navigation, path, "*");
    assert.equal((html.match(/aria-current="page"/g) ?? []).length, 1);
    assert.match(
      html,
      new RegExp(`aria-current="page"[^>]*>${category.shortName}</a>`),
    );
    assert.equal(getActiveNavigationPath(path + "/"), path);
    assert.equal(getActiveNavigationPath("/category/" + category.id), path);
  }
  for (const tool of registry.tools) {
    const html = renderPage(navigation, tool.path, "*");
    const category = registry.getCategoryById(tool.categoryId);
    assert.equal((html.match(/aria-current="location"/g) ?? []).length, 1);
    assert.match(
      html,
      new RegExp(`aria-current="location"[^>]*>${category.shortName}</a>`),
    );
  }
  for (const path of [
    "/about",
    "/privacy",
    "/missing",
    "/tools/missing",
    "/resources/extra",
  ]) {
    assert.equal(getActiveNavigationPath(path), null);
    assert.ok(!renderPage(navigation, path, "*").includes("aria-current="));
  }
  assert.match(
    renderPage(navigation, "/resources", "*"),
    /aria-current="page"[^>]*>Resources<\/a>/,
  );
  assert.match(
    renderPage(navigation, "/", "*"),
    /aria-current="page"[^>]*>Home<\/a>/,
  );
});
test("navigation active state follows forward and back route transitions", async () => {
  const GlobalNavigation = (
    await server.ssrLoadModule("/src/components/GlobalNavigation.tsx")
  ).default;
  const router = createMemoryRouter(
    [
      {
        path: "*",
        element: createElement(GlobalNavigation, { className: "desktop-nav" }),
      },
    ],
    { initialEntries: ["/"] },
  );
  const html = () =>
    renderToStaticMarkup(createElement(RouterProvider, { router }));
  try {
    await router.navigate("/tools/json-formatter");
    assert.match(html(), /aria-current="location"[^>]*>Data<\/a>/);
    await router.navigate("/resources");
    assert.match(html(), /aria-current="page"[^>]*>Resources<\/a>/);
    await router.navigate(-1);
    assert.match(html(), /aria-current="location"[^>]*>Data<\/a>/);
    await router.navigate(1);
    assert.match(html(), /aria-current="page"[^>]*>Resources<\/a>/);
  } finally {
    router.dispose();
  }
});
test("resource overview shows eight categories without external resource cards", async () => {
  const ResourcesPage = (
    await server.ssrLoadModule("/src/pages/ResourcesPage.tsx")
  ).default;
  const html = renderPage(ResourcesPage, "/resources", "*");
  assert.equal((html.match(/class="category-card"/g) ?? []).length, 8);
  assert.ok(!html.includes('target="_blank"'));
  for (const category of registry.externalResourceCategories) {
    assert.ok(
      html.includes(`href="${registry.getResourceCategoryPath(category.id)}"`),
    );
    assert.ok(html.includes(category.name.replaceAll("&", "&amp;")));
  }
});

test("resource categories filter lists, show empty states and preserve navigation on fresh loads", async () => {
  const ResourcesPage = (
    await server.ssrLoadModule("/src/pages/ResourcesPage.tsx")
  ).default;
  const GlobalNavigation = (
    await server.ssrLoadModule("/src/components/GlobalNavigation.tsx")
  ).default;
  const Breadcrumbs = (
    await server.ssrLoadModule("/src/components/Breadcrumbs.tsx")
  ).default;
  for (const category of registry.externalResourceCategories) {
    const path = registry.getResourceCategoryPath(category.id);
    const html = renderPage(
      () => createElement(ResourcesPage, { resourceCategoryId: category.id }),
      path,
      "*",
    );
    const resources = registry.getResourcesByCategory(category.id);
    for (const resource of registry.resources)
      assert.equal(
        html.includes(`href="${resource.url}"`),
        resource.categoryId === category.id,
      );
    assert.equal(
      (html.match(/target="_blank"/g) ?? []).length,
      resources.length,
    );
    assert.equal(
      (html.match(/rel="noopener noreferrer"/g) ?? []).length,
      resources.length,
    );
    assert.equal(html.includes("No resources yet."), resources.length === 0);
    assert.match(html, new RegExp(`aria-current="page"[^>]*href="${path}"`));
    assert.match(
      renderPage(
        () => createElement(GlobalNavigation, { className: "desktop-nav" }),
        path,
        "*",
      ),
      /aria-current="location"[^>]*>Resources<\/a>/,
    );
    assert.ok(
      renderPage(Breadcrumbs, path, "*").includes(
        `aria-current="page">${category.name.replaceAll("&", "&amp;")}`,
      ),
    );
  }
  assert.ok(
    renderPage(
      () => createElement(ResourcesPage, { resourceCategoryId: "missing" }),
      "/resources/missing",
      "*",
    ).includes("Page not found."),
  );
});

test("resource category history restores the selected category", async () => {
  const ResourcesPage = (
    await server.ssrLoadModule("/src/pages/ResourcesPage.tsx")
  ).default;
  const router = createMemoryRouter(
    [
      { path: "/resources", element: createElement(ResourcesPage) },
      ...registry.externalResourceCategories.map((category) => ({
        path: registry.getResourceCategoryPath(category.id),
        element: createElement(ResourcesPage, {
          resourceCategoryId: category.id,
        }),
      })),
    ],
    { initialEntries: ["/resources"] },
  );
  const html = () =>
    renderToStaticMarkup(createElement(RouterProvider, { router }));
  try {
    await router.navigate("/resources/ext-dev");
    assert.ok(html().includes("regex101"));
    await router.navigate("/resources/ext-security");
    assert.ok(html().includes("No resources yet."));
    await router.navigate(-1);
    assert.ok(html().includes("regex101"));
    await router.navigate(1);
    assert.ok(html().includes("No resources yet."));
  } finally {
    router.dispose();
  }
});

test("resource cards never render unsafe URLs", async () => {
  const { ResourceCard } = await server.ssrLoadModule(
    "/src/components/Tools.tsx",
  );
  for (const url of [
    "javascript:alert(1)",
    "data:text/html,test",
    "//example.com",
    "https://user:secret@example.com",
    "invalid",
  ]) {
    assert.equal(
      renderToStaticMarkup(
        createElement(ResourceCard, {
          resource: { ...registry.resources[0], url },
        }),
      ),
      "",
    );
  }
});
