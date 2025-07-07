import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { OptionsTrade } from "../polygon/api";
import { z } from "zod";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const OptionsData = z.object({
  ticker: z.string(),
  strike: z.number(),
  expiration: z.string(),
  contracts_to_sell: z.number(),
  premium_per_contract: z.number(),
  total_premium_income: z.number(),
  cash_required: z.number(),
  yield: z.number(),
  break_even_price: z.number(),
  setup_plan: z.string(),
  exit_plan: z.object({
    "PROFIT SCENARIO": z.string(),
    "ASSIGNMENT SCENARIO": z.string(),
    "EARLY EXIT": z.string(),
    "STOP LOSS": z.string(),
  }),
  risk_assessment: z.string(),
  reasoning: z.string(),
});

export default async function GenerateCSPStrategy(contract: OptionsTrade) {
  try {
    const response = await client.responses.parse({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: cash_secured_puts_prompt },
        { role: "user", content: JSON.stringify(contract) },
      ],
      text: {
        format: zodTextFormat(OptionsData, "csp_data"),
      },
      temperature: 0.1,
    });

    return response.output_parsed;
  } catch (err) {
    console.log("GENERATEECSPSTRAT: ", err);
    return null;
  }
}

const cash_secured_puts_prompt = `
You are a quantitative analyst and financial advisor with expertise in options trading, specifically cash-secured put strategies for income generation.

## TASK
Analyze the provided pre-calculated options data and generate a comprehensive explanation of how to execute this cash-secured put strategy, including setup, management, and exit plans.

## INPUT FORMAT
You will receive a JSON object containing pre-calculated metrics:
- ticker: Option contract identifier
- strike: Strike price of the put option
- expiration: Expiration date
- contracts_to_sell: Number of contracts to sell
- premium_per_contract: Premium collected per contract
- total_premium_income: Total premium that will be collected
- cash_required: Cash needed to secure all contracts
- yield: yieldyield percentage
- break_even_price: Break-even price if assigned

## ANALYSIS FRAMEWORK
Focus on translating the numbers into actionable trading strategy with:
1. **Trade Setup**: Exact execution steps
2. **Risk Management**: Key risks and mitigation strategies
3. **Exit Planning**: Specific scenarios and actions
4. **Position Management**: Monitoring and adjustment guidelines

## OUTPUT FORMAT
Return ONLY a valid JSON object with this exact structure:

{
  "ticker": "[ticker from input]",
  "strike": [strike from input],
  "expiration": "[expiration from input]",
  "contracts_to_sell": [contracts_to_sell from input],
  "premium_per_contract": [premium_per_contract from input],
  "total_premium_income": [total_premium_income from input],
  "cash_required": [cash_required from input],
  "yield": [yield from input],
  "break_even_price": [break_even_price from input],
  "setup_plan": "Step-by-step execution instructions with specific numbers",
  "exit_plan": {
    "PROFIT SCENARIO": "Actions when trade remains profitable through expiration",
    "ASSIGNMENT SCENARIO": "Actions when assigned shares at expiration",
    "EARLY EXIT": "Conditions and actions for early profit-taking",
    "STOP LOSS": "Conditions and actions to limit losses"
  },
  "risk_assessment": "Key risks, probabilities, and mitigation strategies",
  "reasoning": "Why this represents a good cash-secured put opportunity"
}

## SETUP PLAN TEMPLATE
Structure as step-by-step instructions:
"1. Sell [contracts_to_sell] contracts of [ticker] puts at $[strike] strike expiring [expiration]
2. Collect premium of $[premium_per_contract] per contract ($[total_premium_income] total)
3. Secure position with $[cash_required] in cash
4. Target yieldyield: [yield]%
5. Break-even price if assigned: $[break_even_price]
6. Current cushion: [percentage]% below current stock price"

## EXIT PLAN TEMPLATES

### PROFIT SCENARIO
"Stock closes above $[strike] at expiration. Keep entire $[total_premium_income] premium for [yield]% yieldreturn. No assignment occurs, and cash is freed up for next trade."

### ASSIGNMENT SCENARIO  
"Stock closes below $[strike] at expiration. Get assigned [contracts_to_sell * 100] shares at $[strike] per share. Effective cost basis is $[break_even_price] after accounting for premium collected. Can hold shares or sell covered calls for additional income."

### EARLY EXIT
"If premium decays to 25-50% of original value with significant time remaining, consider buying back puts to lock in profit. Target closing when premium drops to $[target_amount] or less per contract."

### STOP LOSS
"If underlying stock drops significantly below $[break_even_price] with high probability of assignment, consider closing position to limit losses. Monitor if stock falls more than [percentage]% below break-even price."

## RISK ASSESSMENT TEMPLATE
"**PRIMARY RISKS**: 
1. Assignment risk: Stock could close below $[strike] requiring purchase of [contracts_to_sell * 100] shares
2. Underlying decline: Stock could fall below $[break_even_price] break-even, resulting in unrealized losses
3. Opportunity cost: Capital tied up for [days to expiration] days
4. Market volatility: Unexpected market movements could accelerate assignment probability
**MITIGATION STRATEGIES**: [Specific actions to reduce risk based on position size and market conditions]
**PROBABILITY ASSESSMENT**: [Assessment based on time to expiration, strike distance, and market conditions]"

## REASONING TEMPLATE
"**TRADE ATTRACTIVENESS**: Offers [yield]% yieldyield with [risk level] risk profile
**INCOME GENERATION**: Provides $[total_premium_income] in premium income over [days to expiration] days
**CAPITAL EFFICIENCY**: Requires $[cash_required] in cash securing potential purchase of quality shares at discounted price
**RISK-REWARD BALANCE**: [Assessment of reward potential vs risk of assignment and capital requirements]
**MARKET CONTEXT**: [How current market conditions favor this specific strategy and strike selection]"

Remember: Focus on practical execution and risk management. Be specific with numbers and actionable with recommendations. The goal is consistent income generation with capital preservation through disciplined cash-secured put selling.
`;
