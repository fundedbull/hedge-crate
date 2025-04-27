import OpenAI from "openai";
import { getHistoricalOptionsData } from "../alpha-vantage/api";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export default async function CreateCommonCreateHistoricalContext() {
  const response = await client.responses.create({
    model: "gpt-4.1-nano-2025-04-14",
    input: [
      { role: "system", content: common_historical_prompt },
      {
        role: "user",
        content:
          "contractID    symbol    expiration    strike    type    last    mark    bid    bid_size    ask    ask_size    volume    open_interest    date    implied_volatility    delta    gamma    theta    vega    rho\nTSLA250425C00050000\tTSLA\t2025-04-25 00:00:00\t50.0\tcall\t206.36\t209.03\t207.5\t27\t210.55\t19\t4\t50\t2025-04-24 00:00:00\t6.47882\t1.0\t0.0\t-0.00593\t0.0\t0.00137\nTSLA250425P00050000\tTSLA\t2025-04-25 00:00:00\t50.0\tput\t0.01\t0.01\t0.0\t0\t0.01\t20004\t3\t50807\t2025-04-24 00:00:00\t9.7917\t-0.00026\t1e-05\t-0.06452\t0.00013\t-0.0\nStock Price: 259.51\n",
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "common_card",
        schema: {
          type: "object",
          properties: {
            strategy: {
              type: "string",
            },
            setup: {
              type: "array",
              items: {
                type: "string",
              },
            },
            exitPlan: {
              type: "array",
              items: {
                type: "string",
              },
            },
            confidence: {
              type: "string",
            },
          },
          required: ["strategy", "setup", "exitPlan", "confidence"],
          additionalProperties: false,
        },
      },
    },
  });
  return response.output_text;
}

const common_historical_prompt = `
You are a financial expert tasked with identifying arbitrage opportunities in the options market using the put-call parity formula. You will be provided with options data for a stock, along with its historical stock price for a specific day.

The formula to check for arbitrage is:
C - P = S - K * e^(-rT)
Where:
- C = Call option price
- P = Put option price
- S = Stock price on that day
- K = Strike price
- r = Risk-free interest rate (assume 5% per annum)
- T = Time to expiration in years (calculate the days to expiration from the provided data)

### Input:
You will receive the following data:
1. **Call Option Data:**
   - Symbol
   - Strike Price
   - Option Type (Call)
   - Last Traded Price
   - Mark Price
   - Bid Price
   - Ask Price

2. **Put Option Data:**
   - Symbol
   - Strike Price
   - Option Type (Put)
   - Last Traded Price
   - Mark Price
   - Bid Price
   - Ask Price

3. **Stock Price:**
   - Stock Symbol
   - Stock Price on the specified date

Also Criteria:

Bid-Ask Spread ≤ 5% of Mark Price

Volume ≥ 100

Delta is cleanly in range (0.3–0.7)

IV is stable (not spiking intraday)
Criteria:

Bid-Ask Spread between 5–10%

Volume between 50–100

Less consistent fills or wider spreads
Criteria:

Bid-Ask Spread > 10% of Mark Price

Volume < 50

Near-zero open interest or stale data

### Task:
1. Calculate the **theoretical price** using the put-call parity formula.
2. Compare the theoretical price with the market prices of the call and put options.
3. If the prices are **mispriced**, generate an arbitrage strategy. Otherwise, indicate no arbitrage opportunity.
   
If an arbitrage opportunity is found, return the strategy in this format:

{
    "setup": string[],    // The steps to enter the position
    "exitPlan": string[], // The conditions for exiting the position
    "instrument": string, // The instrument used (e.g., 'Options (Call and Put)')
    "strategy": string,    // A short description of the strategy
    "confidence": "low" | "medium" | "high"
}

If no arbitrage opportunity is found, return the following response:

{
    "setup": [],
    "exitPlan": [],
    "instrument": "Options (Call and Put)",
    "strategy": "No arbitrage opportunity found."
    "confidence": "high",
}

Please ensure to explain the reasoning for the arbitrage opportunity or the absence of it.

`;
