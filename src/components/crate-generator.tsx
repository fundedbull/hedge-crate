"use client";
import OptionsTradingDialog from "@/components/options-trading-dialog";
import StockFilter from "@/components/stock-filter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  generateCommonCrateAction,
  generateRareCrateAction,
} from "@/server/actions";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";

import {
  LockIcon,
  InfoIcon,
  NotebookIcon,
  CalculatorIcon,
  CloudIcon,
  CreditCardIcon,
  PackageOpenIcon,
  ListFilterIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import ErrorDialog from "@/components/error-dialog";
import { useActionState, useEffect, useState } from "react";

const initialState = {
  data: null,
  error: "",
  success: false,
};

export default function CrateGenerator() {
  // Separate action states for different crate types
  const [commonState, commonFormAction, commonPending] = useActionState(
    generateCommonCrateAction,
    initialState
  );
  const [rareState, rareFormAction, rarePending] = useActionState(
    generateRareCrateAction,
    initialState
  );

  const [ticker, setTicker] = useState("");
  const [activeTab, setActiveTab] = useState("common");

  // Common crate fields
  const [budget, setBudget] = useState("");
  const [riskAmount, setRiskAmount] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");

  // Rare crate fields (covered calls)
  const [sharesOwned, setSharesOwned] = useState("");
  const [costBasis, setCostBasis] = useState("");

  const [open, setOpen] = useState(false);

  const tickers = [
    "AAPL",
    "AFRO",
    "AMC",
    "AMD",
    "AMZN",
    "ASTS",
    "BBAI",
    "BULL",
    "CHYM",
    "COIN",
    "COST",
    "CRCL",
    "CRVV",
    "DJT",
    "FDX",
    "GME",
    "GOOG",
    "GSAT",
    "HIMS",
    "HOOD",
    "INTC",
    "LMT",
    "META",
    "MSFT",
    "MSTR",
    "MU",
    "MV",
    "NVDA",
    "PLTR",
    "PONY",
    "QUBT",
    "SMCI",
    "SOFI",
    "TEM",
    "TDOC",
    "TQQQ",
    "TSLA",
    "TTD",
    "UNH",
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Get current state and pending based on active tab
  const currentState = activeTab === "common" ? commonState : rareState;
  const currentPending = activeTab === "common" ? commonPending : rarePending;

  // Handle success/error for both action states
  useEffect(() => {
    if (commonState.success && commonState.data) {
      setDialogOpen(true);
    } else if (!commonState.success && commonState.error) {
      setErrorMessage(commonState.error);
      setErrorDialogOpen(true);
    }
  }, [commonState.success, commonState.data, commonState.error]);

  useEffect(() => {
    if (rareState.success && rareState.data) {
      setDialogOpen(true);
    } else if (!rareState.success && rareState.error) {
      setErrorMessage(rareState.error);
      setErrorDialogOpen(true);
    }
  }, [rareState.success, rareState.data, rareState.error]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (currentPending) {
      setProgress(1);
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 99));
      }, 500);
    } else if (currentState.success) {
      setProgress(100);
    } else {
      setProgress(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentPending, currentState.success]);

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

  // Get the current data for the dialog
  const currentData = commonState.data || rareState.data;

  return (
    <main>
      <section
        id="crates"
        className="flex flex-col md:justify-center md:items-center gap-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold ">Select your Crate</h1>
        {/* Error Dialog */}
        <ErrorDialog
          open={errorDialogOpen}
          onOpenChange={setErrorDialogOpen}
          message={errorMessage}
        />
        {/* Options Response Dialog */}
        {dialogOpen && currentData && (
          <OptionsTradingDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            data={currentData}
          />
        )}

        <Tabs
          defaultValue="common"
          className="w-full max-w-2xl"
          onValueChange={setActiveTab}
        >
          <div className="flex gap-2">
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
                        Select Ticker{" "}
                        <span className="text-red-500 ml-1">*</span>
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

                    {/* Common crate fields */}
                    {activeTab === "common" && (
                      <>
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
                                onChange={(e) =>
                                  setRewardAmount(e.target.value)
                                }
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
                      </>
                    )}

                    {/* Rare crate fields (covered calls) */}
                    {activeTab === "rare" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="shares-owned" className="flex">
                            Shares Owned{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Input
                            id="shares-owned"
                            type="number"
                            placeholder="Number of shares you own"
                            value={sharesOwned}
                            onChange={(e) => setSharesOwned(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cost-basis" className="flex">
                            Cost Basis (optional)
                          </Label>
                          <Input
                            id="cost-basis"
                            type="number"
                            placeholder="Average price paid per share"
                            value={costBasis}
                            onChange={(e) => setCostBasis(e.target.value)}
                          />
                          <div className="text-xs text-muted-foreground">
                            Leave empty to use 95% of current price
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="flex">
                            Risk and Reward (in $){" "}
                            <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label
                                htmlFor="risk-amount-rare"
                                className="text-sm text-muted-foreground"
                              >
                                Risk Amount
                              </Label>
                              <Input
                                id="risk-amount-rare"
                                type="number"
                                placeholder="Risk in $"
                                value={riskAmount}
                                onChange={(e) => setRiskAmount(e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="reward-amount-rare"
                                className="text-sm text-muted-foreground"
                              >
                                Reward Amount
                              </Label>
                              <Input
                                id="reward-amount-rare"
                                type="number"
                                placeholder="Reward in $"
                                value={rewardAmount}
                                onChange={(e) =>
                                  setRewardAmount(e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-end">
                            <span className="text-sm font-medium">
                              Risk-Reward Ratio:{" "}
                              {calculateRRR() ? `1:${calculateRRR()}` : "N/A"}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
            <TabsList className="w-full">
              <TabsTrigger value="common">Common</TabsTrigger>
              <TabsTrigger value="rare">Rare</TabsTrigger>
              <TabsTrigger value="epic" disabled>
                <LockIcon />
                Epic
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent className="w-full " value="common">
            <div className="w-full h-full relative">
              <Image
                width={1024}
                height={1024}
                src="/images/common-crate.png"
                className="rounded-lg p-6"
                alt="decorative"
              />
              <HoverCard>
                <HoverCardTrigger
                  className="absolute hidden md:block top-1/6 right-0"
                  asChild
                >
                  <InfoIcon className="size-10" />
                </HoverCardTrigger>
                <HoverCardContent className="w-full p-4 dark">
                  <div className="text-lg">
                    Ideal for: <br />
                    🧠 New Traders <br />
                    💸 Guaranteed Income <br /> 🛡️ Risk Control
                  </div>
                </HoverCardContent>
              </HoverCard>
              <Dialog>
                <DialogTrigger
                  className="absolute md:hidden top-1/6 right-0"
                  asChild
                >
                  <InfoIcon className="size-10 cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="w-full p-4 dark">
                  <DialogTitle>Ideal for</DialogTitle>
                  <DialogDescription>
                    🧠 New Traders <br />
                    💸 Guaranteed Income <br /> 🛡️ Risk Control
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
            <article className="bg-gradient-to-r from-transparent from-25%% via-blue-600/20 via-50% to-transparent border-2 border-white/10 p-4 rounded-lg space-y-4">
              <h2 className="text-lg md:text-3xl flex items-center gap-1">
                <NotebookIcon className="stroke-blue-600" />A real backtested
                hedging strategy
              </h2>
              <p className="text-lg md:text-3xl flex items-center gap-1">
                <CalculatorIcon className="stroke-blue-600" /> A calculated
                setup based on options chains.
              </p>
              <p className="text-lg md:text-3xl flex items-center gap-1">
                <CloudIcon className="stroke-blue-600" />
                Educational insights and risk ratings
              </p>
              <p className="text-lg md:text-3xl flex gap-1">
                <CreditCardIcon className="stroke-blue-600" /> The exact trade:
                entry, logic, and exit
              </p>
              <form action={commonFormAction}>
                <input type="hidden" name="ticker" value={ticker} />
                <input type="hidden" name="type" value={"common"} />
                <input type="hidden" name="budget" value={budget} />
                <input type="hidden" name="riskAmount" value={riskAmount} />
                <input type="hidden" name="rewardAmount" value={rewardAmount} />
                <Button className="w-full" disabled={commonPending}>
                  {commonPending ? (
                    `Generating... ${progress}%`
                  ) : (
                    <>
                      Generate <PackageOpenIcon className="ml-2" /> 1
                    </>
                  )}
                </Button>
                {commonPending && (
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2 dark:bg-gray-700">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </form>
            </article>
          </TabsContent>

          <TabsContent className="w-full " value="rare">
            <div className="w-full h-full relative">
              <Image
                width={1024}
                height={1024}
                src="/images/rare-crate.png"
                className="rounded-lg p-6"
                alt="decorative"
              />
              <HoverCard>
                <HoverCardTrigger
                  className="absolute hidden md:block top-1/6 right-0"
                  asChild
                >
                  <InfoIcon className="size-10" />
                </HoverCardTrigger>
                <HoverCardContent className="w-full p-4 dark">
                  <div className="text-lg">
                    Ideal for: <br />
                    📈 Stock Owners <br />
                    💰 Income Generation <br /> 🎯 Covered Calls
                  </div>
                </HoverCardContent>
              </HoverCard>
              <Dialog>
                <DialogTrigger
                  className="absolute md:hidden top-1/6 right-0"
                  asChild
                >
                  <InfoIcon className="size-10 cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="w-full p-4 dark">
                  <DialogTitle>Ideal for</DialogTitle>
                  <DialogDescription>
                    📈 Stock Owners <br />
                    💰 Income Generation <br /> 🎯 Covered Calls
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
            <article className="bg-gradient-to-r from-transparent from-25%% via-purple-600/20 via-50% to-transparent border-2 border-white/10 p-4 rounded-lg space-y-4">
              <h2 className="text-lg md:text-3xl flex items-center gap-1">
                <NotebookIcon className="stroke-purple-600" />
                Generate income from owned stocks
              </h2>
              <p className="text-lg md:text-3xl flex items-center gap-1">
                <CalculatorIcon className="stroke-purple-600" /> Covered call
                strategies
              </p>
              <p className="text-lg md:text-3xl flex items-center gap-1">
                <CloudIcon className="stroke-purple-600" />
                Advanced risk management
              </p>
              <p className="text-lg md:text-3xl flex gap-1">
                <CreditCardIcon className="stroke-purple-600" /> Maximize your
                stock returns
              </p>
              <form action={rareFormAction}>
                <input type="hidden" name="ticker" value={ticker} />
                <input type="hidden" name="type" value={"rare"} />
                <input type="hidden" name="sharesOwned" value={sharesOwned} />
                <input type="hidden" name="costBasis" value={costBasis} />
                <input type="hidden" name="riskAmount" value={riskAmount} />
                <input type="hidden" name="rewardAmount" value={rewardAmount} />
                <Button className="w-full" disabled={rarePending}>
                  {rarePending ? (
                    `Generating... ${progress}%`
                  ) : (
                    <>
                      Generate <PackageOpenIcon className="ml-2" /> 1
                    </>
                  )}
                </Button>
                {rarePending && (
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2 dark:bg-gray-700">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </form>
            </article>
          </TabsContent>

          <TabsContent value="epic">Coming Soon.</TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
