"use client";
import OptionsTradingDialog from "@/components/options-trading-dialog";
import StockFilter from "@/components/stock-filter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  generateCrateAction,
  generateRareCrateAction,
  signInRedirect,
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
  error: null,
  success: false,
};

export default function Page() {
  const [state, formAction, pending] = useActionState(
    generateCrateAction,
    initialState
  );
  const [ticker, setTicker] = useState("");
  
  const [budget, setBudget] = useState("");
  const [riskAmount, setRiskAmount] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [open, setOpen] = useState(false);

  const tickers = [
    "ASTS",
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

  

  const [dialogOpen, setDialogOpen] = useState(false);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // In your useEffect or wherever you detect success:
  useEffect(() => {
    if (state.success && state.data) {
      setDialogOpen(true);
    } else if (!state.success && state.error) {
      setErrorMessage(state.error);
      setErrorDialogOpen(true);
    }
  }, [state.success, state.data, state.error]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (pending) {
      setProgress(1);
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 99));
      }, 500);
    } else if (state.success) {
      setProgress(100);
    } else {
      setProgress(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [pending, state.success]);

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
        {dialogOpen && (
          <OptionsTradingDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            data={state.data}
          />
          // <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          //   <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto dark">
          //     <DialogTitle>{state.message.ticker} Common Crate</DialogTitle>
          //     <DialogDescription>
          //       This is a cash-secured put selling strategy where you sell put
          //       option contracts to generate immediate premium income.
          //     </DialogDescription>
          //     <div className="mt-4">
          //       <p>{state.message.setup_plan}</p>
          //       <p>{state.message.exit_plan["PROFIT SCENARIO"]}</p>
          //       <p>{state.message.exit_plan["ASSIGNMENT SCENARIO"]}</p>
          //       <p>{state.message.exit_plan["EARLY EXIT"]}</p>
          //       <p>{state.message.exit_plan["STOP LOSS"]}</p>
          //       <p></p>
          //     </div>
          //   </DialogContent>
          //</Dialog>
        )}

        <Tabs defaultValue="common" className="w-full max-w-2xl ">
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
                </Card>
              </PopoverContent>
            </Popover>
            <TabsList className="w-full">
              <TabsTrigger value="common">Common</TabsTrigger>
              <TabsTrigger value="rare" disabled>
                <LockIcon />
                Rare
              </TabsTrigger>
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
              {/** for epic say experienced and instead of guarnteed say higher */}
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
              <form action={formAction}>
                <input type="hidden" name="ticker" value={ticker} />
                <input type="hidden" name="type" value={"common"} />
                
                <input type="hidden" name="budget" value={budget} />
                <input type="hidden" name="riskAmount" value={riskAmount} />
                <input type="hidden" name="rewardAmount" value={rewardAmount} />
                <Button className="w-full" disabled={pending}>
                  {pending ? (
                    `Generating... ${progress}%`
                  ) : (
                    <>
                      Generate <PackageOpenIcon className="ml-2" /> 1
                    </>
                  )}
                </Button>
                {pending && (
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
          <TabsContent value="rare">Coming Soon.</TabsContent>
          <TabsContent value="epic">Coming Soon.</TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
