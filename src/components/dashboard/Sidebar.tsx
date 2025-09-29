import { Database, Brain, Cpu, LayoutDashboard, Train } from "lucide-react";
import { Card } from "@/components/ui/card";

const techStack = [
  {
    name: "Data Sources",
    icon: Database,
    items: ["RTIS Integration", "TMS Data Feed", "Station Systems"],
    color: "text-primary",
  },
  {
    name: "AI Engine",
    icon: Brain,
    items: ["Route Optimization", "Conflict Resolution", "Priority Manager"],
    color: "text-secondary",
  },
  {
    name: "ML Module",
    icon: Cpu,
    items: ["Delay Prediction", "Pattern Recognition", "Load Forecasting"],
    color: "text-accent",
  },
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    items: ["Real-time Viz", "Control Interface", "Analytics"],
    color: "text-primary",
  },
];

export function Sidebar() {
  return (
    <div className="w-72 bg-card border-r border-border p-4 space-y-4 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Train className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">RailAI Control</h1>
          <p className="text-xs text-muted-foreground">Indian Railways</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Tech Stack
        </h2>
        {techStack.map((stack) => (
          <Card key={stack.name} className="p-3 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className={`p-2 bg-muted rounded-lg ${stack.color}`}>
                <stack.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {stack.name}
                </h3>
                <ul className="space-y-0.5">
                  {stack.items.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="text-4xl">🚂</div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-1">
              System Status
            </p>
            <p className="text-xs text-muted-foreground">
              All systems operational. AI optimization active on 12 sections.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
