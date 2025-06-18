import { restClient } from "@polygon.io/client-js";
import { getLatestPrice } from "../alpha-vantage/api";

export type CoveredCallContract = {
  ticker: string;
  strike: number;
  premium: number;
  total_premium: number;
  expiration: string;
  contract: string;
  shares_covered: number;
  annualized_yield: number;
  upside_capped_at: number;
  bid?: number;
  ask?: number;
  mid?: number;
};

const rest = restClient(process.env.POLYGON_API_KEY || "your-key-here");

function estimateCallPremium(
  strike: number,
  currentPrice: number,
  daysToExpiration: number
): number {
  // Simple Black-Scholes approximation for call premium estimation
  const moneyness = strike / currentPrice;
  const timeDecay = Math.sqrt(daysToExpiration / 365);
  const intrinsicValue = Math.max(currentPrice - strike, 0);
  const timeValue = currentPrice * 0.02 * timeDecay * (2 - moneyness); // rough estimate

  return Math.max(intrinsicValue + timeValue, 0.01); // minimum $0.01
}

function calculateDaysToExpiration(expirationDate: string): number {
  const expiration = new Date(expirationDate);
  const today = new Date();
  const diffTime = expiration.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function calculateAnnualizedYield(
  totalPremium: number,
  sharesCovered: number,
  currentPrice: number,
  daysToExpiration: number
): number {
  const portfolioValue = sharesCovered * currentPrice;
  const yield_n =
    (totalPremium / portfolioValue) * (365 / daysToExpiration) * 100;
  return Number(yield_n.toFixed(2));
}

export async function findCoveredCallOptions(
  tickers: string[],
  sharesOwned: { [ticker: string]: number }, // e.g., { "AAPL": 500, "MSFT": 200 }
  targetYieldPercent: number, // e.g., 0.15 for 15% annualized
  expiration: string,
  costBasis?: { [ticker: string]: number }, // Optional: original purchase prices
  assignmentTolerance: "low" | "medium" | "high" = "medium"
) {
  const contracts: CoveredCallContract[] = [];

  for (const ticker of tickers) {
    const sharesAvailable = sharesOwned[ticker];

    if (!sharesAvailable || sharesAvailable < 100) {
      console.log(
        `Insufficient shares for ${ticker}: ${sharesAvailable || 0} (need 100+)`
      );
      continue;
    }

    try {
      // Get the current stock price
      const currentPrice = await getLatestPrice(ticker);

      if (currentPrice <= 0.0) {
        console.error(`No current price for ${ticker}, skipping...`);
        continue;
      }

      // For covered calls, we want strikes above current price
      // Strike selection based on assignment tolerance
      let minStrike: number;
      let maxStrike: number;

      switch (assignmentTolerance) {
        case "low":
          // Conservative: strikes well above current price
          minStrike = currentPrice * 1.05; // 5% above current
          maxStrike = currentPrice * 1.25; // 25% above current
          break;
        case "high":
          // Aggressive: strikes closer to current price for more premium
          minStrike = currentPrice * 1.01; // 1% above current
          maxStrike = currentPrice * 1.15; // 15% above current
          break;
        default: // medium
          // Balanced approach
          minStrike = currentPrice * 1.02; // 2% above current
          maxStrike = currentPrice * 1.2; // 20% above current
          break;
      }

      // If cost basis is provided, try to keep strikes above cost basis
      const costBasisPrice = costBasis?.[ticker];
      if (costBasisPrice && costBasisPrice > minStrike) {
        minStrike = Math.max(minStrike, costBasisPrice * 1.01); // 1% above cost basis
      }

      console.log(
        `For ${ticker}: Current Price = ${currentPrice.toFixed(2)}, ` +
          `Strike Range = ${minStrike.toFixed(2)} - ${maxStrike.toFixed(2)}, ` +
          `Shares Available = ${sharesAvailable}, ` +
          `Cost Basis = ${costBasisPrice?.toFixed(2) || "N/A"}`
      );

      const optionsContracts = await rest.reference.optionsContracts({
        underlying_ticker: ticker,
        contract_type: "call", // KEY DIFFERENCE: calls instead of puts
        expiration_date_lte: expiration,
        "strike_price.gte": minStrike.toString(),
        "strike_price.lte": maxStrike.toString(),
        order: "asc", // Start with strikes closer to current price
        limit: 20,
        sort: "strike_price",
      });

      for (const contract of optionsContracts.results || []) {
        const optionTicker = contract.ticker!;
        const strikePrice = contract.strike_price ?? 0;
        const expirationDate = contract.expiration_date ?? "";

        try {
          const snapshot = await rest.options.snapshotOptionContract(
            ticker,
            optionTicker
          );

          let premium = 0;
          let bid = 0;
          let ask = 0;
          let mid = 0;

          // Try to get real market data first
          if (snapshot?.results?.last_quote) {
            bid = snapshot.results.last_quote.bid ?? 0;
            ask = snapshot.results.last_quote.ask ?? 0;
            mid = (bid + ask) / 2;
            premium = mid > 0 ? mid : bid > 0 ? bid : ask;
          }

          // Fallback to last trade price
          if (premium === 0 && snapshot?.results?.last_trade) {
            premium = snapshot.results.last_trade.price ?? 0;
          }

          // If no market data available, estimate premium
          if (premium === 0) {
            const daysToExp = calculateDaysToExpiration(expirationDate);
            premium = estimateCallPremium(strikePrice, currentPrice, daysToExp);
            console.log(
              `Estimated premium for ${optionTicker}: $${premium.toFixed(2)}`
            );
          }

          // Calculate contracts possible with owned shares
          const maxContracts = Math.floor(sharesAvailable / 100);
          const sharesCovered = maxContracts * 100;
          const totalPremiumIncome = premium * 100 * maxContracts;

          const daysToExp = calculateDaysToExpiration(expirationDate);
          const annualizedYield = calculateAnnualizedYield(
            totalPremiumIncome,
            sharesCovered,
            currentPrice,
            daysToExp
          );

          const upsideCappedAt =
            ((strikePrice - currentPrice) / currentPrice) * 100;

          console.log(
            `${ticker} ${optionTicker}: Strike $${strikePrice.toFixed(2)}, ` +
              `Premium $${premium.toFixed(2)}, Contracts: ${maxContracts}, ` +
              `Total Income: $${totalPremiumIncome.toFixed(2)}, ` +
              `Annualized Yield: ${annualizedYield}%, ` +
              `Upside Capped: +${upsideCappedAt.toFixed(1)}%`
          );

          // Filter based on minimum yield target
          const targetAnnualizedYield = targetYieldPercent * 100; // Convert to percentage
          if (annualizedYield >= targetAnnualizedYield * 0.7) {
            // Allow 70% of target
            contracts.push({
              ticker,
              strike: strikePrice,
              premium: Number(premium.toFixed(2)),
              total_premium: Number(totalPremiumIncome.toFixed(2)),
              expiration: expirationDate,
              contract: optionTicker,
              shares_covered: sharesCovered,
              annualized_yield: annualizedYield,
              upside_capped_at: Number(upsideCappedAt.toFixed(2)),
              bid: bid > 0 ? Number(bid.toFixed(2)) : undefined,
              ask: ask > 0 ? Number(ask.toFixed(2)) : undefined,
              mid: mid > 0 ? Number(mid.toFixed(2)) : undefined,
            });
          }
        } catch (e) {
          console.error(`Error fetching snapshot for ${optionTicker}:`, e);
          continue;
        }
      }
    } catch (e) {
      console.error(`Error fetching data for ${ticker}:`, e);
    }
  }

  // Sort by annualized yield (descending), then by total premium income
  contracts.sort((a, b) => {
    if (Math.abs(a.annualized_yield - b.annualized_yield) < 1) {
      return b.total_premium - a.total_premium;
    }
    return b.annualized_yield - a.annualized_yield;
  });

  console.log(`Found ${contracts.length} suitable covered call contracts`);
  return contracts.slice(0, 10); // Return top 10 options
}

// Helper function to calculate potential outcomes
export function analyzeCoveredCallOutcome(
  contract: CoveredCallContract,
  currentPrice: number,
  costBasis?: number
) {
  const breakEvenPrice = currentPrice + contract.premium;
  const maxProfitIfAssigned =
    (contract.strike - currentPrice + contract.premium) *
    contract.shares_covered;

  const profitIfExpires = contract.total_premium;

  const taxImplications = costBasis
    ? contract.strike > costBasis
      ? "Long-term capital gains if assigned (good)"
      : "Potential wash sale if assigned (review with tax advisor)"
    : "No cost basis provided - review tax implications";

  return {
    breakEvenPrice: Number(breakEvenPrice.toFixed(2)),
    maxProfitIfAssigned: Number(maxProfitIfAssigned.toFixed(2)),
    profitIfExpires: Number(profitIfExpires.toFixed(2)),
    taxImplications,
    assignmentRisk:
      contract.strike <= currentPrice * 1.05
        ? "High"
        : contract.strike <= currentPrice * 1.1
        ? "Medium"
        : "Low",
  };
}
