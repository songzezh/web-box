import "../i18n/index";
import { useCatalogTranslation } from "../i18n/useCatalogTranslation";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { ToolCard as ToolCardView } from "./ToolCard";
import { getSafeResourceUrl } from "../registry";
import type { ExternalResource, ToolDefinition } from "../registry";
// Catalog adapter: translations stay outside the visual card.
/**
 * 目录适配组件：把 ToolDefinition 的稳定 ID 翻译为文案，再交给纯展示 ToolCard。
 */
export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const copy = useCatalogTranslation();
  return <ToolCardView
    name={copy.tool(tool.id, "name")}
    description={copy.tool(tool.id, "description")}
    icon={tool.icon}
    path={tool.path}
  />;
}
/**
 * 展示外部资源，先验证 http/https URL；无效地址不渲染，新窗口链接隔离 opener。
 */
export function ResourceCard({ resource }: { resource: ExternalResource }) {
  const copy = useCatalogTranslation();
  const { t } = useTranslation([
    "common",
    "navigation",
    "categories",
    "resources",
    "tools",
  ]);
  const url = getSafeResourceUrl(resource.url);
  if (!url) return null;
  return (
    <a
      className="resource-card"
      href={url.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card-top">
        <span className="eyebrow">{url.hostname}</span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </div>
      <h3>{resource.name}</h3>
      <p>{copy.resource(resource.id)}</p>
      <div className="card-bottom">{t("resources:externalLink")}</div>
    </a>
  );
}
/**
 * 工具与说明页共用的页面壳；title、description 是已翻译文案，children 是调用方提供的页面内容。
 */
export function ToolPageLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-grid content-page">
      <h1>{title}</h1>
      <p className="lead">{description}</p>
      {children}
    </section>
  );
}
