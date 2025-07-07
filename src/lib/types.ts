export interface OptionsData {
  ticker: string;
  strike: number;
  expiration: string;
  contracts_to_sell: number;
  premium_per_contract: number;
  total_premium_income: number;
  cash_required: number;
  yield: number;
  break_even_price: number;
  setup_plan: string;
  exit_plan: {
    "PROFIT SCENARIO": string;
    "ASSIGNMENT SCENARIO": string;
    "EARLY EXIT": string;
    "STOP LOSS": string;
  };
  risk_assessment: string;
  reasoning: string;
}
