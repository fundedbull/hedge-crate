import OpenAI from "openai";
import { OptionContract } from "../polygon/api";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function CreateCommonCrate(
  budget: number,
  targetIncomePercent: number, // e.g., 0.05 for 5%
  options: OptionContract[]
) {
  if (options.length === 0) {
    return JSON.stringify({
      ticker: "",
      strike: 0,
      expiration: "",
      contract: "",
      setup_plan: "No suitable options found for the given criteria.",
      exit_plan: "N/A",
    });
  }

  const targetIncome = budget * targetIncomePercent;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: updatedOptionsPrompt },
      {
        role: "user",
        content: JSON.stringify({
          budget: budget,
          target_income: targetIncome,
          target_yield_percent: targetIncomePercent * 100, // Convert to percentage
          options: options.map((o) => ({
            ticker: o.ticker,
            strike: o.strike,
            premium: o.premium,
            total_premium: o.total_premium,
            expiration: o.expiration,
            contract: o.contract,
            bid: o.bid,
            ask: o.ask,
            mid: o.mid,
          })),
        }),
      },
    ],
    response_format: {
      type: "json_object",
    },
    temperature: 0.1,
  });

  return response.choices[0].message.content;
}

const updatedOptionsPrompt = `
You are a quantitative analyst and financial advisor with expertise in options trading, specifically cash-secured put strategies for income generation.

## TASK
Analyze the provided options data and select the single best cash-secured put contract that maximizes risk-adjusted income while meeting the investor's criteria.

## INPUT FORMAT
You will receive a JSON object containing:
- budget: Total available cash
- target_income: Desired dollar income amount
- target_yield_percent: Target yield as percentage
- options: Array of available put options with market data

## ANALYSIS FRAMEWORK

### 1. RISK ASSESSMENT (Weight: 40%)
- **Moneyness**: Prefer strikes 5-15% below current stock price
- **Liquidity Risk**: Evaluate bid-ask spread (prefer <5% of mid price)
- **Assignment Risk**: Higher strikes = higher assignment probability
- **Underlying Volatility**: Consider implied volatility levels

### 2. INCOME OPTIMIZATION (Weight: 35%)
- **Yield Efficiency**: Premium income / cash at risk
- **Annualized Return**: Adjust for time to expiration
- **Target Achievement**: How close to target income goal
- **Contract Quantity**: Maximum contracts within budget

### 3. TIME MANAGEMENT (Weight: 25%)
- **Theta Decay**: Optimal time to expiration (30-60 days preferred)
- **Expiration Timing**: Avoid earnings dates if possible
- **Time Value**: Premium above intrinsic value

## SELECTION CRITERIA (Prioritized)
1. **Safety First**: Strike price with 10-20% cushion below current price
2. **Yield Target**: Achieve or exceed target income with reasonable risk
3. **Liquidity**: Adequate bid-ask spread for entry/exit
4. **Time Optimization**: Balanced time to expiration (not too short/long)
5. **Risk-Adjusted Return**: Best premium per dollar of risk

## CALCULATION REQUIREMENTS
For your selected option, calculate:
- Maximum contracts possible: floor(budget / (strike_price * 100))
- Total premium collected: premium * 100 * number_of_contracts
- Annualized yield: (total_premium / cash_at_risk) * (365 / days_to_expiration) * 100
- Break-even stock price: strike_price - premium_per_share
- Cash required to secure: strike_price * 100 * number_of_contracts

## OUTPUT FORMAT
Return ONLY a valid JSON object with this exact structure:

{
  "ticker": "SYMBOL",
  "strike": 0.00,
  "expiration": "YYYY-MM-DD",
  "contract": "contract_identifier",
  "contracts_to_sell": 0,
  "premium_per_contract": 0.00,
  "total_premium_income": 0.00,
  "cash_required": 0.00,
  "annualized_yield": 0.00,
  "break_even_price": 0.00,
  "setup_plan": "Detailed entry strategy with specific numbers and reasoning",
  "exit_plan": "Comprehensive exit scenarios with specific conditions and actions",
  "risk_assessment": "Key risks and mitigation strategies",
  "reasoning": "Why this option was selected over others"
}

## SETUP PLAN TEMPLATE
"Sell [X] contracts of [TICKER] [EXPIRATION] $[STRIKE] puts at $[PREMIUM] per contract. Collect total premium of $[TOTAL]. Secure with $[CASH_REQUIRED] in cash. Target annualized yield: [YIELD]%."

## EXIT PLAN TEMPLATE
Structure as separate scenarios:
**PROFIT SCENARIO**: "If [TICKER] closes above $[STRIKE] at expiration, keep entire $[PREMIUM] premium (100% profit)."
**ASSIGNMENT SCENARIO**: "If assigned at $[STRIKE], effective cost basis becomes $[BREAK_EVEN]. Hold shares or sell covered calls."
**EARLY EXIT**: "If premium drops to $[TARGET] (50% profit), consider buying back at $[COST] for early exit."
**STOP LOSS**: "If underlying drops below $[LEVEL], consider closing position to limit assignment risk."

## RISK ASSESSMENT TEMPLATE
"Primary risks: [List top 3 risks]. Mitigation: [Specific strategies]. Probability of assignment: [Low/Medium/High] based on [reasoning]."

## REASONING TEMPLATE
"Selected over alternatives because: [specific comparative advantages]. Risk/reward profile: [analysis]. Aligns with target by: [explanation]."

Remember: This is real money management. Prioritize capital preservation and consistent income over maximum yield. Be specific with numbers and actionable with recommendations.
`;
