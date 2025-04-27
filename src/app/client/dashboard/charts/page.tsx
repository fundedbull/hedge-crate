import { ArbitrageTypes } from "@/components/arbitrage-types";
import { CrateTypes } from "@/components/crate-types";
import { HedgingTypes } from "@/components/hedging-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  LucideHelpCircle,
  Package,
  PlusCircleIcon,
  RefreshCcw,
  Scale,
  ScaleIcon,
  Shield,
  Timer,
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

export default function Page() {
  return (
    <div className="p-4 space-y-4">
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
      <Card className="bg-zinc-900 text-white border-zinc-800">
        <CardContent className="p-0">
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 font-medium text-sm">
                    Confidence Level
                  </th>
                  <th className="text-left p-4 font-medium text-sm">
                    Criteria
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800">
                  <td className="p-4 flex items-center gap-2">
                    <LockIcon className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">High</span>
                  </td>
                  <td className="p-4">
                    Tight spreads, strong volume, minimal slippage risk
                  </td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="p-4 flex items-center gap-2">
                    <ScaleIcon className="h-5 w-5 text-orange-400" />
                    <span className="font-medium">Medium</span>
                  </td>
                  <td className="p-4">
                    Slight inefficiency, but may depend on market timing
                  </td>
                </tr>
                <tr>
                  <td className="p-4 flex items-center gap-2">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Low</span>
                  </td>
                  <td className="p-4">
                    Theoretical only — spreads too wide or data delayed
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="dark">
        <CardHeader>
          <h1 className=" text-2xl font-bold">Trading Confidence Levels</h1>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* HIGH Confidence Card */}
          <Card>
            <CardHeader className="">
              <CardTitle>HIGH Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <LockIcon className="h-4 w-4 text-green-500" />
                    <span>This is a highly tradable arbitrage</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Tight bid/ask spreads</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Decent to high volume</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Low slippage risk</span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Criteria:</h3>
                  <ul className="ml-5 list-disc space-y-1 text-sm">
                    <li>Bid-Ask Spread ≤ 5% of Mark Price</li>
                    <li>Volume ≥ 100</li>
                    <li>Delta is cleanly in range (0.3-0.7)</li>
                    <li>IV is stable (not spiking intraday)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* MEDIUM Confidence Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                MEDIUM Confidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Scale className="h-4 w-4 text-yellow-500" />
                    <span>Tradable with caution</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="h-4 w-4 border-b border-yellow-500" />
                    <span>Slight inefficiencies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="h-4 w-4 border-b border-yellow-500" />
                    <span>May require order tweaking or limit entry</span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Criteria:</h3>
                  <ul className="ml-5 list-disc space-y-1 text-sm">
                    <li>Bid-Ask Spread between 5–10%</li>
                    <li>Volume between 50–100</li>
                    <li>Less consistent fills or wider spreads</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LOW Confidence Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                LOW Confidence
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>This is theoretical only</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span>Wide spreads</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span>Low or zero volume</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span>Hard to execute profitably</span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Criteria:</h3>
                  <ul className="ml-5 list-disc space-y-1 text-sm">
                    <li>Bid-Ask Spread {">"} 10% of Mark Price</li>
                    <li>Volume {"<"} 50</li>
                    <li>Near-zero open interest or stale data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card className="dark">
        <CardHeader>
          <h1 className=" text-2xl font-bold">Trading Confidence Levels</h1>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <RefreshCcw className="h-6 w-6 text-blue-500" />
                <CardTitle className="text-xl">
                  1. Reversal / Conversion Arbitrage
                </CardTitle>
              </div>
              <CardDescription className="text-sm font-medium mt-1">
                (Buy Call + Sell Put + Long/Short Stock)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Lifespan:</span> 1 to 5
                    seconds in highly liquid names (like SPY, AAPL)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <LucideHelpCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Reason:</span> Market makers
                    and HFTs squash these quickly using co-located servers
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Timer className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">More Stable in:</span> Less
                    liquid underlyings or during high IV spikes
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6 text-cyan-500" />
                <CardTitle className="text-xl">
                  2. Box Spread Arbitrage
                </CardTitle>
              </div>
              <CardDescription className="text-sm font-medium mt-1">
                (Constructing a synthetic loan using spreads)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Lifespan:</span> Several
                    minutes to hours in some cases
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <LucideHelpCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Reason:</span> These are
                    harder to spot without full chain analysis
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Timer className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">More Stable in:</span> Deep
                    ITM/OTM options with low retail volume
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <PlusCircleIcon className="text-red-500" />
                <CardTitle className="text-xl">
                  3. Put-Call Parity Arbitrage
                </CardTitle>
              </div>
              <CardDescription className="text-sm font-medium mt-1">
                (Call – Put ≈ Stock – PV(strike))
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Lifespan:</span>{" "}
                    Milliseconds to a few seconds
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <LucideHelpCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Reason:</span> This is the
                    bread and butter of HFT arbitrage — gets cleared fast
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Timer className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">More Stable in:</span>{" "}
                    Earnings events or low-volume expirations
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
