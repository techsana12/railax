import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: "success" | "warning" | "primary" | "danger";
}

const colorClasses = {
  success: "bg-accent/10 text-accent",
  warning: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
  primary: "bg-primary/10 text-primary",
  danger: "bg-[hsl(var(--danger))]/10 text-[hsl(var(--danger))]",
};

const trendClasses = {
  up: "text-accent",
  down: "text-[hsl(var(--danger))]",
  neutral: "text-muted-foreground",
};

export function KPICard({ title, value, change, trend, icon: Icon, color }: KPICardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground mb-2">{value}</p>
          <p className={`text-xs font-medium ${trendClasses[trend]}`}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trend === "neutral" && "→"} {change}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
