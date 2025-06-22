import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

interface OptionsData {
  ticker: string;
  strike: number;
  expiration: string;
  contracts_to_sell: number;
  premium_per_contract: number;
  total_premium_income: number;
  cash_required: number;
  annualized_yield: number;
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

export default function OptionsTradingCard() {
  const data: OptionsData = {
    ticker: "ASTS",
    strike: 42.0,
    expiration: "2027-01-15",
    contracts_to_sell: 2,
    premium_per_contract: 15.92,
    total_premium_income: 3184.0,
    cash_required: 8400.0,
    annualized_yield: 138.57,
    break_even_price: 26.08,
    setup_plan:
      "Sell 2 contracts of ASTS 2027-01-15 $42 puts at $15.92 per contract. Collect total premium of $3184. Secure with $8400 in cash. Target annualized yield: 138.57%.",
    exit_plan: {
      "PROFIT SCENARIO":
        "If ASTS closes above $42 at expiration, keep entire $15.92 premium (100% profit).",
      "ASSIGNMENT SCENARIO":
        "If assigned at $42, effective cost basis becomes $26.08. Hold shares or sell covered calls.",
      "EARLY EXIT":
        "If premium drops to $7.96 (50% profit), consider buying back at $7.96 for early exit.",
      "STOP LOSS":
        "If underlying drops below $30, consider closing position to limit assignment risk.",
    },
    risk_assessment:
      "Primary risks: Assignment risk, liquidity risk, underlying volatility. Mitigation: Choose a strike with a cushion, monitor liquidity, and assess volatility. Probability of assignment: Medium based on current market conditions and strike proximity.",
    reasoning:
      "Selected over alternatives because it offers the highest annualized yield while meeting the target income. Risk/reward profile is favorable due to the significant premium relative to cash at risk. Aligns with target by exceeding the desired income and yield.",
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <Card className="max-w-4xl mx-auto bg-gray-800 border-gray-700 text-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-400" />
                {data.ticker} Cash-Secured Put
              </CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                Premium income strategy with {formatDate(data.expiration)}{" "}
                expiration
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-green-900 text-green-300 border-green-600"
            >
              {formatPercentage(data.annualized_yield)} APY
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-400">Strike Price</span>
              </div>
              <p className="text-xl font-semibold">
                {formatCurrency(data.strike)}
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-400">Premium Income</span>
              </div>
              <p className="text-xl font-semibold text-green-400">
                {formatCurrency(data.total_premium_income)}
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-gray-400">Break Even</span>
              </div>
              <p className="text-xl font-semibold">
                {formatCurrency(data.break_even_price)}
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-gray-400">Cash Required</span>
              </div>
              <p className="text-xl font-semibold">
                {formatCurrency(data.cash_required)}
              </p>
            </div>
          </div>

          <Separator className="bg-gray-600" />

          {/* Setup Plan */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              Setup Strategy
            </h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-300 leading-relaxed">{data.setup_plan}</p>
            </div>
          </div>

          <Separator className="bg-gray-600" />

          {/* Exit Scenarios */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Exit Scenarios
            </h3>

            <div className="grid gap-4">
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">
                  💰 Profit Scenario
                </h4>
                <p className="text-gray-300 text-sm">
                  {data.exit_plan["PROFIT SCENARIO"]}
                </p>
              </div>

              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">
                  📈 Assignment Scenario
                </h4>
                <p className="text-gray-300 text-sm">
                  {data.exit_plan["ASSIGNMENT SCENARIO"]}
                </p>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                <h4 className="font-medium text-yellow-300 mb-2">
                  ⚡ Early Exit
                </h4>
                <p className="text-gray-300 text-sm">
                  {data.exit_plan["EARLY EXIT"]}
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <h4 className="font-medium text-red-300 mb-2">🛑 Stop Loss</h4>
                <p className="text-gray-300 text-sm">
                  {data.exit_plan["STOP LOSS"]}
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-600" />

          {/* Risk Assessment */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Risk Assessment
            </h3>
            <div className="bg-red-900/10 border border-red-800 rounded-lg p-4">
              <p className="text-gray-300 leading-relaxed">
                {data.risk_assessment}
              </p>
            </div>
          </div>

          <Separator className="bg-gray-600" />

          {/* Reasoning */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              Strategy Reasoning
            </h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-300 leading-relaxed">{data.reasoning}</p>
            </div>
          </div>

          {/* Contract Details */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium mb-3 text-gray-200">Contract Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Contracts to Sell:</span>
                <span className="ml-2 font-medium">
                  {data.contracts_to_sell}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Premium per Contract:</span>
                <span className="ml-2 font-medium">
                  {formatCurrency(data.premium_per_contract)}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Expiration Date:</span>
                <span className="ml-2 font-medium">
                  {formatDate(data.expiration)}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Annualized Yield:</span>
                <span className="ml-2 font-medium text-green-400">
                  {formatPercentage(data.annualized_yield)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
