import { Clock, Zap, Activity, TrendingUp } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { KPICard } from "@/components/dashboard/KPICard";
import { TrainCard } from "@/components/dashboard/TrainCard";
import { RailwayMap } from "@/components/dashboard/RailwayMap";
import { RecommendationPanel } from "@/components/dashboard/RecommendationPanel";
import { WhatIfSimulator } from "@/components/dashboard/WhatIfSimulator";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header KPIs */}
          <div className="grid grid-cols-4 gap-4">
            <KPICard
              title="On-Time Performance"
              value="87.2%"
              change="3.5% from yesterday"
              trend="up"
              icon={Clock}
              color="success"
            />
            <KPICard
              title="Avg. Delay"
              value="4.8 min"
              change="1.2 min improvement"
              trend="up"
              icon={TrendingUp}
              color="primary"
            />
            <KPICard
              title="Active Trains"
              value="47"
              change="8 more than usual"
              trend="neutral"
              icon={Activity}
              color="primary"
            />
            <KPICard
              title="AI Optimizations"
              value="23"
              change="Today"
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
              <TrainCard
                trainNumber="12302"
                trainName="Rajdhani Express"
                type="express"
                status="on-time"
                currentStation="Kanpur"
                nextStation="Lucknow"
              />
              <TrainCard
                trainNumber="12221"
                trainName="Duronto Express"
                type="express"
                status="held"
                currentStation="Kanpur"
                nextStation="Lucknow"
              />
              <TrainCard
                trainNumber="17045"
                trainName="Goods Train"
                type="freight"
                status="delayed"
                currentStation="Lucknow"
                nextStation="Gorakhpur"
                delay={12}
              />
              <TrainCard
                trainNumber="14258"
                trainName="Passenger"
                type="passenger"
                status="on-time"
                currentStation="Delhi"
                nextStation="Kanpur"
              />
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
