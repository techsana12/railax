import { Train, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TrainCardProps {
  trainNumber: string;
  trainName: string;
  type: "express" | "passenger" | "freight";
  status: "on-time" | "delayed" | "held";
  currentStation: string;
  nextStation: string;
  delay?: number;
}

const typeColors = {
  express: "bg-[hsl(var(--danger))] text-white",
  passenger: "bg-primary text-white",
  freight: "bg-muted text-muted-foreground",
};

const statusColors = {
  "on-time": "bg-accent text-white",
  delayed: "bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]",
  held: "bg-[hsl(var(--danger))] text-white",
};

export function TrainCard({
  trainNumber,
  trainName,
  type,
  status,
  currentStation,
  nextStation,
  delay,
}: TrainCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${typeColors[type]}`}>
            <Train className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{trainNumber}</p>
            <p className="text-xs text-muted-foreground">{trainName}</p>
          </div>
        </div>
        <Badge className={statusColors[status]} variant="secondary">
          {status === "on-time" ? "On Time" : status === "delayed" ? `+${delay}m` : "Held"}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-3 w-3 text-accent" />
          <span className="text-muted-foreground">Current:</span>
          <span className="text-foreground font-medium">{currentStation}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">Next:</span>
          <span className="text-foreground font-medium">{nextStation}</span>
        </div>
      </div>
    </Card>
  );
}
