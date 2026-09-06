import {
  Workflow,
  GitBranch,
  BarChart3,
  Users,
  Bot,
  Plug,
  type LucideIcon,
} from "lucide-react";

// Add an entry here if you introduce a new "icon" value in data/services.ts
const iconMap: Record<string, LucideIcon> = {
  Workflow,
  GitBranch,
  BarChart3,
  Users,
  Bot,
  Plug,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Workflow;
}
