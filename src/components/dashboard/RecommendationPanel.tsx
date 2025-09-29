import { Lightbulb, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRailwayState, Recommendation } from "@/hooks/useRailwayState";
import { toast } from "@/hooks/use-toast";

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
  const { recommendations, applyRecommendation, dismissRecommendation, simulateAction } = useRailwayState();

  const handleApply = (rec: Recommendation) => {
    applyRecommendation(rec.id);
    toast({
      title: "Action Applied",
      description: `${rec.action} has been implemented successfully.`,
    });
  };

  const handleSimulate = (rec: Recommendation) => {
    const result = simulateAction(rec.trainId, rec.actionType, 3);
    if (result) {
      toast({
        title: "Simulation Complete",
        description: `Predicted impact: ${result.delayChange > 0 ? '+' : ''}${result.delayChange} min delay change. ${result.recommendation}`,
      });
    }
  };

  const handleDismiss = (recId: string) => {
    dismissRecommendation(recId);
    toast({
      title: "Recommendation Dismissed",
      description: "This recommendation has been removed from the list.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-secondary" />
        <h2 className="text-lg font-semibold text-foreground">AI Recommendations</h2>
        <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary">
          {recommendations.length} Active
        </Badge>
      </div>

      <div className="space-y-3">
        {recommendations.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">All caught up! No urgent recommendations at the moment.</p>
          </Card>
        ) : (
          recommendations.map((rec) => {
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
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90 text-white"
                      onClick={() => handleApply(rec)}
                    >
                      Apply
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSimulate(rec)}
                    >
                      Simulate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDismiss(rec.id)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })
        )}
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
