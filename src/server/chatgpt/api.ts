import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { CoveredCallTrade, OptionsTrade } from "../polygon/api";
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
  exit_plan_profit_scenario: z.string(),
  exit_plan_assignment_scenario: z.string(),
  exit_plan_early_exit: z.string(),
  exit_plan_stop_loss: z.string(),
  risk_assessment: z.string(),
  reasoning: z.string(),
});

export default async function GenerateCSPStrategy(contract: OptionsTrade) {
  console.log("ATTEMPTING TO GEN CSPS", contract);
  try {
    const response = await client.responses.parse({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: csp_prompt(contract.stop_loss_price) },
        { role: "user", content: JSON.stringify(contract) },
      ],
      text: {
        format: zodTextFormat(OptionsData, "csp_data"),
      },
      temperature: 0.1,
    });
    console.log("made response:", response.output_parsed);
    return response.output_parsed;
  } catch (err) {
    console.log("GENERATEECSPSTRAT: ", err);
    return null;
  }
}

export async function GenerateCCStrategy(contract: CoveredCallTrade) {
  console.log("ATTEMPTING TO GEN CC", contract);
  try {
    const response = await client.responses.parse({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: covered_calls_prompt },
        { role: "user", content: JSON.stringify(contract) },
      ],
      text: {
        format: zodTextFormat(OptionsData, "cc_data"),
      },
      temperature: 0.1,
    });
    console.log("made response:", response.output_parsed);
    return response.output_parsed;
  } catch (err) {
    console.log("GENERATECCSTRAT: ", err);
    return null;
  }
}

function csp_prompt(stop_loss: number) {
  const cash_secured_puts_prompt = `
  You are a quantitative analyst specializing in cash-secured put strategies for income generation.
  
  ## TASK
  Generate a structured analysis of the provided pre-calculated options data with specific execution and risk management guidance.
  
  ## INPUT FORMAT
  JSON object with pre-calculated metrics:
  - ticker, strike, expiration, contracts_to_sell, premium_per_contract, total_premium_income, cash_required, yield, break_even_price, stop_loss_price, max_allowed_loss
  

  
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
    "setup_plan": "Step-by-step execution with specific numbers",
    "exit_plan_profit_scenario": "Actions when stock closes above strike at expiration",
    "exit_plan_assignment_scenario": "Actions when assigned shares at expiration", 
    "exit_plan_early_exit": "Conditions for early profit-taking",
    "exit_plan_stop_loss": "See logic above",
    "risk_assessment": "Key risks and mitigation strategies",
    "reasoning": "Why this represents a good opportunity"
  }
  
  ## CONTENT GUIDELINES
  
  **setup_plan**: "1. Sell [contracts_to_sell] [ticker] puts at $[strike] strike expiring [expiration] 2. Collect $[premium_per_contract] premium per contract ($[total_premium_income] total) 3. Secure with $[cash_required] cash 4. Target yield: [yield]% 5. Break-even: $[break_even_price]"
  
  **exit_plan_profit_scenario**: "Stock closes above $[strike]. Keep $[total_premium_income] premium for [yield]% return. No assignment, cash freed for next trade."
  
  **exit_plan_assignment_scenario**: "Stock closes below $[strike]. Assigned [contracts_to_sell * 100] shares at $[strike]. Effective cost basis $[break_even_price] after premium. Hold or sell covered calls."
  
  **exit_plan_early_exit**: "If premium decays to 70–80% of original value with time remaining, consider buying back puts to lock profit."
  
  **exit_plan_stop_loss**: "If stock drops significantly below $[break_even_price], ${
    isNaN(stop_loss)
      ? "consider closing to limit losses."
      : "consider closing the position to limit downside risk (max allowed loss: $[max_allowed_loss])"
  }"

  **risk_assessment**: "Primary risks: Assignment if stock below $[strike], unrealized losses if below $[break_even_price], capital tied up [days] days. Mitigation: Monitor price action, have assignment plan ready. (All Trades are not Financial Advice)"
  
  **reasoning**: Generate a pros and cons trade about the trade with the given information. Keep this but up two sentences max for pros and cons each.
  
  Keep responses concise and actionable with specific numbers from the input data.
  `;

  return cash_secured_puts_prompt;
}

const covered_calls_prompt = `
  You are a quantitative analyst specializing in covered call strategies for income generation.
  
  ## TASK
  Generate a structured analysis of the provided pre-calculated options data with specific execution and risk management guidance.
  
  ## INPUT FORMAT
  JSON object with pre-calculated metrics:
  - ticker, strike, expiration, contracts_to_sell, premium_per_contract, total_premium_income, shares_required, yield, break_even_price, assignment_price, upside_potential, max_allowed_loss
  

  
  ## OUTPUT FORMAT
  Return ONLY a valid JSON object with this exact structure:
  
  {
    "ticker": "[ticker from input]",
    "strike": [strike from input],
    "expiration": "[expiration from input]",
    "contracts_to_sell": [contracts_to_sell from input],
    "premium_per_contract": [premium_per_contract from input],
    "total_premium_income": [total_premium_income from input],
    "shares_required": [shares_required from input],
    "yield": [yield from input],
    "break_even_price": [break_even_price from input],
    "assignment_price": [assignment_price from input],
    "upside_potential": [upside_potential from input],
    "setup_plan": "Step-by-step execution with specific numbers",
    "exit_plan_profit_scenario": "Actions when stock closes below strike at expiration",
    "exit_plan_assignment_scenario": "Actions when stock closes above strike and shares are called away", 
    "exit_plan_early_exit": "Conditions for early profit-taking",
    "exit_plan_stop_loss": "Loss mitigation strategy",
    "risk_assessment": "Key risks and mitigation strategies",
    "reasoning": "Why this represents a good opportunity"
  }
  
  ## CONTENT GUIDELINES
  
  **setup_plan**: "1. Sell [contracts_to_sell] [ticker] calls at $[strike] strike expiring [expiration] 2. Collect $[premium_per_contract] premium per contract ($[total_premium_income] total) 3. Hold [shares_required] shares as collateral 4. Target yield: [yield]% 5. Break-even protection: $[break_even_price]"
  
  **exit_plan_profit_scenario**: "Stock closes below $[strike]. Keep $[total_premium_income] premium for [yield]% return. Shares retained, can sell more covered calls."
  
  **exit_plan_assignment_scenario**: "Stock closes above $[strike]. Shares called away at $[assignment_price]. Total profit: $[upside_potential] (premium + capital gains). Consider re-entry or new position."
  
  **exit_plan_early_exit**: "If premium decays to 70–80% of original value with time remaining, consider buying back calls to lock profit and retain upside potential."
  
  **exit_plan_stop_loss**: "If stock drops significantly below $[break_even_price], consider closing call position to preserve capital for potential recovery (max allowed loss: $[max_allowed_loss])"

  **risk_assessment**: "Primary risks: Capped upside if stock rallies above $[strike], unrealized losses if stock drops below $[break_even_price], opportunity cost if strong rally occurs. Mitigation: Monitor price action, have assignment plan ready. (All Trades are not Financial Advice)"
  
  **reasoning**: Generate a pros and cons analysis about the trade with the given information. Keep this to two sentences max for pros and cons each.
  
  Keep responses concise and actionable with specific numbers from the input data.
  `;
