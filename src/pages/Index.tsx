import { Clock, Zap, Activity, TrendingUp } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { KPICard } from "@/components/dashboard/KPICard";
import { TrainCard } from "@/components/dashboard/TrainCard";
import { RailwayMap } from "@/components/dashboard/RailwayMap";
import { RecommendationPanel } from "@/components/dashboard/RecommendationPanel";
import { WhatIfSimulator } from "@/components/dashboard/WhatIfSimulator";
import { useRailwayState } from "@/hooks/useRailwayState";

const Index = () => {
  const { trains, metrics } = useRailwayState();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header KPIs */}
          <div className="grid grid-cols-4 gap-4">
            <KPICard
              title="On-Time Performance"
              value={`${metrics.onTimePerformance.toFixed(1)}%`}
              change={`${(metrics.onTimePerformance - 87.2).toFixed(1)}% from start`}
              trend={metrics.onTimePerformance >= 87.2 ? "up" : "neutral"}
              icon={Clock}
              color="success"
            />
            <KPICard
              title="Avg. Delay"
              value={`${metrics.avgDelay.toFixed(1)} min`}
              change={`${(4.8 - metrics.avgDelay).toFixed(1)} min improvement`}
              trend={metrics.avgDelay <= 4.8 ? "up" : "neutral"}
              icon={TrendingUp}
              color="primary"
            />
            <KPICard
              title="Active Trains"
              value={metrics.activeTrains.toString()}
              change="Real-time tracking"
              trend="neutral"
              icon={Activity}
              color="primary"
            />
            <KPICard
              title="AI Optimizations"
              value={metrics.aiOptimizations.toString()}
              change="Applied today"
              trend="up"
              icon={Zap}
              color="warning"
            />
          </div>

          {/* Railway Map */}
          <RailwayMap />

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Active Trains */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Active Trains</h2>
              {trains.map((train) => (
                <TrainCard
                  key={train.id}
                  trainNumber={train.trainNumber}
                  trainName={train.trainName}
                  type={train.type}
                  status={train.status}
                  currentStation={train.currentStation}
                  nextStation={train.nextStation}
                  delay={train.delay}
                />
              ))}
            </div>

            {/* Recommendations Panel */}
            <div className="col-span-2">
              <RecommendationPanel />
            </div>
          </div>

          {/* What-If Simulator */}
          <WhatIfSimulator />

          {/* Footer Info */}
          <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <p className="text-sm text-muted-foreground">
                System active • Last updated: Just now
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by RailAI • Indian Railways Decision Support System
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
