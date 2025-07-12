"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card as CardData } from "@/server/db/schema";
import { useState } from "react";
import OptionsTradingDialog from "./options-trading-dialog";
import Link from "next/link";

const sampleOptionsData = {
  ticker: "SPY",
  strike: 547,
  expiration: "2024-07-26",
  contracts_to_sell: 1,
  premium_per_contract: 135,
  total_premium_income: 135,
  cash_required: 54700,
  annualized_yield: 17.38,
  break_even_price: 545.65,
  setup_plan:
    "Sell a cash-secured put on SPY at a strike price of $547 with a 30-45 DTE (days to expiration). Aim for a premium of at least $1.30 per share. This setup is ideal in a neutral to slightly bullish market, capitalizing on time decay and stable price action.",
  exit_plan: {
    "PROFIT SCENARIO":
      "If the price of SPY remains above $547 at expiration, the option expires worthless, and you keep the full premium. Look to close the position early if you can capture 50% of the premium within the first 21 days.",
    "ASSIGNMENT SCENARIO":
      "If SPY closes below $547 at expiration, you will be assigned 100 shares at $547 per share. Your cost basis will be the strike price minus the premium received. You can then hold the shares or sell covered calls against them.",
    "EARLY EXIT":
      "If the underlying asset's price moves significantly against the position (e.g., a sharp drop), consider closing the position to prevent assignment if you no longer wish to own the shares.",
    "STOP LOSS":
      "Set a mental stop loss if the underlying drops by a certain percentage that invalidates your initial thesis. For options, this could be when the value of the put has doubled, indicating a significant move against you.",
  },
  risk_assessment:
    "The primary risk is the assignment of shares at a price higher than the current market value if SPY drops significantly. This could result in an unrealized loss. The cash required for this trade is substantial, tying up capital. Market volatility can increase the risk of assignment.",
  reasoning:
    "SPY is in a long-term uptrend. Selling a cash-secured put below the current price provides a buffer of safety and allows us to collect premium. The chosen strike has a low delta, suggesting a high probability of expiring out-of-the-money. This strategy generates consistent income and can be a way to acquire shares at a discount.",
};

export function CrateList({
  crates,
  page,
}: {
  crates: CardData[];
  page: "dashboard" | "crates";
}) {
  const [selectedCrate, setSelectedCrate] = useState<CardData | null>(null);

  return (
    <Card className="dark">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Crates</CardTitle>
            <CardDescription>Manage your trading crates.</CardDescription>
          </div>
          {page === "dashboard" ? (
            <Button asChild>
              <Link href="/client/dashboard/crates">View More</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/">Open Crate</Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden">
          {crates.map((crate) => (
            <div
              key={crate.id}
              className="mb-4 rounded-lg border p-4 text-sm dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{crate.rarity}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedCrate(crate)}>
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-x-4">
                <div>
                  <div className="text-xs text-muted-foreground">
                    Difficulty
                  </div>
                  <div>{crate.rarity}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Instrument
                  </div>
                  <div>{crate.ticker}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Date</div>
                  <div>{crate.createdAt.toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                <th className="pb-3 pl-4">CRATE</th>
                <th className="pb-3">Expiration</th>
                <th className="pb-3">Instrument</th>
                <th className="pb-3">DATE</th>
                <th className="pb-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {crates.map((crate) => (
                <tr
                  key={crate.id}
                  className="border-b last:border-0 hover:bg-muted/50"
                >
                  <td className="py-3 pl-4">
                    <div className="font-medium">{crate.rarity}</div>
                  </td>
                  <td>{crate.expiration}</td>
                  <td>{crate.ticker}</td>
                  <td>{crate.createdAt.toLocaleDateString()}</td>
                  <td className="text-right pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setSelectedCrate(crate)}
                        >
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedCrate && (
          <OptionsTradingDialog
            open={!!selectedCrate}
            onOpenChange={(open) => !open && setSelectedCrate(null)}
            data={{
              ...sampleOptionsData,
              ticker: selectedCrate.ticker,
              strike: parseFloat(selectedCrate.strike),
              expiration: selectedCrate.expiration,
              contracts_to_sell: selectedCrate.contractsToSell,
              premium_per_contract: parseFloat(
                selectedCrate.premiumPerContract
              ),
              total_premium_income: parseFloat(
                selectedCrate.totalPremiumIncome
              ),
              cash_required: parseFloat(selectedCrate.cashRequired),
              yield: Number(selectedCrate.annualizedYield),
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
