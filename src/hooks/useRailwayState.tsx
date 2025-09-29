import { useState, useEffect, useCallback } from "react";

export interface Train {
  id: string;
  trainNumber: string;
  trainName: string;
  type: "express" | "passenger" | "freight";
  status: "on-time" | "delayed" | "held";
  currentStation: string;
  nextStation: string;
  delay?: number;
  position: number;
  speed: number;
  priority: number;
}

export interface Recommendation {
  id: string;
  priority: "high" | "medium" | "low";
  action: string;
  reason: string;
  impact: string;
  confidence: number;
  trainId: string;
  actionType: "hold" | "priority" | "route" | "platform";
}

interface RailwayState {
  trains: Train[];
  recommendations: Recommendation[];
  metrics: {
    onTimePerformance: number;
    avgDelay: number;
    activeTrains: number;
    aiOptimizations: number;
  };
}

const initialTrains: Train[] = [
  {
    id: "1",
    trainNumber: "12302",
    trainName: "Rajdhani Express",
    type: "express",
    status: "on-time",
    currentStation: "Kanpur",
    nextStation: "Lucknow",
    position: 30,
    speed: 110,
    priority: 3,
  },
  {
    id: "2",
    trainNumber: "12221",
    trainName: "Duronto Express",
    type: "express",
    status: "on-time",
    currentStation: "Kanpur",
    nextStation: "Lucknow",
    position: 25,
    speed: 105,
    priority: 3,
  },
  {
    id: "3",
    trainNumber: "17045",
    trainName: "Goods Train",
    type: "freight",
    status: "delayed",
    currentStation: "Lucknow",
    nextStation: "Gorakhpur",
    delay: 12,
    position: 55,
    speed: 60,
    priority: 1,
  },
  {
    id: "4",
    trainNumber: "14258",
    trainName: "Passenger",
    type: "passenger",
    status: "on-time",
    currentStation: "Delhi",
    nextStation: "Kanpur",
    position: 10,
    speed: 80,
    priority: 2,
  },
];

const generateRecommendations = (trains: Train[]): Recommendation[] => {
  const recs: Recommendation[] = [];
  
  trains.forEach((train) => {
    if (train.status === "delayed" && train.delay && train.delay > 10) {
      recs.push({
        id: `rec-${train.id}-1`,
        priority: "high",
        action: `Prioritize ${train.trainName} on alternate route`,
        reason: `Train is delayed by ${train.delay} minutes. Can reduce delay significantly.`,
        impact: `Reduces delay by ~${Math.floor(train.delay * 0.6)} minutes`,
        confidence: 89,
        trainId: train.id,
        actionType: "route",
      });
    }
    
    if (train.position > 20 && train.position < 35 && train.type === "passenger") {
      const nearbyExpress = trains.find(
        (t) => t.type === "express" && Math.abs(t.position - train.position) < 10
      );
      if (nearbyExpress) {
        recs.push({
          id: `rec-${train.id}-2`,
          priority: "medium",
          action: `Hold ${train.trainName} at ${train.currentStation}`,
          reason: `To prevent conflict with ${nearbyExpress.trainName}`,
          impact: "Saves 8 minutes total delay. Express arrives on time.",
          confidence: 94,
          trainId: train.id,
          actionType: "hold",
        });
      }
    }
  });

  if (recs.length === 0) {
    recs.push({
      id: "rec-default-1",
      priority: "low",
      action: "Optimize platform allocation at Lucknow",
      reason: "Better platform spacing improves departure punctuality",
      impact: "Potential 2-minute improvement in average departure time",
      confidence: 78,
      trainId: "all",
      actionType: "platform",
    });
  }

  return recs;
};

export const useRailwayState = () => {
  const [state, setState] = useState<RailwayState>({
    trains: initialTrains,
    recommendations: generateRecommendations(initialTrains),
    metrics: {
      onTimePerformance: 87.2,
      avgDelay: 4.8,
      activeTrains: 47,
      aiOptimizations: 23,
    },
  });

  // Real-time train movement simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const updatedTrains = prev.trains.map((train) => {
          let newPosition = train.position;
          let newStatus = train.status;
          let newDelay = train.delay;

          // Move trains forward based on their speed and status
          if (train.status !== "held") {
            newPosition = (train.position + train.speed / 60) % 100;
          }

          // Random delays for realism
          if (Math.random() > 0.95 && train.type !== "express") {
            newDelay = (newDelay || 0) + Math.floor(Math.random() * 3);
            if (newDelay > 5) {
              newStatus = "delayed";
            }
          }

          // Recovery from delays
          if (newDelay && newDelay > 0 && Math.random() > 0.7) {
            newDelay = Math.max(0, newDelay - 1);
            if (newDelay <= 3) {
              newStatus = "on-time";
            }
          }

          return {
            ...train,
            position: newPosition,
            status: newStatus,
            delay: newDelay,
          };
        });

        // Recalculate metrics
        const onTimeTrains = updatedTrains.filter(
          (t) => t.status === "on-time"
        ).length;
        const totalDelay = updatedTrains.reduce(
          (sum, t) => sum + (t.delay || 0),
          0
        );
        
        return {
          ...prev,
          trains: updatedTrains,
          recommendations: generateRecommendations(updatedTrains),
          metrics: {
            ...prev.metrics,
            onTimePerformance: (onTimeTrains / updatedTrains.length) * 100,
            avgDelay: totalDelay / updatedTrains.length,
          },
        };
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const applyRecommendation = useCallback((recId: string) => {
    setState((prev) => {
      const rec = prev.recommendations.find((r) => r.id === recId);
      if (!rec) return prev;

      const updatedTrains = prev.trains.map((train) => {
        if (train.id === rec.trainId) {
          switch (rec.actionType) {
            case "hold":
              return { ...train, status: "held" as const };
            case "priority":
              return { ...train, priority: 3, speed: train.speed + 10 };
            case "route":
              return {
                ...train,
                delay: Math.max(0, (train.delay || 0) - 8),
                status: "on-time" as const,
              };
            default:
              return train;
          }
        }
        return train;
      });

      return {
        ...prev,
        trains: updatedTrains,
        recommendations: prev.recommendations.filter((r) => r.id !== recId),
        metrics: {
          ...prev.metrics,
          aiOptimizations: prev.metrics.aiOptimizations + 1,
        },
      };
    });
  }, []);

  const dismissRecommendation = useCallback((recId: string) => {
    setState((prev) => ({
      ...prev,
      recommendations: prev.recommendations.filter((r) => r.id !== recId),
    }));
  }, []);

  const simulateAction = useCallback(
    (
      trainId: string,
      actionType: "hold" | "priority" | "route" | "platform",
      duration: number
    ) => {
      const train = state.trains.find((t) => t.trainNumber === trainId);
      if (!train) return null;

      // Calculate predicted impact
      let totalDelay = state.trains.reduce(
        (sum, t) => sum + (t.delay || 0),
        0
      );
      let delayChange = 0;
      let affectedTrains = 1;

      switch (actionType) {
        case "hold":
          delayChange = duration;
          totalDelay += duration;
          affectedTrains = 2;
          break;
        case "priority":
          delayChange = -Math.floor(duration / 2);
          totalDelay -= Math.floor(duration / 2);
          break;
        case "route":
          delayChange = -Math.floor((train.delay || 0) * 0.6);
          totalDelay += delayChange;
          break;
        default:
          delayChange = -2;
          totalDelay -= 2;
      }

      const recommendation =
        delayChange < 0
          ? "This action reduces total network delay. Recommended!"
          : "This action may increase delays. Consider alternatives.";

      return {
        totalDelay: Math.max(0, totalDelay),
        delayChange,
        affectedTrains,
        recommendation,
      };
    },
    [state.trains]
  );

  return {
    ...state,
    applyRecommendation,
    dismissRecommendation,
    simulateAction,
  };
};
