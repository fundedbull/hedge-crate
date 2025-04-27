import React from "react";
import { Button } from "./ui/button";
import { BookOpenIcon, CopyIcon, InfoIcon, Lightbulb } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function HedgeCrateCard({
  title = "THE SQUEEZE LOCK",
  number = "001",
  strategy = "REVERSAL ARBITRAGE",
  stock = "TSLA",
  difficulty = "INTERMEDIATE",
  trades = ["BUY PUT @ 220", "SELL CALL @ 220", "SHORT TSLA"],
  entry = "+0,60",
  profit = "~ $60 AT EXPIRATION",
  greeks = {
    delta: "-0",
    theta: "",
    vega: "LOW",
  },
  exitPlan = [
    "LET ALL CONTRACTS EXPIRE NEAR 220",
    "OR CLOSE EARLY IF ASSIGNMENT RISK HIGH",
  ],
}) {
  return (
    <div className="w-full max-w-lg font-mono bg-gray-950 text-white rounded-xl overflow-hidden border-4 border-cyan-400 p-4   shadow-[0_0_30px_#00FFFF]">
      {/* Header section */}
      {/* <div className="bg-black py-4 text-center  relative">
        <div className="absolute inset-0 border-2 border-cyan-400 m-2 rounded-md pointer-events-none"></div>
        <h2 className="text-cyan-400 text-2xl font-bold tracking-wider ">
          {difficulty} STRATEGY
        </h2>

        <h1 className="text-gray-100 text-3xl font-bold tracking-wider">
          HEDGE CRATE
        </h1>
      </div> */}
      <h1 className="text-gray-100 text-3xl font-bold tracking-wider mt-1">
        {title}
      </h1>
      <p className="text-cyan-400 text-xl font-bold mt-4">
        CRATE:{" "}
        <span className="text-gray-100 text-2xl inline font-bold tracking-wide">
          COMMON
        </span>
      </p>

      <p className="text-cyan-400 text-xl font-bold mt-4">
        STOCK:{" "}
        <span className="text-gray-100 text-2xl inline font-bold tracking-wide">
          {stock}
        </span>
      </p>
      <p className="text-cyan-400 text-xl font-bold mt-4">
        TYPE:{" "}
        <span className="text-gray-100 text-2xl inline font-bold tracking-wide">
          {strategy}
        </span>
      </p>
      <p className="text-cyan-400 text-xl font-bold mt-4">
        CONFIDENCE:{" "}
        <span className="text-gray-100 text-2xl inline font-bold tracking-wide">
          HIGH
        </span>
      </p>

      <p className="text-cyan-400 text-xl font-bold mt-4 flex gap-1">
        TIPS:{" "}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="dark" variant="ghost">
                <Lightbulb className="text-white size-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <ul className="space-y-3  pl-6 text-xl">
                <li>Stick to 1 contract per trade early on.</li>
                <li>Scale only after practicing live fills.</li>
                <li>Don't wait until the last second before expiration.</li>
                <li>
                  If the edge is gone or assignment risk rises, close smart.
                </li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>

      {/* Trade Setup section */}
      <div className="my-4 bg-black rounded-lg border-2 border-cyan-400 p-4">
        <p className="text-cyan-400 text-xl font-bold ">TRADE SETUP</p>
        <ul className="space-y-2">
          {trades.map((trade, i) => (
            <li key={i} className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span className="text-gray-100 text-lg font-bold">{trade}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="my-4 bg-black rounded-lg border-2 border-cyan-400 p-4">
        <p className="text-cyan-400 text-xl font-bold mb-2">EXIT PLAN</p>
        <ul className="space-y-2">
          {exitPlan.map((step, i) => (
            <li key={i} className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span className="text-gray-100 text-lg font-bold">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-row gap-2 justify-between">
        <Button className="w-1/4">
          <InfoIcon /> Info
        </Button>
        <Button className="w-1/4">
          <BookOpenIcon /> Guide
        </Button>
        <Button className="w-1/4">
          <CopyIcon /> Copy
        </Button>
      </div>
    </div>
  );
}
