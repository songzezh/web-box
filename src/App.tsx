/** 应用路由与页面壳；路由元数据依赖 registry 和国际化目录适配层。 */
import "./i18n/index";
import { useCatalogTranslation } from "./i18n/useCatalogTranslation";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  getCategoryPath,
  getToolById,
  projectUrl,
  externalResourceCategories,
  getResourceCategoryPath,
} from "./registry";
import Header from "./components/Header";
import { getRouteCategory, getRouteResourceCategory } from "./navigation";
import { ToolPageLayout } from "./components/Tools";
import Breadcrumbs from "./components/Breadcrumbs";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ResourcesPage from "./pages/ResourcesPage";
import NotFound from "./pages/NotFoundPage";
import "./App.css";
import CommandCheatSheet from "./features/command-cheatsheet/CommandCheatSheet";
import KeyboardShortcuts from "./features/keyboard-shortcuts/KeyboardShortcuts";

/**
 * 根据路由 toolId 分发两个已实现工具；其他已登记工具展示规划占位，未知 ID 展示未找到页。
 */
function ToolPage() {
  const copy = useCatalogTranslation();
  const { t } = useTranslation([
    "common",
    "navigation",
    "categories",
    "resources",
    "tools",
  ]);
  const { toolId = "" } = useParams();
  const tool = getToolById(toolId);
  if (!tool) return <NotFound />;
  if (tool.id === "command-cheatsheet") return <CommandCheatSheet />;
  if (tool.id === "keyboard-shortcuts") return <KeyboardShortcuts />;
  return (
    <ToolPageLayout
      title={copy.tool(tool.id, "name")}
      description={copy.tool(tool.id, "description")}
    >
      <div className="empty-state">
        <div>
          <span className="tag">{t("common:comingSoon")}</span>
          <h2>{t("common:plannedTitle")}</h2>
          <p>{t("common:plannedDescription")}</p>
          <Link to={getCategoryPath(tool.categoryId)}>
            {t("common:backCategory", { name: copy.category(tool.categoryId) })}
          </Link>
        </div>
      </div>
    </ToolPageLayout>
  );
}
/**
 * 根据当前路径与语言同步文档元信息，并在 location 变化后复位滚动和主内容焦点。
 */
function RouteEffects() {
  const copy = useCatalogTranslation();
  const { t, i18n } = useTranslation([
    "common",
    "navigation",
    "categories",
    "resources",
    "tools",
  ]);
  const location = useLocation();
  const resourceCategory = getRouteResourceCategory(location.pathname);
  const category = getRouteCategory(location.pathname);
  const tool = location.pathname.startsWith("/tools/")
    ? getToolById(location.pathname.split("/")[2])
    : undefined;
  const title = resourceCategory
    ? copy.resourceCategory(resourceCategory.id)
    : tool
      ? copy.tool(tool.id)
      : category
        ? copy.category(category.id)
        : ({
            "/": t("common:homeTitle"),
            "/about": t("navigation:about"),
            "/privacy": t("navigation:privacy"),
            "/resources": t("resources:title"),
          }[location.pathname] ?? t("common:notFoundTitle"));
  // 标题或语言变化时同步浏览器标题、HTML lang 和已有 description meta。
  useEffect(() => {
    document.title = `${title} — Web Box`;
    document.documentElement.lang = i18n.resolvedLanguage ?? "en";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("common:metaDescription"));
  }, [title, t, i18n, i18n.resolvedLanguage]);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("main-content")?.focus();
  }, [location]);
  return null;
}
/**
 * 全站页面壳：组合 Header、面包屑、HashRouter 内的路由内容与页脚。
 * 分类和资源路由由 registry 驱动；工具组件由 ToolPage 显式分发。
 */
export default function App() {
  const { t } = useTranslation([
    "common",
    "navigation",
    "categories",
    "resources",
    "tools",
  ]);
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        {t("common:skipContent")}
      </a>
      <Header />
      <RouteEffects />
      <main id="main-content" tabIndex={-1}>
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          {externalResourceCategories.map((category) => (
            <Route
              key={category.id}
              path={getResourceCategoryPath(category.id)}
              element={<ResourcesPage resourceCategoryId={category.id} />}
            />
          ))}
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/:categoryId" element={<CategoryPage />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
          <Route
            path="/about"
            element={
              <ToolPageLayout
                title={t("common:aboutTitle")}
                description={t("common:aboutDescription")}
              >
                <h2>{t("common:aboutProgressTitle")}</h2>
                <p>{t("common:aboutProgress")}</p>
                <h2>{t("common:aboutBrowserTitle")}</h2>
                <p>{t("common:aboutBrowser")}</p>
              </ToolPageLayout>
            }
          />
          <Route
            path="/privacy"
            element={
              <ToolPageLayout
                title={t("common:privacyTitle")}
                description={t("common:privacyDescription")}
              >
                <h2>{t("common:storageTitle")}</h2>
                <p>{t("common:storageDescription")}</p>
                <h2>{t("common:choiceTitle")}</h2>
                <p>{t("common:choiceDescription")}</p>
                <h2>{t("common:networkTitle")}</h2>
                <p>{t("common:networkDescription")}</p>
              </ToolPageLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <div className="page-grid footer-inner">
          <div>
            <Link className="footer-brand" to="/">
              Web Box
            </Link>
            <p>{t("common:footerDescription")}</p>
          </div>
          <nav aria-label={t("navigation:footer")}>
            <Link to="/about">{t("navigation:about")}</Link>
            <Link to="/privacy">{t("navigation:privacy")}</Link>
            <a href={projectUrl} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">{t("common:newTab")}</span>
            </a>
          </nav>
          <span className="footer-caption">{t("common:footerCaption")}</span>
        </div>
      </footer>
    </>
  );
}
