import { z } from "zod";

// Define the schema for a single option contract
const optionContractSchema = z.object({
  contractID: z.string(),
  symbol: z.string(),
  expiration: z.string(),
  strike: z.string(),
  type: z.enum(["call", "put"]),
  last: z.string(),
  mark: z.string(),
  bid: z.string(),
  bid_size: z.string(),
  ask: z.string(),
  ask_size: z.string(),
  volume: z.string(),
  open_interest: z.string(),
  date: z.string(),
  implied_volatility: z.string(),
  delta: z.string(),
  gamma: z.string(),
  theta: z.string(),
  vega: z.string(),
  rho: z.string(),
});

// Define the schema for the entire API response
const alphaVantageResponseSchema = z.object({
  endpoint: z.literal("Historical Options"),
  message: z.literal("success"),
  data: z.array(optionContractSchema),
});

// Infer the TypeScript type from the Zod schema
export type AlphaVantageResponse = z.infer<typeof alphaVantageResponseSchema>;

// Define a Result type that can hold either a value or an error
type Result<T, E> = { ok: true; val: T } | { ok: false; error: E };

export async function getHistoricalOptionsData(
  symbol: string
): Promise<Result<AlphaVantageResponse, any>> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error: "ALPHA_VANTAGE_API_KEY environment variable not set.",
    };
  }
  const url = `https://www.alphavantage.co/query?function=HISTORICAL_OPTIONS&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "request" },
    });

    if (!response.ok) {
      return {
        ok: false,
        error: {
          message: "Request failed with non-200 status",
          status: response.status,
        },
      };
    }

    const data = await response.json();

    try {
      const parsedData = alphaVantageResponseSchema.parse(data);
      return { ok: true, val: parsedData };
    } catch (error) {
      return {
        ok: false,
        error: { message: "Failed to parse API response", details: error },
      };
    }
  } catch (error) {
    return { ok: false, error: { message: "Fetch error", details: error } };
  }
}
