import OpenAI from "openai";
import { getHistoricalOptionsData } from "../alpha-vantage/api";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export default async function CreateCommonCreateHistoricalContext() {
  const results = await getHistoricalOptionsData("IBM");

  if (!results.ok) {
    console.log("Failed to get historical data");
    return;
  }

  const data = results.val.data.slice(0, 10);

  const response = await client.responses.create({
    model: "gpt-4.1-nano-2025-04-14",
    input: [
      { role: "system", content: common_historical_prompt },
      { role: "user", content: JSON.stringify(data) },
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
          },
          required: ["strategy", "setup", "exitPlan"],
          additionalProperties: false,
        },
      },
    },
  });
  console.log(response);
  console.log(response.output);
}

const common_historical_prompt = `
You are an expert financial analyst specializing in options arbitrage. Your task is to analyze the provided options data and determine if a put-call parity arbitrage opportunity exists.

**Put-Call Parity Principle:**

The put-call parity relationship states:

C + PV(X) = P + S

Where:
* C = Call option price
* PV(X) = Present value of the strike price (X), discounted to today
* P = Put option price
* S = Current price of the underlying asset

In essence, it links the prices of a call and a put option with the same strike price and expiration date.

**Arbitrage Opportunity:**

An arbitrage opportunity exists when the above equation is significantly out of balance, allowing a risk-free profit.

**Your Analysis:**

1.  **Data Provided:**
    * Underlying Asset: {underlyingSymbol} (Price: {underlyingPrice})
    * Options Data:
        {optionData}

2.  **Assumptions:**
    * For simplicity, assume a risk-free interest rate of {riskFreeRate}% per year.
    * Assume that the time to expiration for all options is {timeToExpiration} days.
    * A significant imbalance is defined as a deviation of more than {tolerance} from the parity equation.

3.  **Your Output:**

    * If a potential arbitrage opportunity exists, provide a JSON object formatted according to the following schema:

        \`\`\`json
        {
          "strategy": "Put-Call Parity Arbitrage",
          "setup": [
            "Step 1: [Detailed first step of the trade, e.g., Buy the call option with strike price $X for $C].",
            "Step 2: [Detailed second step, e.g., Sell the put option with strike price $X for $P].",
            "Step 3: [Detailed third step, e.g., Buy the underlying asset for $S].",
            "Step 4: [Detailed fourth step, e.g., Borrow $PV(X) at the risk-free rate.]"
          ],
          "exitPlan": [
            "Step 1: [Detailed first step of the exit strategy, e.g., At expiration, exercise the call option if the underlying price is above the strike price, or let it expire.]",
            "Step 2: [Detailed second step of the exit strategy, e.g., At expiration, the put option seller is obligated to buy the underlying if the option is exercised.]",
            "Step 3: [Detailed third step, e.g., Repay the borrowed amount.]",
            "Step 4: [Detailed fourth step, e.g., Calculate the profit/loss.]"
          ]
        }
        \`\`\`

    * If no clear arbitrage opportunity exists, return a JSON object like this:

        \`\`\`json
        {
          "strategy": "No Arbitrage Opportunity",
          "setup": [],
          "exitPlan": []
        }
        \`\`\`

    * **Important:** Provide the setup and exit plan in clear, numbered steps that a trader could follow.  Be specific about buying/selling calls/puts/underlying and borrowing/lending. Include the strike price and the price at which the option is bought or sold.

    * **Crucially:** Explain *why* the setup creates an arbitrage. Show the calculation of the expected profit/loss at expiration.

**Example Input:**

Underlying Asset: IBM (Price: 170.00)
Options Data:
Call (Strike: 160.00, Price: 15.00, Expiration: 2024-12-20),
Put (Strike: 160.00, Price: 6.00, Expiration: 2024-12-20)

Risk-Free Rate: 5%
Time to Expiration: 30

**Example Output (if arbitrage exists):**

\`\`\`json
{
  "strategy": "Put-Call Parity Arbitrage",
  "setup": [
    "Step 1: Buy the call option with strike price $160.00 for $15.00.",
    "Step 2: Sell the put option with strike price $160.00 for $6.00.",
    "Step 3: Sell the underlying asset for $170.00.",
    "Step 4: Invest the proceeds and any premium received at the risk-free rate."
  ],
  "exitPlan": [
    "Step 1: At expiration, if the underlying price is above $160.00, exercise the call option to buy the stock at $160.00.",
    "Step 2: At expiration, if the underlying price is below $160.00, the put option buyer will exercise the put and you will buy the stock at $160.00.",
    "Step 3: Calculate the profit/loss, considering the initial investment, option prices, stock price changes, payoff of the options, and the interest earned."
  ]
}
\`\`\`

`;
