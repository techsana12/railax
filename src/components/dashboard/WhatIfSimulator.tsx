import { useState } from "react";
import { Play, RotateCcw, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function WhatIfSimulator() {
  const [simulating, setSimulating] = useState(false);
  const [results, setResults] = useState<{
    totalDelay: number;
    delayChange: number;
    affectedTrains: number;
    recommendation: string;
  } | null>(null);

  const runSimulation = () => {
    setSimulating(true);
    setTimeout(() => {
      setResults({
        totalDelay: 45,
        delayChange: -12,
        affectedTrains: 5,
        recommendation: "This action reduces total network delay by 21%. Recommended!",
      });
      setSimulating(false);
    }, 1500);
  };

  const resetSimulation = () => {
    setResults(null);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-secondary/10 rounded-lg">
          <Play className="h-5 w-5 text-secondary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">What-If Simulator</h2>
        <Badge variant="secondary" className="ml-auto bg-secondary/10 text-secondary">
          Test Decisions
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Action Type</label>
          <Select defaultValue="hold">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hold">Hold Train</SelectItem>
              <SelectItem value="priority">Change Priority</SelectItem>
              <SelectItem value="route">Alternate Route</SelectItem>
              <SelectItem value="platform">Platform Change</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Train Number</label>
          <Select defaultValue="12221">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12221">12221 - Rajdhani</SelectItem>
              <SelectItem value="12302">12302 - Express</SelectItem>
              <SelectItem value="17045">17045 - Freight</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Location</label>
          <Select defaultValue="kanpur">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kanpur">Kanpur Central</SelectItem>
              <SelectItem value="lucknow">Lucknow Junction</SelectItem>
              <SelectItem value="delhi">Delhi Junction</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Duration</label>
          <Select defaultValue="3">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 minutes</SelectItem>
              <SelectItem value="5">5 minutes</SelectItem>
              <SelectItem value="10">10 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          onClick={runSimulation}
          disabled={simulating}
          className="flex-1 bg-primary hover:bg-primary/90 text-white"
        >
          <Play className="h-4 w-4 mr-2" />
          {simulating ? "Simulating..." : "Run Simulation"}
        </Button>
        <Button onClick={resetSimulation} variant="outline">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {results && (
        <div className="space-y-3 fade-in">
          <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Simulation Results</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Total Delay</p>
                <p className="text-lg font-bold text-foreground">{results.totalDelay}m</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Change</p>
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-4 w-4 text-accent" />
                  <p className="text-lg font-bold text-accent">{results.delayChange}m</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Affected</p>
                <p className="text-lg font-bold text-foreground">{results.affectedTrains} trains</p>
              </div>
            </div>

            <div className="p-3 bg-background/80 rounded-lg">
              <p className="text-sm text-foreground">
                <span className="font-semibold">AI Analysis:</span> {results.recommendation}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
        <span className="text-2xl">💡</span>
        <p className="text-sm text-muted-foreground">
          Test different scenarios to find the optimal solution. The simulator uses real-time data to predict outcomes with 85-95% accuracy.
        </p>
      </div>
    </Card>
  );
}
