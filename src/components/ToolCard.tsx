import { Link } from "react-router-dom";
import { Keyboard, Terminal, CaseSensitive, Braces, Binary, ShieldCheck, Clock, Regex, Palette } from "lucide-react";
import type { ToolIcon } from "../registry";
import "./ToolCard.css";

const icons = { keyboard: Keyboard, terminal: Terminal, text: CaseSensitive, data: Braces, convert: Binary, security: ShieldCheck, time: Clock, regex: Regex, image: Palette };

export interface ToolCardProps {
  /** 已翻译的工具名称，同时作为链接可访问名称。 */
  name: string;
  /** 已翻译的工具说明。 */
  description: string;
  /** registry 限定的图标键。 */
  icon: ToolIcon;
  /** 站内工具路径，通过 Link 导航。 */
  path: string;
}

/* From Uiverse.io by Uncannypotato69 */
/**
 * 无内部 State 的工具入口视图；通过 path 执行 Router 导航，文案由上层翻译后传入。
 */
export function ToolCard({ name, description, icon, path }: ToolCardProps) {
  const Icon = icons[icon];
  return <Link className="wb-tool-card" to={path} aria-label={name}>
    <span className="wb-tool-card__expansion-circle" aria-hidden="true" />
    <div className="wb-tool-card__content">
      <div className="wb-tool-card__title-row">
        <Icon className="wb-tool-card__icon" size={26} strokeWidth={1.5} aria-hidden="true" />
        <h3 className="wb-tool-card__title">{name}</h3>
      </div>
      <p className="wb-tool-card__description">{description}</p>
    </div>
  </Link>;
}
