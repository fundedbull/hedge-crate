import { restClient } from "@polygon.io/client-js";
import { getLatestPrice } from "../alpha-vantage/api";

const rest = restClient(process.env.POLYGON_API_KEY || "your-key-here");

export type OptionsTrade = {
  ticker: string;
  strike: number;
  expiration: string;
  bid: number;
  premium_per_contract: number;
  required_cash_per_contract: number;
  yield: number;
  expected_yield: number;
  score: number;
  delta: number | "N/A";
  underlying_price: number;
  max_contracts: number;
  total_premium_income: number;
  premium_gained: number;
  break_even_price: number;
  stop_loss_price: number;
  max_allowed_loss: number;
};

export async function findOptions(
  ticker: string,
  expiration: string,
  budget: number,
  risk: number,
  reward: number
) {
  const puts: OptionsTrade[] = [];
  console.log("RRR", risk, reward);
  try {
    const currentPrice = await getLatestPrice(ticker);
    const max_strike_price = currentPrice - currentPrice * 0.05;
    const min_strike_price = currentPrice - currentPrice * 0.2;
    const response = await rest.options.snapshotOptionChain(ticker, {
      "expiration_date.lte": expiration,
      "strike_price.gte": min_strike_price,
      "strike_price.lte": max_strike_price,
      contract_type: "put",
      limit: 250,
    });

    for (const contract of response.results || []) {
      const strike = Number(contract.details?.strike_price);
      const bid = Number(contract.last_quote?.bid);
      const delta = Number(contract.greeks?.delta);

      if (isNaN(bid) || bid <= 0) continue;

      const premium = bid * 100;
      const required_cash = strike * 100;
      const yield_raw = premium / required_cash;

      let expected_yield = yield_raw * (1 - Math.abs(delta));
      if (isNaN(delta)) {
        expected_yield = yield_raw;
      }

      const score = Math.max(yield_raw, expected_yield);
      const max_contracts = Math.floor(budget / required_cash);
      const total_premium = Math.round(premium * max_contracts);

      if (max_contracts == 0) continue;

      const maxLoss = strike * 100 - premium * 100;
      const rewardAmount = premium * 100;

      const actualRatio = maxLoss / rewardAmount;
      const userDesiredRatio =
        (isNaN(risk) ? 100 : risk) / (isNaN(reward) ? 200 : reward);

      if (actualRatio > userDesiredRatio) continue;

      // Calculate stop loss based on user's RRR
      const maxAllowedLoss = rewardAmount * userDesiredRatio;
      const stopLossPrice =
        isNaN(risk) || isNaN(reward)
          ? NaN
          : Number((strike - maxAllowedLoss / 100).toFixed(2));

      puts.push({
        ticker: ticker,
        strike: strike,
        expiration: contract.details?.expiration_date!,
        bid: bid,
        premium_per_contract: Math.round(premium),
        required_cash_per_contract: required_cash,
        yield: Math.round(yield_raw * 100),
        expected_yield: Math.round(expected_yield * 100),
        score: Math.round(score * 100),
        delta: !isNaN(delta) ? Number(delta.toFixed(3)) : NaN,
        underlying_price: Number(contract.underlying_asset?.price),
        max_contracts: max_contracts,
        total_premium_income: total_premium,
        premium_gained: total_premium,
        break_even_price: Number((strike - bid).toFixed(4)),
        stop_loss_price: stopLossPrice,
        max_allowed_loss: Math.round(maxAllowedLoss),
      });
    }
  } catch (err) {
    console.log("Error at find_options: ", err);
  }

  return puts.sort((a, b) => b.score - a.score);
}

export type CoveredCallTrade = {
  ticker: string;
  strike: number;
  expiration: string;
  bid: number;
  premium_per_contract: number;
  shares_required_per_contract: number;
  yield: number;
  expected_yield: number;
  score: number;
  delta: number | "N/A";
  underlying_price: number;
  max_contracts: number;
  total_premium_income: number;
  premium_gained: number;
  break_even_price: number;
  assignment_price: number;
  max_allowed_loss: number;
  upside_potential: number;
};

export async function findCoveredCalls(
  ticker: string,
  expiration: string,
  sharesOwned: number,
  costBasis: number,
  risk: number,
  reward: number
) {
  const calls: CoveredCallTrade[] = [];
  console.log("RRR", risk, reward);

  try {
    const currentPrice = await getLatestPrice(ticker);

    // For covered calls, we typically want OTM calls
    const min_strike_price = currentPrice; // At-the-money or slightly above
    const max_strike_price = currentPrice + currentPrice * 0.15; // Up to 15% above current

    const response = await rest.options.snapshotOptionChain(ticker, {
      "expiration_date.lte": expiration,
      "strike_price.gte": min_strike_price,
      "strike_price.lte": max_strike_price,
      contract_type: "call", // Changed from "put" to "call"
      limit: 250,
    });

    for (const contract of response.results || []) {
      const strike = Number(contract.details?.strike_price);
      const bid = Number(contract.last_quote?.bid);
      const delta = Number(contract.greeks?.delta);

      if (isNaN(bid) || bid <= 0) continue;

      const premium = bid * 100; // Premium per contract
      const shares_per_contract = 100; // Always 100 shares per contract
      const yield_raw = premium / (currentPrice * shares_per_contract); // Yield based on current stock value

      let expected_yield = yield_raw * Math.abs(delta); // For calls, higher delta = higher probability of assignment
      if (isNaN(delta)) {
        expected_yield = yield_raw;
      }

      const score = Math.max(yield_raw, expected_yield);
      const max_contracts = Math.floor(sharesOwned / shares_per_contract);
      const total_premium = Math.round(premium * max_contracts);

      if (max_contracts == 0) continue;

      // For covered calls, max loss is if stock goes to 0, minus premium collected
      const maxLoss =
        costBasis * shares_per_contract * max_contracts - total_premium;
      const rewardAmount = total_premium;

      const actualRatio = maxLoss / rewardAmount;
      const userDesiredRatio =
        (isNaN(risk) ? 100 : risk) / (isNaN(reward) ? 200 : reward);

      //if (actualRatio > userDesiredRatio) continue;

      // Calculate max allowed loss based on user's RRR
      const maxAllowedLoss = rewardAmount * userDesiredRatio;

      // Calculate potential upside if assigned (stock called away)
      const assignmentGain =
        (strike - costBasis) * shares_per_contract * max_contracts;
      const totalUpsideIfAssigned = assignmentGain + total_premium;

      calls.push({
        ticker: ticker,
        strike: strike,
        expiration: contract.details?.expiration_date!,
        bid: bid,
        premium_per_contract: Math.round(premium),
        shares_required_per_contract: shares_per_contract,
        yield: Math.round(yield_raw * 100),
        expected_yield: Math.round(expected_yield * 100),
        score: Math.round(score * 100),
        delta: !isNaN(delta) ? Number(delta.toFixed(3)) : NaN,
        underlying_price: Number(contract.underlying_asset?.price),
        max_contracts: max_contracts,
        total_premium_income: total_premium,
        premium_gained: total_premium,
        break_even_price: Number((costBasis - bid).toFixed(4)), // Your cost basis minus premium
        assignment_price: strike, // Price at which stock gets called away
        max_allowed_loss: Math.round(maxAllowedLoss),
        upside_potential: Math.round(totalUpsideIfAssigned),
      });
    }
  } catch (err) {
    console.log("Error at find_covered_calls: ", err);
  }

  return calls.sort((a, b) => b.score - a.score);
}
