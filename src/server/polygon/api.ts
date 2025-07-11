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
      const userDesiredRatio = risk / reward;

      if (actualRatio > userDesiredRatio) continue;

      // Calculate stop loss based on user's RRR
      const maxAllowedLoss = rewardAmount * userDesiredRatio;
      const stopLossPrice =
        risk == 1 && reward == 1
          ? Number((strike - maxAllowedLoss / 100).toFixed(2))
          : -1.23456;

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
