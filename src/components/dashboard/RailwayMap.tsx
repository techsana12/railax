import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Train {
  id: string;
  number: string;
  type: "express" | "passenger" | "freight";
  position: number; // 0-100 percentage along track
  direction: "east" | "west";
}

const stations = [
  { name: "Delhi", position: 0 },
  { name: "Kanpur", position: 33 },
  { name: "Lucknow", position: 66 },
  { name: "Gorakhpur", position: 100 },
];

const trainColors = {
  express: "bg-[hsl(var(--danger))]",
  passenger: "bg-primary",
  freight: "bg-muted-foreground",
};

export function RailwayMap() {
  const [trains, setTrains] = useState<Train[]>([
    { id: "1", number: "12302", type: "express", position: 45, direction: "east" },
    { id: "2", number: "12221", type: "passenger", position: 30, direction: "east" },
    { id: "3", number: "17045", type: "freight", position: 75, direction: "west" },
    { id: "4", number: "12430", type: "express", position: 15, direction: "east" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrains((prevTrains) =>
        prevTrains.map((train) => ({
          ...train,
          position:
            train.direction === "east"
              ? (train.position + 0.5) % 100
              : train.position - 0.5 < 0
              ? 100
              : train.position - 0.5,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Live Railway Section Map</h2>
        <div className="flex gap-2">
          <Badge className="bg-[hsl(var(--danger))] text-white">Express</Badge>
          <Badge className="bg-primary text-white">Passenger</Badge>
          <Badge className="bg-muted text-muted-foreground">Freight</Badge>
        </div>
      </div>

      <div className="relative h-64 bg-background rounded-lg p-8">
        {/* Railway Track */}
        <div className="absolute top-1/2 left-8 right-8 h-2 bg-muted rounded-full transform -translate-y-1/2">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full" />
        </div>

        {/* Stations */}
        {stations.map((station) => (
          <div
            key={station.name}
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `calc(8% + ${station.position}% * 0.84)` }}
          >
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
              <p className="text-xs font-medium text-foreground mt-2 whitespace-nowrap">
                {station.name}
              </p>
            </div>
          </div>
        ))}

        {/* Trains */}
        {trains.map((train) => (
          <div
            key={train.id}
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-100"
            style={{ left: `calc(8% + ${train.position}% * 0.84)` }}
          >
            <div className="flex flex-col items-center train-pulse">
              <div
                className={`w-6 h-6 ${trainColors[train.type]} rounded-full shadow-lg flex items-center justify-center text-white text-xs font-bold border-2 border-background`}
              >
                {train.direction === "east" ? "→" : "←"}
              </div>
              <p className="text-xs font-medium text-foreground mt-1 bg-background/80 px-1 rounded">
                {train.number}
              </p>
            </div>
          </div>
        ))}

        {/* Block Sections */}
        <div className="absolute bottom-4 left-8 right-8 flex justify-between text-xs text-muted-foreground">
          <span>Block A-5</span>
          <span>Block B-7</span>
          <span>Block C-3</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        <div className="p-3 bg-accent/10 rounded-lg">
          <p className="text-xs text-muted-foreground">Active Trains</p>
          <p className="text-xl font-bold text-foreground">{trains.length}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <p className="text-xs text-muted-foreground">Clear Blocks</p>
          <p className="text-xl font-bold text-foreground">8/12</p>
        </div>
        <div className="p-3 bg-[hsl(var(--warning))]/10 rounded-lg">
          <p className="text-xs text-muted-foreground">Delayed</p>
          <p className="text-xl font-bold text-foreground">2</p>
        </div>
        <div className="p-3 bg-accent/10 rounded-lg">
          <p className="text-xs text-muted-foreground">On Time</p>
          <p className="text-xl font-bold text-foreground">87%</p>
        </div>
      </div>
    </Card>
  );
}
