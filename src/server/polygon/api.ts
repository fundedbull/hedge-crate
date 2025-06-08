import { restClient } from "@polygon.io/client-js";
import { getLatestPrice } from "../alpha-vantage/api";

export type OptionContract = {
  ticker: string;
  strike: number;
  premium: number;
  total_premium: number;
  expiration: string;
  contract: string;
  bid?: number;
  ask?: number;
  mid?: number;
};

const rest = restClient(process.env.POLYGON_API_KEY || "your-key-here");

function estimatePremium(
  strike: number,
  currentPrice: number,
  daysToExpiration: number
): number {
  // Simple Black-Scholes approximation for put premium estimation
  const moneyness = strike / currentPrice;
  const timeDecay = Math.sqrt(daysToExpiration / 365);
  const intrinsicValue = Math.max(strike - currentPrice, 0);
  const timeValue = currentPrice * 0.02 * timeDecay * moneyness; // rough estimate

  return Math.max(intrinsicValue + timeValue, 0.01); // minimum $0.01
}

function calculateDaysToExpiration(expirationDate: string): number {
  const expiration = new Date(expirationDate);
  const today = new Date();
  const diffTime = expiration.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export async function findOptions(
  tickers: string[],
  targetYieldPercent: number, // e.g., 0.05 for 5%
  expiration: string,
  budget: number
) {
  const contracts: OptionContract[] = [];
  const targetPremiumIncome = budget * targetYieldPercent;

  for (const ticker of tickers) {
    try {
      // Get the current stock price
      const currentPrice = await getLatestPrice(ticker);

      if (currentPrice <= 0.0) {
        console.error(`No current price for ${ticker}, skipping...`);
        continue;
      }

      // For cash-secured puts, we want strikes below current price
      // but not too far out of the money
      const minStrike = currentPrice * 0.75; // 25% below current price
      const maxStrike = currentPrice * 0.95; // 5% below current price

      console.log(
        `For ${ticker}: Current Price = ${currentPrice.toFixed(
          2
        )}, Strike Range = ${minStrike.toFixed(2)} - ${maxStrike.toFixed(2)}`
      );

      const optionsContracts = await rest.reference.optionsContracts({
        underlying_ticker: ticker,
        contract_type: "put",
        expiration_date_lte: expiration,
        "strike_price.gte": minStrike.toString(),
        "strike_price.lte": maxStrike.toString(),
        order: "desc",
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
            premium = estimatePremium(strikePrice, currentPrice, daysToExp);
            console.log(
              `Estimated premium for ${optionTicker}: $${premium.toFixed(2)}`
            );
          }

          // Calculate how many contracts we can afford and total premium income
          const maxContracts = Math.floor(budget / (strikePrice * 100)); // Cash secured puts
          const totalPremiumIncome = premium * 100 * maxContracts;

          console.log(
            `${ticker} ${optionTicker}: Strike $${strikePrice}, Premium $${premium.toFixed(
              2
            )}, ` +
              `Max Contracts: ${maxContracts}, Total Income: $${totalPremiumIncome.toFixed(
                2
              )}, ` +
              `Target: $${targetPremiumIncome.toFixed(2)}`
          );

          // Check if this option can meet our income target
          if (totalPremiumIncome >= targetPremiumIncome * 0.8) {
            // Allow 80% of target
            contracts.push({
              ticker,
              strike: strikePrice,
              premium: Number(premium.toFixed(2)),
              total_premium: Number(totalPremiumIncome.toFixed(2)),
              expiration: expirationDate,
              contract: optionTicker,
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

  // Sort by total premium income (descending)
  contracts.sort((a, b) => b.total_premium - a.total_premium);

  console.log(`Found ${contracts.length} suitable contracts`);
  return contracts.slice(0, 5); // Return top 5 options
}
