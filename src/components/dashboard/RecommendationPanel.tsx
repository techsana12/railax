import { Lightbulb, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Recommendation {
  id: string;
  priority: "high" | "medium" | "low";
  action: string;
  reason: string;
  impact: string;
  confidence: number;
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    priority: "high",
    action: "Hold Train 12221 at Kanpur Central",
    reason: "To prevent conflict with Express 12302 which is running on time",
    impact: "Saves 8 minutes total delay across network. Express arrives on time, passenger train delayed by only 3 minutes.",
    confidence: 94,
  },
  {
    id: "2",
    priority: "medium",
    action: "Prioritize Freight 17045 on Block B-7",
    reason: "Current schedule has buffer time. Can optimize track usage without passenger impact.",
    impact: "Reduces freight delay by 12 minutes. No impact on passenger services.",
    confidence: 87,
  },
  {
    id: "3",
    priority: "low",
    action: "Adjust Platform allocation at Lucknow",
    reason: "Better platform spacing improves departure punctuality",
    impact: "Potential 2-minute improvement in average departure time",
    confidence: 78,
  },
];

const priorityConfig = {
  high: {
    color: "bg-[hsl(var(--danger))] text-white",
    icon: AlertCircle,
  },
  medium: {
    color: "bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]",
    icon: Clock,
  },
  low: {
    color: "bg-primary/20 text-primary",
    icon: TrendingUp,
  },
};

export function RecommendationPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-secondary" />
        <h2 className="text-lg font-semibold text-foreground">AI Recommendations</h2>
        <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary">
          3 Active
        </Badge>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const config = priorityConfig[rec.priority];
          const Icon = config.icon;

          return (
            <Card key={rec.id} className="p-4 border-l-4 border-l-primary slide-in-right">
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{rec.action}</h3>
                    <Badge variant="outline" className="text-xs">
                      {rec.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <span className="font-medium text-foreground">Why:</span> {rec.reason}
                  </p>
                  <div className="p-2 bg-accent/10 rounded-lg mb-3">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">Impact:</span> {rec.impact}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                      Apply
                    </Button>
                    <Button size="sm" variant="outline">
                      Simulate
                    </Button>
                    <Button size="sm" variant="ghost">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
        <div className="text-2xl">🤖</div>
        <p className="text-sm text-foreground">
          <span className="font-semibold">Friendly Tip:</span> These recommendations are designed to minimize total network delay while keeping passenger satisfaction high!
        </p>
      </div>
    </div>
  );
}
