"use client";

import { useState } from "react";
import { ListFilterIcon } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StockFilter() {
  const [ticker, setTicker] = useState("");
  const [broker, setBroker] = useState("");
  const [budget, setBudget] = useState("");
  const [riskAmount, setRiskAmount] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [open, setOpen] = useState(false);

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

  const calculateRRR = () => {
    if (!riskAmount || !rewardAmount || Number(riskAmount) <= 0) return 0;
    return (Number(rewardAmount) / Number(riskAmount)).toFixed(0);
  };

  function calculateRiskPercentage() {
    if (!budget || !riskAmount || Number(budget) <= 0) return null;
    const percentage = (Number(riskAmount) / Number(budget)) * 100;
    return percentage.toFixed(1);
  }

  function calculateRewardPercentage() {
    if (!budget || !rewardAmount || Number(budget) <= 0) return null;
    const percentage = (Number(rewardAmount) / Number(budget)) * 100;
    return percentage.toFixed(1);
  }

  const validateInputs = () => {
    if (!ticker) return "Please select a ticker";
    if (!broker) return "Please select a broker";
    if (!budget || Number(budget) <= 0) return "Please enter a valid budget";
    if (!riskAmount || Number(riskAmount) <= 0)
      return "Please enter a valid risk amount";
    if (!rewardAmount || Number(rewardAmount) <= 0)
      return "Please enter a valid reward amount";
    return null;
  };

  const handleSubmit = () => {
    const error = validateInputs();
    if (error) {
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
    });
    setOpen(false);
    // Add your filter logic here
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="w-fit dark">
          <ListFilterIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 dark">
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
          </CardContent>
          <CardFooter className="px-0 pb-0">
            <Button onClick={handleSubmit} className="w-full">
              Apply Filter
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
