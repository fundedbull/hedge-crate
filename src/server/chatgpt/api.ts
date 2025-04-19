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
      {
        role: "user",
        content: `contractID    symbol    expiration    strike    type    last    mark    bid    bid_size    ask    ask_size    volume    open_interest    date    implied_volatility    delta    gamma    theta    vega    rho
    IBM250411C00130000    IBM    2025-04-11    130.0    call    0.0    99.18    97.70    26    100.65    7    0    0    2025-04-10    3.48024    1.00000    0.00000    -0.01542    0.00000    0.00356
    IBM250411P00130000    IBM    2025-04-11    130.0    put    0.0    0.01    0.00    0    0.24    6    0    305    2025-04-10    3.55450    -0.00082    0.00007    -0.05969    0.00034    -0.00001`,
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
Analyze this options data for arbitrage opportunities. I'm looking for put-call parity violations or other pricing anomalies that could create risk-free profit. If you find potential arbitrage:
1) Explain the specific strategy (conversion, reversal, box spread, etc.)
2) Calculate exactly how much profit I could make per contract
3) Specify the exact trades to execute (what to buy/sell and at what prices)
4) Explain why this arbitrage exists
5) Highlight any risks or considerations

If no clear arbitrage opportunities exist in the data, just tell me there's nothing actionable and briefly explain why.

Here's the data:

`;
