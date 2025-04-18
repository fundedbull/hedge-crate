import { CrateList } from "@/components/crate-list";
import { HedgingTypes } from "@/components/hedging-types";
import { ArbitrageTypes } from "@/components/arbitrage-types";
import { CrateTypes } from "@/components/crate-types";
import { Card, CardContent } from "@/components/ui/card";

import {
  AlertTriangle,
  BarChart,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  Shield,
  Zap,
} from "lucide-react";

const strategies = [
  {
    tier: "Common",
    name: "The Parity Snap",
    type: "Put-Call Parity Arbitrage",
    risk: { level: "Low", icon: <Shield className="w-4 h-4 text-blue-500" /> },
    reward: {
      level: "Low-Mod",
      icon: <DollarSign className="w-4 h-4 text-blue-500" />,
    },
    effort: {
      level: "Easy",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    },
    frequency: {
      level: "Often",
      icon: <Clock className="w-4 h-4 text-blue-500" />,
    },
    complexity: {
      level: "Simple",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    },
    tierColor: "bg-blue-500",
  },
  {
    tier: "Rare",
    name: "The Synthetic Sweep",
    type: "Synthetic Arbitrage",
    risk: {
      level: "Low-Mod",
      icon: <Shield className="w-4 h-4 text-yellow-500" />,
    },
    reward: {
      level: "Medium",
      icon: <Zap className="w-4 h-4 text-orange-500" />,
    },
    effort: {
      level: "Medium",
      icon: <Clock className="w-4 h-4 text-yellow-500" />,
    },
    frequency: {
      level: "Medium",
      icon: <Clock className="w-4 h-4 text-blue-500" />,
    },
    complexity: {
      level: "Moderate",
      icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
    },
    tierColor: "bg-blue-600",
  },
  {
    tier: "Epic",
    name: "Box Lock Arbitrage",
    type: "Box Spread",
    risk: {
      level: "Very Low",
      icon: <Shield className="w-4 h-4 text-cyan-500" />,
    },
    reward: {
      level: "High",
      icon: <DollarSign className="w-4 h-4 text-amber-500" />,
    },
    effort: {
      level: "High",
      icon: <BarChart className="w-4 h-4 text-red-500" />,
    },
    frequency: {
      level: "Rare",
      icon: <Clock className="w-4 h-4 text-blue-500" />,
    },
    complexity: {
      level: "Precision Required",
      icon: <Package className="w-4 h-4 text-amber-500" />,
    },
    tierColor: "bg-green-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <CrateList crates={[]} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Charts</h2>
      <HedgingTypes />
      <ArbitrageTypes />
      <CrateTypes />
      <Card className="dark text-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="py-4 px-4 text-left">Crate Tier</th>
                  <th className="py-4 px-4 text-left">Strategy Name</th>
                  <th className="py-4 px-4 text-left">Type</th>
                  <th className="py-4 px-4 text-left">Risk</th>
                  <th className="py-4 px-4 text-left">Reward</th>
                  <th className="py-4 px-4 text-left">Effort</th>
                  <th className="py-4 px-4 text-left">Frequency</th>
                  <th className="py-4 px-4 text-left">Execution Complexity</th>
                </tr>
              </thead>
              <tbody>
                {strategies.map((strategy, index) => (
                  <tr key={index} className="border-b border-neutral-800">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded ${strategy.tierColor}`}
                        ></div>
                        <span>{strategy.tier}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium">{strategy.name}</td>
                    <td className="py-4 px-4">{strategy.type}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {strategy.risk.icon}
                        <span>{strategy.risk.level}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {strategy.reward.icon}
                        <span>{strategy.reward.level}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {strategy.effort.icon}
                        <span>{strategy.effort.level}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {strategy.frequency.icon}
                        <span>{strategy.frequency.level}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {strategy.complexity.icon}
                        <span>{strategy.complexity.level}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
