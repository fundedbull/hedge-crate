import { CrateList } from "@/components/crate-list";
import { HedgingTypes } from "@/components/hedging-types";
import { ArbitrageTypes } from "@/components/arbitrage-types";
import { CrateTypes } from "@/components/crate-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  AlertCircle,
  AlertTriangle,
  AlertTriangleIcon,
  BarChart,
  Check,
  CheckCircle,
  Clock,
  DollarSign,
  LockIcon,
  Package,
  Scale,
  ScaleIcon,
  Shield,
  Zap,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { QUERIES } from "@/server/db/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const strategies = [
  {
    tier: "Common",
    name: "Ground Strike",
    type: "Cash Secured Put",
    risk: {
      level: "Very Low",
      icon: <Shield className="w-4 h-4 text-blue-500" />,
    },
    reward: {
      level: "Low-Mid",
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
    name: "The Skycap",
    type: "Covered Call",
    risk: {
      level: "Low-Mid",
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
      level: "Often",
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
    name: "The Chain Stack",
    type: "Combo Spread",
    risk: {
      level: "Medium",
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
      level: "Often",
      icon: <Clock className="w-4 h-4 text-blue-500" />,
    },
    complexity: {
      level: "Hard",
      icon: <Package className="w-4 h-4 text-amber-500" />,
    },
    tierColor: "bg-green-500",
  },
];

export default async function DashboardPage() {
  const session = await auth();

  const [user] = await QUERIES.getUserByClerkId(session.userId!);
  const crates = await QUERIES.getRecentCratesByUserId(user.id);

  return (
    <div className="p-2 space-y-6 max-w-screen md:w-full">
      <div className="bg-blue-500 text-white p-3 rounded-lg text-center mb-6">
        <p className="font-bold text-sm inline">
          Alpha is Live! Ends August 30th.
        </p>
      </div>
      <CrateList crates={crates} page="dashboard" />
      <Card className="dark text-white">
        <CardTitle className="px-5 flex justify-between">
          <p>Crate Types</p>
          <Button asChild>
            <Link href={"/client/dashboard/charts"}>View More</Link>
          </Button>
        </CardTitle>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {strategies.map((strategy, index) => (
              <Card key={index} className="dark text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded ${strategy.tierColor}`}
                      ></div>
                      <span className="font-medium">{strategy.name}</span>
                    </div>
                    <span className="text-sm">{strategy.type}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Risk</div>
                      <div className="flex items-center gap-2">
                        {strategy.risk.icon}
                        <span>{strategy.risk.level}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Reward</div>
                      <div className="flex items-center gap-2">
                        {strategy.reward.icon}
                        <span>{strategy.reward.level}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Effort</div>
                      <div className="flex items-center gap-2">
                        {strategy.effort.icon}
                        <span>{strategy.effort.level}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Frequency</div>
                      <div className="flex items-center gap-2">
                        {strategy.frequency.icon}
                        <span>{strategy.frequency.level}</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-muted-foreground">
                        Execution Complexity
                      </div>
                      <div className="flex items-center gap-2">
                        {strategy.complexity.icon}
                        <span>{strategy.complexity.level}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="hidden md:block">
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
                    <th className="py-4 px-4 text-left">
                      Execution Complexity
                    </th>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
