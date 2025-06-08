"use client";

import { useState } from "react";
import { Filter, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function StockFilter() {
  const [ticker, setTicker] = useState("");
  const [broker, setBroker] = useState("");
  const [budget, setBudget] = useState("");
  const [riskAmount, setRiskAmount] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [open, setOpen] = useState(false);

  // Advanced sections toggle state
  const [tradeParamsOpen, setTradeParamsOpen] = useState(false);
  const [liquidityOpen, setLiquidityOpen] = useState(false);
  const [advancedRiskOpen, setAdvancedRiskOpen] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);

  // Advanced filter state
  const [dteRange, setDteRange] = useState([7, 45]);
  const [deltaMin, setDeltaMin] = useState("");
  const [deltaMax, setDeltaMax] = useState("");
  const [ivRankMin, setIvRankMin] = useState("");
  const [premiumYieldMin, setPremiumYieldMin] = useState("");
  const [minOpenInterest, setMinOpenInterest] = useState("");
  const [avgDailyVolume, setAvgDailyVolume] = useState("");
  const [maxRiskAmount, setMaxRiskAmount] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("");
  const [marketCap, setMarketCap] = useState("");

  const tickers = [
    "AMC",
    "INTC",
    "GME",
    "SMCI",
    "HIMS",
    "TEM",
    "MU",
    "AMD",
    "NVDA",
    "GOOG",
    "AMZN",
    "AAPL",
    "TSLA",
    "MSFT",
    "META",
  ];
  const brokers = [
    "Robinhood",
    "Charles Schwab",
    "E*TRADE",
    "Interactive Brokers",
    "Webull",
    "Vanguard",
    "Other",
  ];
  const confidenceLevels = ["High", "Medium", "Low"];
  const marketCapOptions = ["Large-cap (>$10B)", "Mid-cap ($1B-$10B)", "Both"];

  const calculateRRR = () => {
    if (!riskAmount || !rewardAmount || Number(riskAmount) <= 0) return 0;
    return (Number(rewardAmount) / Number(riskAmount)).toFixed(0);
  };

  const calculateRiskPercentage = () => {
    if (!budget || !riskAmount || Number(budget) <= 0) return null;
    return ((Number(riskAmount) / Number(budget)) * 100).toFixed(1);
  };

  const calculateRewardPercentage = () => {
    if (!budget || !rewardAmount || Number(budget) <= 0) return null;
    return ((Number(rewardAmount) / Number(budget)) * 100).toFixed(1);
  };

  const handleSubmit = () => {
    if (!ticker || !broker || !budget || !riskAmount || !rewardAmount) {
      alert("Please fill in all required fields");
      return;
    }

    console.log({
      ticker,
      broker,
      budget: Number.parseFloat(budget),
      riskAmount: Number.parseFloat(riskAmount),
      rewardAmount: Number.parseFloat(rewardAmount),
      riskRewardRatio: calculateRRR(),
      riskPercentage: calculateRiskPercentage(),
      rewardPercentage: calculateRewardPercentage(),
      daysToExpiration: { min: dteRange[0], max: dteRange[1] },
      deltaBand: {
        min: deltaMin ? Number.parseFloat(deltaMin) : null,
        max: deltaMax ? Number.parseFloat(deltaMax) : null,
      },
      ivRankMin: ivRankMin ? Number.parseFloat(ivRankMin) : null,
      premiumYieldMin: premiumYieldMin
        ? Number.parseFloat(premiumYieldMin)
        : null,
      minOpenInterest: minOpenInterest
        ? Number.parseInt(minOpenInterest)
        : null,
      avgDailyVolume: avgDailyVolume ? Number.parseInt(avgDailyVolume) : null,
      maxRiskAmount: maxRiskAmount ? Number.parseFloat(maxRiskAmount) : null,
      confidenceLevel,
      marketCap,
    });
    setOpen(false);
  };

  return (
    <div style={{ overflow: "visible" }}>
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>
          <Button className="w-fit dark">
            <Filter />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 dark max-h-[80vh] overflow-y-auto">
          <Card className="border-0 shadow-none dark">
            <CardContent className="px-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ticker" className="flex">
                  Select Ticker <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select value={ticker} onValueChange={setTicker} required>
                  <SelectTrigger id="ticker">
                    <SelectValue placeholder="Select a stock" />
                  </SelectTrigger>
                  <SelectContent className="dark">
                    {tickers.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="broker" className="flex">
                  Select Broker <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select value={broker} onValueChange={setBroker} required>
                  <SelectTrigger id="broker">
                    <SelectValue placeholder="Select your broker" />
                  </SelectTrigger>
                  <SelectContent className="dark">
                    {brokers.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="flex">
                  Budget <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter your budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="flex">
                  Risk and Reward (in $){" "}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="risk-amount"
                      className="text-sm text-muted-foreground"
                    >
                      Risk Amount
                    </Label>
                    <Input
                      id="risk-amount"
                      type="number"
                      placeholder="Risk in $"
                      value={riskAmount}
                      onChange={(e) => setRiskAmount(e.target.value)}
                      required
                    />
                    {calculateRiskPercentage() && (
                      <div className="text-xs text-muted-foreground">
                        {calculateRiskPercentage()}% of budget
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="reward-amount"
                      className="text-sm text-muted-foreground"
                    >
                      Reward Amount
                    </Label>
                    <Input
                      id="reward-amount"
                      type="number"
                      placeholder="Reward in $"
                      value={rewardAmount}
                      onChange={(e) => setRewardAmount(e.target.value)}
                      required
                    />
                    {calculateRewardPercentage() && (
                      <div className="text-xs text-muted-foreground">
                        {calculateRewardPercentage()}% of budget
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-sm font-medium">
                    Risk-Reward Ratio:{" "}
                    {calculateRRR() ? `1:${calculateRRR()}` : "N/A"}
                  </span>
                </div>
              </div>

              <Collapsible
                open={tradeParamsOpen}
                onOpenChange={setTradeParamsOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-8"
                  >
                    <span className="font-semibold text-sm">
                      Trade Parameters
                    </span>
                    {tradeParamsOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-2">
                  <div className="space-y-2">
                    <Label>
                      DTE: {dteRange[0]} - {dteRange[1]} days
                    </Label>
                    <Slider
                      value={dteRange}
                      onValueChange={setDteRange}
                      max={365}
                      min={1}
                      step={1}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min δ"
                      value={deltaMin}
                      onChange={(e) => setDeltaMin(e.target.value)}
                      step="0.01"
                      min="0"
                      max="1"
                    />
                    <Input
                      type="number"
                      placeholder="Max δ"
                      value={deltaMax}
                      onChange={(e) => setDeltaMax(e.target.value)}
                      step="0.01"
                      min="0"
                      max="1"
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="IV Rank Min %"
                    value={ivRankMin}
                    onChange={(e) => setIvRankMin(e.target.value)}
                    min="0"
                    max="100"
                  />
                  <Input
                    type="number"
                    placeholder="Premium Yield Min %"
                    value={premiumYieldMin}
                    onChange={(e) => setPremiumYieldMin(e.target.value)}
                    step="0.1"
                  />
                </CollapsibleContent>
              </Collapsible>

              <Collapsible open={liquidityOpen} onOpenChange={setLiquidityOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-8"
                  >
                    <span className="font-semibold text-sm">
                      Liquidity & Execution
                    </span>
                    {liquidityOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Min Open Interest"
                    value={minOpenInterest}
                    onChange={(e) => setMinOpenInterest(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Min Daily Volume"
                    value={avgDailyVolume}
                    onChange={(e) => setAvgDailyVolume(e.target.value)}
                  />
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={advancedRiskOpen}
                onOpenChange={setAdvancedRiskOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-8"
                  >
                    <span className="font-semibold text-sm">Advanced Risk</span>
                    {advancedRiskOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Max Risk per Contract"
                    value={maxRiskAmount}
                    onChange={(e) => setMaxRiskAmount(e.target.value)}
                  />
                  <Select
                    value={confidenceLevel}
                    onValueChange={setConfidenceLevel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Confidence Level" />
                    </SelectTrigger>
                    <SelectContent className="dark">
                      {confidenceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible open={marketOpen} onOpenChange={setMarketOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-8"
                  >
                    <span className="font-semibold text-sm">
                      Market Filters
                    </span>
                    {marketOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  <Select value={marketCap} onValueChange={setMarketCap}>
                    <SelectTrigger>
                      <SelectValue placeholder="Market Cap" />
                    </SelectTrigger>
                    <SelectContent className="dark">
                      {marketCapOptions.map((cap) => (
                        <SelectItem key={cap} value={cap}>
                          {cap}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
            <CardFooter className="px-0 pb-0">
              <Button onClick={handleSubmit} className="w-full">
                Apply Filters
              </Button>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
